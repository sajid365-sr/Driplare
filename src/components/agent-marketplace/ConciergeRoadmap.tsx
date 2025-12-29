interface ConciergeRoadmapProps {
  steps: {
    title: string;
    description: string;
  }[];
}

const ConciergeRoadmap = ({ steps }: ConciergeRoadmapProps) => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-['Montserrat'] font-bold text-2xl mb-12 text-center">
          The Concierge Roadmap
        </h2>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-8 h-8 bg-[#FF6B00] border-2 border-black rounded-none flex items-center justify-center">
                <span className="text-white font-['JetBrains_Mono'] font-bold text-sm">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-['Montserrat'] font-bold text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConciergeRoadmap;
