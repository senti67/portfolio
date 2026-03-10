import { useState, useEffect } from "react";

const Typewriter = ({ text, delay = 50 }) => {
  const [output, setOutput] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    setOutput("");
    setIsTyping(true);

    const interval = setInterval(() => {
      setOutput(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <span className="mono text-cyan-700 font-medium">
      {output}
      <span className={isTyping ? "blink-cursor" : "blink-cursor opacity-50"} />
    </span>
  );
};

export default Typewriter;