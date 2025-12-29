interface ProofSuiteProps {
  povVideo: string;
  beforeImage: string;
  afterImage: string;
}

const ProofSuite = ({ povVideo, beforeImage, afterImage }: ProofSuiteProps) => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-['Montserrat'] font-bold text-2xl mb-12 text-center">
          The Proof Suite
        </h2>

        {/* POV Video */}
        <div className="mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black p-2 rounded-none border border-black">
              <video
                src={povVideo}
                controls
                className="w-full h-auto"
                poster="/api/placeholder/800/450"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center font-['JetBrains_Mono']">
              POV video: Customer messaging → AI instant response
            </p>
          </div>
        </div>

        {/* Before/After Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-white border border-black rounded-none p-2 mb-4">
              <img
                src={beforeImage}
                alt="Manual Chaos"
                className="w-full h-auto"
              />
            </div>
            <h3 className="font-['Montserrat'] font-bold text-lg mb-2">Manual Chaos</h3>
            <p className="text-gray-600 text-sm">Hours spent sorting messages manually</p>
          </div>

          <div className="text-center">
            <div className="bg-white border border-black rounded-none p-2 mb-4">
              <img
                src={afterImage}
                alt="Driplare Automated Flow"
                className="w-full h-auto"
              />
            </div>
            <h3 className="font-['Montserrat'] font-bold text-lg mb-2">Driplare Automated Flow</h3>
            <p className="text-gray-600 text-sm">Intelligent 24/7 lead capture & qualification</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofSuite;
