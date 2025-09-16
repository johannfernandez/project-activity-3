function Card({ title, ipInfo }) {
  
return (
    <div className="p-6 outline-1 outline-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 mb-4">
      <div className="font-bold text-xl mb-2">{title}</div>
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
    </div>
  );
}

export default Card;