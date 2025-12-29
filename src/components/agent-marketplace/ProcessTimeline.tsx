interface ProcessTimelineProps {
  steps: {
    title: string;
    description: string;
  }[];
}

const ProcessTimeline = ({ steps }: ProcessTimelineProps) => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-['Montserrat'] font-bold text-2xl mb-12 text-center">
          Implementation Roadmap
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-black"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-4 h-4 bg-[#FF6B00] border-2 border-black rounded-none relative z-10 mt-1"></div>

                {/* Content */}
                <div className="ml-8 flex-1">
                  <h3 className="font-['Montserrat'] font-bold text-lg mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
