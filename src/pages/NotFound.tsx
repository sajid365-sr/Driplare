import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-gray-800 dark:text-gray-300">
          404
        </h1>
        <p className="text-2xl text-gray-400 dark:text-gray-600 mb-8">
          Oops! It seems like you've stumbled upon a page that doesn't exist.
        </p>
        <a
          href="/"
          className="text-blue-500 hover:text-blue-700 underline dark:text-blue-400 dark:hover:text-blue-600"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
