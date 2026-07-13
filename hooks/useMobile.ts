import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if window is defined (for Next.js SSR compatibility)
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < breakpoint);
      };

      // Initial check
      checkIsMobile();

      // Listen for window resize
      const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setIsMobile(e.matches);
      };

      // Modern API for adding event listeners to media queries
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
      }

      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
        } else {
          // Fallback for older browsers
          mediaQuery.removeListener(handleChange);
        }
      };
    }
  }, [breakpoint]);

  return isMobile;
}
