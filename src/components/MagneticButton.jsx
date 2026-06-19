import React, { useRef, useState } from 'react';

export default function MagneticButton({ children, className = "", ...props }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Max magnetic pull range
    const maxPull = 15; // pixels

    // Dampening physics factor
    const pullX = (distanceX / (width / 2)) * maxPull;
    const pullY = (distanceY / (height / 2)) * maxPull;

    setPosition({ x: pullX, y: pullY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
        className={`btn-pressable transition-all duration-300 ease-out-custom select-none ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
