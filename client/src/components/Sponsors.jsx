const sponsors = [
  { name: "Sponsor 1", logo: "/sponsors/languifyy.png" },
  { name: "Sponsor 2", logo: "/sponsors/icici.png" },
  { name: "Sponsor 3", logo: "/sponsors/nitkaa.jpg" },
  { name: "Sponsor 4", logo: "/sponsors/burgersingh.png" },
  { name: "Sponsor 5", logo: "/sponsors/tumbledry.png" },
];

const Sponsors = () => {
  return (
    <div className="flex flex-col items-center py-12 min-h-screen bg-black bg-[radial-gradient(circle_at_center,rgba(0,128,0,0.1),transparent_70%)]">
      <div className="w-full max-w-xl">
        <div className="bg-green-900/30 border-t-2 border-l-2 border-r-2 border-green-500/50 rounded-t-lg p-3 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="mr-10 font-mono text-green-400 flex-1 text-center text-sm">
            WEB SET HUNT 2025
          </div>
        </div>

        <div className="backdrop-blur-sm bg-black/70 border-2 border-green-500/50 p-8 rounded-b-lg shadow-lg shadow-green-500/20">
          <h3 className="text-2xl font-mono text-green-400 mb-8 text-center border-b border-green-500/30 pb-4 flex items-center justify-center gap-3">
            <svg
              className="mb-1 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            SPONSORS
          </h3>
          <div className="grid grid-cols-2 gap-8">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="flex justify-center items-center p-6 bg-green-900/20 border border-green-500/50 rounded-lg shadow-lg hover:scale-105 transition-transform"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-[150px] h-[100px] object-contain filter drop-shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
