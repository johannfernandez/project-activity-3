import Map from "./Map";

function Card({ title, ipInfo }) {
  const whois = ipInfo.whois || {};

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4">

      {/* MAP PANEL */}
      <div className="md:w-1/2 w-full bg-[#1A1D23] p-6 rounded-xl border border-[#2B2F36] hover:border-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-200 mb-4">
        <Map
          latitude={ipInfo.latitude}
          longitude={ipInfo.longitude}
          city={ipInfo.city}
          country={ipInfo.country}
        />
      </div>

      {/* INFO PANEL */}
      <div className="md:w-1/2 w-full bg-[#1A1D23] p-6 rounded-xl border border-[#2B2F36] hover:border-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-200 mb-4">

        {/* TITLE */}
        <div className="font-bold text-xl mb-4 text-blue-400">{title}</div>

        {/* BASIC INFO */}
        <ul className="space-y-2 text-gray-300 text-left leading-relaxed">
          <li><span className="text-green-400 font-semibold">IP:</span> {ipInfo.ip}</li>
          <li><span className="text-green-400 font-semibold">Version:</span> {ipInfo.version}</li>
          <li><span className="text-green-400 font-semibold">Country:</span> {ipInfo.country} ({ipInfo.country_code})</li>
          <li><span className="text-green-400 font-semibold">Region:</span> {ipInfo.region}</li>
          <li><span className="text-green-400 font-semibold">City:</span> {ipInfo.city}</li>
          <li><span className="text-green-400 font-semibold">ISP:</span> {ipInfo.org}</li>
          <li><span className="text-green-400 font-semibold">ASN:</span> {ipInfo.asn}</li>
          <li><span className="text-green-400 font-semibold">Coordinates:</span> {ipInfo.latitude}, {ipInfo.longitude}</li>
        </ul>

        {/* WHOIS SECTION */}
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-3 text-blue-400">WHOIS Information</h3>

          <p><strong className="text-green-400">RegDate:</strong> {whois.reg_date || "N/A"}</p>
          <p><strong className="text-green-400">Updated:</strong> {whois.updated || "N/A"}</p>

          {/* TECH CONTACT */}
          <h4 className="font-semibold text-md text-blue-300 mt-5 mb-1">Org Technical Contact</h4>
          <p><strong className="text-green-400">Handle:</strong> {whois.OrgTechHandle || "N/A"}</p>
          <p><strong className="text-green-400">Name:</strong> {whois.OrgTechName || "N/A"}</p>
          <p><strong className="text-green-400">Phone:</strong> {whois.OrgTechPhone || "N/A"}</p>
          <p><strong className="text-green-400">Email:</strong> {whois.OrgTechEmail || "N/A"}</p>
          <p><strong className="text-green-400">Ref:</strong> {whois.OrgTechRef || "N/A"}</p>

          {/* ABUSE CONTACT */}
          <h4 className="font-semibold text-md text-blue-300 mt-5 mb-1">Org Abuse Contact</h4>
          <p><strong className="text-green-400">Handle:</strong> {whois.OrgAbuseHandle || "N/A"}</p>
          <p><strong className="text-green-400">Name:</strong> {whois.OrgAbuseName || "N/A"}</p>
          <p><strong className="text-green-400">Phone:</strong> {whois.OrgAbusePhone || "N/A"}</p>
          <p><strong className="text-green-400">Email:</strong> {whois.OrgAbuseEmail || "N/A"}</p>
          <p><strong className="text-green-400">Ref:</strong> {whois.OrgAbuseRef || "N/A"}</p>
        </div>

        {/* STATUS */}
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-2 text-blue-400">Status</h3>

          <p>
            <strong className="text-green-400">IP Status: </strong>
            <span
              className={
                ipInfo.status === "UP"
                  ? "text-green-400"
                  : ipInfo.status === "DOWN"
                  ? "text-red-400"
                  : "text-gray-400"
              }
            >
              {ipInfo.status}
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Card;
