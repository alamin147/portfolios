import React, { useState } from "react";

interface CommonTooltipProps {
  children: React.ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  delayDuration?: number;
  className?: string;
}

export default function CommonTooltip({
  children,
  content,
  side = "top",
  sideOffset = 8,
  delayDuration = 300,
  className,
}: CommonTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delayDuration);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const getTooltipPosition = () => {
    switch (side) {
      case "top":
        return `top-full left-1/2 transform -translate-x-1/2 mt-${sideOffset === 8 ? 2 : 1}`;
      case "bottom":
        return `top-full left-1/2 transform -translate-x-1/2 mt-${sideOffset === 8 ? 2 : 1}`;
      case "left":
        return `right-full top-1/2 transform -translate-y-1/2 mr-${sideOffset === 8 ? 2 : 1}`;
      case "right":
        return `left-full top-1/2 transform -translate-y-1/2 ml-${sideOffset === 8 ? 2 : 1}`;
      default:
        return `bottom-full left-1/2 transform -translate-x-1/2 mb-${sideOffset === 8 ? 2 : 1}`;
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 px-3 py-1.5 text-sm text-white bg-gray-900 rounded-md shadow-lg pointer-events-none whitespace-nowrap ${getTooltipPosition()} ${className || ''}`}
        >
          {content}
          {/* Arrow */}
          <div
            className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
              side === "top" ? "top-full left-1/2 -translate-x-1/2 -mt-1" :
              side === "bottom" ? "bottom-full left-1/2 -translate-x-1/2 -mb-1" :
              side === "left" ? "left-full top-1/2 -translate-y-1/2 -ml-1" :
              "right-full top-1/2 -translate-y-1/2 -mr-1"
            }`}
          />
        </div>
      )}
    </div>
  );
}
