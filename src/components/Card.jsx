import Map from "./Map";

function Card({ title, ipInfo }) {
  const whois = ipInfo.whois || {};

  return (
    <div className="flex flex-col md:flex-row gap-4">
      
      
      <div className="md:w-1/2 w-full p-6 outline-1 outline-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 mb-4">
        <Map 
          latitude={ipInfo.latitude} 
          longitude={ipInfo.longitude} 
          city={ipInfo.city} 
          country={ipInfo.country} 
        />
      </div>

      
      <div className="md:w-1/2 w-full p-6 outline-1 outline-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 mb-4">
        <div className="font-bold text-xl mb-4">{title}</div>

        <ul className="space-y-2 text-gray-700 text-left">
          <li><strong>IP:</strong> {ipInfo.ip}</li>
          <li><strong>Version:</strong> {ipInfo.version}</li>
          <li><strong>Country:</strong> {ipInfo.country} ({ipInfo.country_code})</li>
          <li><strong>Region:</strong> {ipInfo.region}</li>
          <li><strong>City:</strong> {ipInfo.city}</li>
          <li><strong>ISP:</strong> {ipInfo.org}</li>
          <li><strong>ASN:</strong> {ipInfo.asn}</li>
          <li><strong>Coordinates:</strong> {ipInfo.latitude}, {ipInfo.longitude}</li>
        </ul>

        <div className="mt-6">
          <h3 className="font-bold text-lg mb-2">WHOIS Information</h3>

          <p><strong>RegDate:</strong> {whois.reg_date || "N/A"}</p>
          <p><strong>Updated:</strong> {whois.updated || "N/A"}</p>

          
          <h4 className="font-semibold text-md mt-4">Org Technical Contact</h4>
          <p><strong>Handle:</strong> {whois.OrgTechHandle || "N/A"}</p>
          <p><strong>Name:</strong> {whois.OrgTechName || "N/A"}</p>
          <p><strong>Phone:</strong> {whois.OrgTechPhone || "N/A"}</p>
          <p><strong>Email:</strong> {whois.OrgTechEmail || "N/A"}</p>
          <p><strong>Ref:</strong> {whois.OrgTechRef || "N/A"}</p>

          
          <h4 className="font-semibold text-md mt-4">Org Abuse Contact</h4>
          <p><strong>Handle:</strong> {whois.OrgAbuseHandle || "N/A"}</p>
          <p><strong>Name:</strong> {whois.OrgAbuseName || "N/A"}</p>
          <p><strong>Phone:</strong> {whois.OrgAbusePhone || "N/A"}</p>
          <p><strong>Email:</strong> {whois.OrgAbuseEmail || "N/A"}</p>
          <p><strong>Ref:</strong> {whois.OrgAbuseRef || "N/A"}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-lg mb-2">Status</h3>
          <p><strong>IP Status:</strong> {ipInfo.status}</p>
        </div>

      </div>

    </div>
  );
}

export default Card;
