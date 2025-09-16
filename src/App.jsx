import { useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [ipInfo, setIpInfo] = useState(null);

  
  const handleSearch = async (ip) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/ipinfo/${ip}`);
      setIpInfo(res.data);
    } catch (err) {
      console.error("Error fetching IP info:", err);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-8">
      <Search onSearch={handleSearch} />
      
      {ipInfo && (
        <Card
          title="IP Address Information"
          ip={ipInfo.ip}
          version={ipInfo.version}
          country={ipInfo.country}
          country_code={ipInfo.country_code}
          region={ipInfo.region}
          city={ipInfo.city}
          org={ipInfo.org}
          asn={ipInfo.asn}
          latitude={ipInfo.latitude}
          longitude={ipInfo.longitude}
        />
      )}
    </div>
  );
}

export default App;
