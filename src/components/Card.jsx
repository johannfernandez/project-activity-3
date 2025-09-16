function Card({ title, ip, version, country, country_code, region, city, org, asn, latitude, longitude }) {
  return (
    <div className="p-6 outline-1 outline-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 mb-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <ul className="space-y-2 text-gray-700 text-left">
          <li><strong>IP:</strong> {ip}</li>
          <li><strong>Version:</strong> {version}</li>
          <li><strong>Country:</strong> {country} ({country_code})</li>
          <li><strong>Region:</strong> {region}</li>
          <li><strong>City:</strong> {city}</li>
          <li><strong>ISP:</strong> {org}</li>
          <li><strong>ASN:</strong> {asn}</li>
          <li><strong>Coordinates:</strong> {latitude}, {longitude}</li>
        </ul>
    </div>
  );
}

export default Card;