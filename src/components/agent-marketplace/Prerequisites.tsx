interface PrerequisitesProps {
  requirements: string[];
}

const Prerequisites = ({ requirements }: PrerequisitesProps) => {
  return (
    <section className="py-8 px-4 bg-[#F9F9F9]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block bg-white border border-black rounded-none p-4">
          <div className="font-['JetBrains_Mono'] text-sm space-x-4">
            {requirements.map((req, index) => (
              <span key={index} className="inline-block">
                {req}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prerequisites;
