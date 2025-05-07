
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Update the state initially
    setMatches(media.matches);
    
    // Define a callback function to handle changes
    const listener = () => {
      setMatches(media.matches);
    };
    
    // Add the listener to handle changes
    media.addEventListener('change', listener);
    
    // Remove event listener on cleanup
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}
