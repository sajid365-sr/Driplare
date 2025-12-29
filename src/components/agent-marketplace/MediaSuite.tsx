interface MediaSuiteProps {
  primaryVideo: string;
  screenshots: string[];
}

const MediaSuite = ({ primaryVideo, screenshots }: MediaSuiteProps) => {
  return (
    <div className="space-y-8">
      {/* Primary Video */}
      <div className="relative bg-black p-4 rounded-none border border-gray-300">
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
        {/* MacBook-style frame */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-4 border-gray-400 rounded-none">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-600 rounded-none"></div>
        </div>
      </div>

      {/* Secondary Screenshots */}
      <div className="grid grid-cols-2 gap-4">
        {screenshots.map((screenshot, index) => (
          <div key={index} className="relative bg-white border border-gray-300 rounded-none overflow-hidden">
            <img
              src={screenshot}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaSuite;
