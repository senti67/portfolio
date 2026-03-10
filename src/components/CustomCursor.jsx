import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
        outlineRef.current.animate(
          { left: `${e.clientX}px`, top: `${e.clientY}px` },
          { duration: 150, fill: "forwards" }
        );
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.closest("a, button, .glass-panel, .interactive")) {
        outlineRef.current?.classList.add("hovering");
      } else {
        outlineRef.current?.classList.remove("hovering");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={outlineRef} className="cursor-outline hidden md:block" />
    </>
  );
};

export default CustomCursor;