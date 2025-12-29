interface SystemCapabilitiesProps {
  capabilities: {
    title: string;
    description: string;
  }[];
}

const SystemCapabilities = ({ capabilities }: SystemCapabilitiesProps) => {
  return (
    <section className="py-16 px-4 bg-[#F9F9F9]">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-['Montserrat'] font-bold text-2xl mb-12 text-center">
          System Capabilities
        </h2>

        <div className="space-y-8">
          {capabilities.map((capability, index) => (
            <div key={index} className="flex items-start space-x-6">
              <div className="w-2 h-2 bg-[#FF6B00] rounded-none mt-3 flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="font-['Montserrat'] font-bold text-lg mb-2">
                  {capability.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {capability.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemCapabilities;
