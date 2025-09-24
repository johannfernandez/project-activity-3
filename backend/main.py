from fastapi import FastAPI
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = "https://ipapi.co"

@app.get("/ipinfo/{ip}")
def get_ip_info(ip: str):
    url = f"{BASE_URL}/{ip}/json/"
    response = requests.get(url)

    if response.status_code != 200:
        return {"error": "Failed to fetch data from ipapi.co"}

    data = response.json()

    return {
        "ip": data.get("ip"),
        "version": "IPv4" if "." in data.get("ip", "") else "IPv6",
        "country": data.get("country_name"),
        "country_code": data.get("country"),
        "region": data.get("region"),
        "city": data.get("city"),
        "org": data.get("org", "Unknown"),
        "asn": data.get("asn", "Unknown"),
        "latitude": data.get("latitude"),
        "longitude": data.get("longitude"),
    }
