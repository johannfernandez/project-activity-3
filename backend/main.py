from fastapi import FastAPI, HTTPException
import requests
from fastapi.middleware.cors import CORSMiddleware
import socket

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = "https://ipwho.is"


def extract_entity_info(ent):
    info = {
        "handle": ent.get("handle"),
        "name": None,
        "phone": None,
        "email": None,
        "ref": None
    }

    if ent.get("links"):
        info["ref"] = ent["links"][0].get("href")

    vcard = ent.get("vcardArray", [None, []])[1]
    for item in vcard:
        field = item[0]
        if field == "fn":
            info["name"] = item[3]
        if field == "email":
            info["email"] = item[3]
        if field == "tel":
            info["phone"] = item[3]

    if ent.get("emails"):
        info["email"] = ent["emails"][0]
    if ent.get("phones"):
        info["phone"] = ent["phones"][0]

    return info


def find_role(entities, role_names):
    results = []
    stack = entities[:]

    while stack:
        ent = stack.pop()
        roles = [r.lower() for r in ent.get("roles", [])]

        if any(role in roles for role in role_names):
            results.append(extract_entity_info(ent))

        if "entities" in ent:
            stack.extend(ent["entities"])

    return results


def check_ip_status(ip: str):
    try:
        host = socket.gethostbyname(ip)
    except Exception:
        return "Unreachable"

    ports = [80, 443]

    for port in ports:
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(1.5)
            result = sock.connect_ex((host, port))
            sock.close()

            if result == 0:
                return "Reachable"
        except:
            pass

    return "Unreachable"


def resolve_domain_or_ip(value: str):
    """Return the IP if domain, or return the value if it's already an IP."""
    try:
        # If it's a domain, this resolves to IPv4
        resolved_ip = socket.gethostbyname(value)
        return resolved_ip
    except socket.gaierror:
        # Not resolvable → might still be an IP, allow it
        return value


@app.get("/ipinfo/{query}")
def get_ip_info(query: str):
    # ✅ NEW: determine if query is domain or IP
    resolved_ip = resolve_domain_or_ip(query)

    # ----- GEO DATA -----
    url = f"{BASE_URL}/{resolved_ip}"
    response = requests.get(url)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch data from ipwho.is")

    data = response.json()
    if not data.get("success"):
        raise HTTPException(status_code=400, detail=f'"{query}" is not a valid IP or resolvable domain')

    # ----- RDAP LOOKUP -----
    rdap_url = f"https://rdap.org/ip/{resolved_ip}"
    rdap_res = requests.get(rdap_url).json()

    whois = {
        "reg_date": rdap_res.get("events", [{}])[0].get("eventDate"),
        "updated": None
    }

    for event in rdap_res.get("events", []):
        if event.get("eventAction") == "last changed":
            whois["updated"] = event.get("eventDate")

    entities = rdap_res.get("entities", [])

    # ----- TECH CONTACT -----
    tech_contacts = find_role(entities, ["technical", "tech"])
    if tech_contacts:
        t = tech_contacts[0]
        whois["OrgTechHandle"] = t["handle"]
        whois["OrgTechName"] = t["name"]
        whois["OrgTechPhone"] = t["phone"]
        whois["OrgTechEmail"] = t["email"]
        whois["OrgTechRef"] = t["ref"]
    else:
        whois["OrgTechHandle"] = None
        whois["OrgTechName"] = None
        whois["OrgTechPhone"] = None
        whois["OrgTechEmail"] = None
        whois["OrgTechRef"] = None

    # ----- ABUSE CONTACT -----
    abuse_contacts = find_role(entities, ["abuse", "abuse-contact"])
    if abuse_contacts:
        a = abuse_contacts[0]
        whois["OrgAbuseHandle"] = a["handle"]
        whois["OrgAbuseName"] = a["name"]
        whois["OrgAbusePhone"] = a["phone"]
        whois["OrgAbuseEmail"] = a["email"]
        whois["OrgAbuseRef"] = a["ref"]
    else:
        whois["OrgAbuseHandle"] = None
        whois["OrgAbuseName"] = None
        whois["OrgAbusePhone"] = None
        whois["OrgAbuseEmail"] = None
        whois["OrgAbuseRef"] = None

    # ----- STATUS -----
    ip_status = check_ip_status(resolved_ip)

    return {
        "input": query,          # what the user typed
        "resolved_ip": resolved_ip,  # actual IP used
        "ip": data.get("ip"),
        "version": data.get("type"),
        "country": data.get("country"),
        "country_code": data.get("country_code"),
        "region": data.get("region"),
        "city": data.get("city"),
        "org": data.get("connection", {}).get("isp"),
        "asn": data.get("connection", {}).get("asn"),
        "latitude": data.get("latitude"),
        "longitude": data.get("longitude"),
        "status": ip_status,
        "whois": whois
    }
