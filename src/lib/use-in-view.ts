import { useEffect, useRef } from "react";

export const useInView = <T extends HTMLElement>(
  onInView: () => void,
  enabled: boolean,
) => {
  const ref = useRef<T>(null);
  const callbackRef = useRef(onInView);

  useEffect(() => {
    callbackRef.current = onInView;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) callbackRef.current();
      },
      { rootMargin: "400px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled]);

  return ref;
};
