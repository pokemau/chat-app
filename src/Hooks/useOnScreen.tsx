import { useEffect, useState } from "react";

// hook to check if an element is visible on viewport
const useOnScreen = (ref: any) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIsIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
};

export default useOnScreen;
