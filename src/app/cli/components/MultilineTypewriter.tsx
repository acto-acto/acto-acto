"use client";

import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { createRoot } from "react-dom/client";

export default function MultilineTypewriter({
  lines,
  onDone,
}: {
  lines: string[];
  onDone?: () => void;
}) {
  const [currentLine, setCurrentLine] = useState(0);
  const timeStamp = Date.now().toString().slice(0, 4);

  useEffect(() => {
    if (currentLine < lines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, lines[currentLine].length * 40 + 1000);

      return () => clearTimeout(timer);
    } else if (onDone && currentLine === lines.length - 1) {
      const timer = setTimeout(() => {
        onDone();
      }, lines[currentLine].length * 40 + 1000);

      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  useEffect(() => {
    if (currentLine > 0) {
      const container = document.getElementById(
        `multiline-typewriter-${timeStamp}`
      );

      if (container) {
        const newLineDiv = document.createElement("div");
        newLineDiv.id = `line-${currentLine}-${timeStamp}`;
        container.appendChild(newLineDiv);
        const root = createRoot(newLineDiv);

        root.render(
          <Typewriter
            words={[lines[currentLine]]}
            typeSpeed={40}
            key={`typewriter-${currentLine}`}
          />
        );
      }
    }
  }, [currentLine]);

  return (
    <div id={`multiline-typewriter-${timeStamp}`}>
      <div id={`line-0-${timeStamp}`}>
        <Typewriter words={[lines[0]]} typeSpeed={40} />
      </div>
    </div>
  );
}
