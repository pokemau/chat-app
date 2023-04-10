import React, { useState } from "react";

// development component only

function Dev() {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const strings = ["one", "two", "three"];

  const handleHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex(-1);
  };

  return (
    <div>
      {strings.map((str, index) => (
        <div
          key={index}
          onMouseEnter={() => handleHover(index)}
          onMouseLeave={handleLeave}>
          {str}
          {hoveredIndex === index && <div className="del">del</div>}
        </div>
      ))}
    </div>
  );
}

export default Dev;
