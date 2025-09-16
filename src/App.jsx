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
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-orange-400">IPV4/IPV6 Address Information</h1>
      </div>
      <Search onSearch={handleSearch} />

      {ipInfo && (
        <Card
          title="IP Address Information"
          ipInfo={ipInfo}
        />
      )}
    </div>
  );
}

export default App;
