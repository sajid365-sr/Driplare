interface SystemCapabilitiesProps {
  capabilities: {
    title: string;
    description: string;
  }[];
}

const SystemCapabilities = ({ capabilities }: SystemCapabilitiesProps) => {
  return (
    <section className="py-16 px-4 bg-[#F9F9F9]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">System Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((capability, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border">
              <h3 className="font-bold text-lg mb-3 text-[#FF6B00]">{capability.title}</h3>
              <p className="text-gray-600">{capability.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemCapabilities;
