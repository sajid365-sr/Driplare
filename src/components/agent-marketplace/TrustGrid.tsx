const TrustGrid = () => {
  const standards = [
    {
      title: "Security",
      description: "AES-256 data handling."
    },
    {
      title: "Ownership",
      description: "100% IP handover upon deployment."
    },
    {
      title: "Support",
      description: "14-day post-launch optimization included."
    }
  ];

  return (
    <section className="py-16 px-4 bg-[#F9F9F9]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {standards.map((standard, index) => (
            <div key={index} className="bg-white border border-black rounded-none p-6 text-center">
              <h3 className="font-['Montserrat'] font-bold text-lg mb-3">
                {standard.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {standard.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustGrid;
