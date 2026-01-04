interface ProofSuiteProps {
  povVideo: string;
  beforeImage: string;
  afterImage: string;
}

const ProofSuite = ({ povVideo, beforeImage, afterImage }: ProofSuiteProps) => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Proof of Concept</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-8 rounded-lg">
            <h3 className="font-bold mb-4">Before Implementation</h3>
            <div className="bg-white p-4 rounded border">
              <p className="text-gray-600">Manual processes, inconsistent results, time-consuming tasks.</p>
            </div>
          </div>
          <div className="bg-[#FF6B00]/10 p-8 rounded-lg">
            <h3 className="font-bold mb-4 text-[#FF6B00]">After Implementation</h3>
            <div className="bg-white p-4 rounded border border-[#FF6B00]">
              <p className="text-[#FF6B00]">Automated workflows, consistent results, significant time savings.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofSuite;
