interface SystemMediaProps {
  primaryVideo: string;
  logicSchematic: string;
  interfaceGallery: string[];
}

const SystemMedia = ({ primaryVideo, logicSchematic, interfaceGallery }: SystemMediaProps) => {
  return (
    <div className="space-y-8">
      {/* The Master Demo */}
      <div className="relative bg-black p-2 rounded-none border border-black">
        <div className="aspect-video bg-gray-800 flex items-center justify-center">
          <video
            src={primaryVideo}
            controls
            className="w-full h-full object-cover"
            poster="/api/placeholder/800/450"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* The Logic Schematic */}
      <div className="bg-white border border-black rounded-none p-2">
        <img
          src={logicSchematic}
          alt="Logic Schematic"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Interface Gallery */}
      <div className="grid grid-cols-1 gap-4">
        {interfaceGallery.map((screenshot, index) => (
          <div key={index} className="bg-white border border-black rounded-none p-2">
            <img
              src={screenshot}
              alt={`Interface Screenshot ${index + 1}`}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemMedia;
