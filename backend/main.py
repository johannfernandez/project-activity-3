from fastapi import FastAPI, HTTPException
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = "cbae7561b0f9d110330f373da8ba45ef" 
BASE_URL = "http://api.ipstack.com"

@app.get("/ipinfo/{ip}")
def get_ip_info(ip: str):
    url = f"{BASE_URL}/{ip}?access_key={API_KEY}"
    response = requests.get(url)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch data from Ipstack")

    data = response.json()

    if (
        "error" in data
        or not data.get("ip")
        or data.get("country_name") is None
        or (data.get("latitude") == 0 and data.get("longitude") == 0)
    ):
        raise HTTPException(status_code=400, detail=f'IP address "{ip}" is invalid')

    return {
        "ip": data.get("ip"),
        "version": "IPv4" if "." in data.get("ip", "") else "IPv6",
        "country": data.get("country_name"),
        "country_code": data.get("country_code"),
        "region": data.get("region_name"),
        "city": data.get("city"),
        "org": data.get("connection", {}).get("isp", "Unknown"),
        "asn": data.get("connection", {}).get("asn", "Unknown"),
        "latitude": data.get("latitude"),
        "longitude": data.get("longitude"),
    }
