"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * The 11:58 Clock — A symbolic countdown.
 * 
 * Inspired by the Doomsday Clock concept: the minute hand sits at 11:58,
 * two minutes to midnight, representing how close humanity is to
 * catastrophic AI risk. The second hand sweeps continuously,
 * emphasizing that the clock is still ticking.
 */
export function Clock1158({ size = 160 }: { size?: number }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s + 1) % 60);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const center = size / 2;
  const radius = size / 2 - 4;

  // Hour hand at ~11:58 position (349 degrees out of 360)
  const hourAngle = (11 / 12) * 360 + (58 / 60) * 30; // ~359°
  // Minute hand at 58 minutes (348 degrees)
  const minuteAngle = (58 / 60) * 360;
  // Second hand sweeps normally
  const secondAngle = (seconds / 60) * 360;

  const hourLength = radius * 0.45;
  const minuteLength = radius * 0.65;
  const secondLength = radius * 0.75;

  const polarToCartesian = (angle: number, length: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: center + length * Math.cos(rad),
      y: center + length * Math.sin(rad),
    };
  };

  const hourEnd = polarToCartesian(hourAngle, hourLength);
  const minuteEnd = polarToCartesian(minuteAngle, minuteLength);
  const secondEnd = polarToCartesian(secondAngle, secondLength);

  // Tick marks
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const angle = (i / 60) * 360;
    const isHour = i % 5 === 0;
    const innerRadius = isHour ? radius - 10 : radius - 5;
    const start = polarToCartesian(angle, innerRadius);
    const end = polarToCartesian(angle, radius);
    return { start, end, isHour };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
      className="relative"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="opacity-40 hover:opacity-60 transition-opacity duration-1000"
      >
        {/* Outer ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#1f1f1f"
          strokeWidth="1"
        />

        {/* Tick marks */}
        {ticks.map((tick, i) => (
          <line
            key={i}
            x1={tick.start.x}
            y1={tick.start.y}
            x2={tick.end.x}
            y2={tick.end.y}
            stroke={tick.isHour ? "#808080" : "#333333"}
            strokeWidth={tick.isHour ? 1.5 : 0.5}
          />
        ))}

        {/* Hour hand */}
        <line
          x1={center}
          y1={center}
          x2={hourEnd.x}
          y2={hourEnd.y}
          stroke="#808080"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Minute hand */}
        <line
          x1={center}
          y1={center}
          x2={minuteEnd.x}
          y2={minuteEnd.y}
          stroke="#e0e0e0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Second hand */}
        <motion.line
          x1={center}
          y1={center}
          x2={secondEnd.x}
          y2={secondEnd.y}
          stroke="#808080"
          strokeWidth="0.5"
          strokeLinecap="round"
          initial={false}
          animate={{
            x2: secondEnd.x,
            y2: secondEnd.y,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* Center dot */}
        <circle cx={center} cy={center} r="2" fill="#e0e0e0" />
      </svg>

      {/* Label below clock */}
      <p className="text-center text-[10px] tracking-[0.4em] uppercase text-muted-foreground/40 mt-2 font-serif">
        11 : 58
      </p>
    </motion.div>
  );
}
