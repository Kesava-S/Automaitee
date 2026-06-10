import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedTextCycle({
  words,
  interval = 5000,
  className = "",
  style = {}
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState("auto");
  const [widths, setWidths] = useState([]);
  const measureRef = useRef(null);

  // Measure all word widths once on mount or when words change
  const wordsKey = words.join('|');
  useEffect(() => {
    if (measureRef.current) {
      const elements = measureRef.current.children;
      const calculatedWidths = Array.from(elements).map(
        (el) => el.getBoundingClientRect().width + 15
      );
      setWidths(calculatedWidths);
    }
  }, [wordsKey]);

  // Set container width based on current word index from cache
  useEffect(() => {
    if (widths.length > currentIndex) {
      setWidth(`${widths[currentIndex]}px`);
    }
  }, [currentIndex, widths]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  // Container animation for the whole word
  const containerVariants = {
    hidden: { 
      y: -20,
      opacity: 0,
      filter: "blur(8px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
      transition: { 
        duration: 0.3, 
        ease: "easeIn"
      }
    },
  };

  return (
    <>
      {/* Hidden measurement div with all words rendered */}
      <div 
        ref={measureRef} 
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden", position: "absolute", opacity: 0, pointerEvents: "none" }}
      >
        {words.map((word, i) => (
          <span key={i} className={`font-bold ${className}`} style={style}>
            {word}
          </span>
        ))}
      </div>

      {/* Visible animated word */}
      <motion.span 
        className="relative inline-block"
        animate={{ 
          width,
          transition: { 
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 1.2,
          }
        }}
        style={{ position: "relative", display: "inline-block" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block font-bold ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ whiteSpace: "nowrap", display: "inline-block", ...style }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}
