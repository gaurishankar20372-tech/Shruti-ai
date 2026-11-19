import React from "react";
import { motion } from "motion/react";

interface SoundWaveProps {
  state: "idle" | "connecting" | "listening" | "speaking";
}

export const SoundWave: React.FC<SoundWaveProps> = ({ state }) => {
  // Wave bars for speaking animation
  const bars = Array.from({ length: 5 }, (_, i) => i);

  // Expanding circles for speaking/listening
  const circles = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div id="soundwave-container" className="relative flex items-center justify-center w-64 h-64 mx-auto">
      {/* Background radial glow */}
      <div
        id="bg-radial-glow"
        className={`absolute inset-0 rounded-full bg-gradient-to-tr transition-opacity duration-700 blur-3xl ${
          state === "idle"
            ? "from-rose-500/10 to-purple-500/10 opacity-40"
            : state === "connecting"
            ? "from-amber-500/20 to-pink-500/20 opacity-60 animate-pulse"
            : state === "listening"
            ? "from-emerald-400/20 to-teal-500/20 opacity-80"
            : "from-rose-500/40 via-purple-600/40 to-pink-500/40 opacity-100"
        }`}
      />

      {/* Expanding Rings */}
      {(state === "speaking" || state === "listening") &&
        circles.map((index) => (
          <motion.div
            key={index}
            id={`ring-${index}`}
            className={`absolute rounded-full border ${
              state === "listening"
                ? "border-emerald-400/30"
                : "border-rose-400/40"
            }`}
            initial={{ width: 120, height: 120, opacity: 0.8 }}
            animate={{
              width: state === "speaking" ? 260 : 200,
              height: state === "speaking" ? 260 : 200,
              opacity: 0,
            }}
            transition={{
              repeat: Infinity,
              duration: state === "speaking" ? 1.5 : 2.5,
              delay: index * (state === "speaking" ? 0.5 : 0.8),
              ease: "easeOut",
            }}
          />
        ))}

      {/* Dynamic Sound Bars behind the core orb when speaking */}
      {state === "speaking" && (
        <div id="speaking-bars" className="absolute flex items-center justify-center space-x-2 z-0">
          {bars.map((bar) => (
            <motion.div
              key={bar}
              id={`bar-${bar}`}
              className="w-2 bg-gradient-to-t from-rose-500 to-purple-400 rounded-full opacity-60"
              initial={{ height: 40 }}
              animate={{
                height: [40, 140, 60, 160, 40],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8 + bar * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Central Core Avatar / Orb */}
      <motion.div
        id="core-orb-outer"
        className={`relative z-10 flex items-center justify-center w-36 h-36 rounded-full shadow-2xl border backdrop-blur-md transition-colors duration-500 ${
          state === "idle"
            ? "bg-slate-900/90 border-slate-700/80 shadow-slate-950"
            : state === "connecting"
            ? "bg-slate-900/90 border-amber-500/40 shadow-amber-500/10"
            : state === "listening"
            ? "bg-emerald-950/80 border-emerald-400/60 shadow-emerald-500/20"
            : "bg-gradient-to-tr from-rose-600/90 to-purple-700/90 border-rose-300/80 shadow-rose-500/40"
        }`}
        animate={
          state === "speaking"
            ? { scale: [1, 1.08, 0.98, 1.05, 1] }
            : state === "listening"
            ? { scale: [1, 1.03, 1] }
            : { scale: 1 }
        }
        transition={{
          repeat: Infinity,
          duration: state === "speaking" ? 0.6 : 2,
          ease: "easeInOut",
        }}
      >
        {/* Core inner glow / eyes or waves */}
        <div id="core-orb-inner" className="flex flex-col items-center justify-center text-center p-4">
          {state === "idle" && (
            <span className="text-slate-400 text-sm font-medium tracking-wider">
              OFFLINE
            </span>
          )}

          {state === "connecting" && (
            <div className="flex space-x-1.5 items-center">
              <motion.div
                className="w-2.5 h-2.5 bg-amber-400 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
              />
              <motion.div
                className="w-2.5 h-2.5 bg-amber-400 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
              />
              <motion.div
                className="w-2.5 h-2.5 bg-amber-400 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
              />
            </div>
          )}

          {state === "listening" && (
            <motion.div
              className="flex flex-col items-center"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <div className="w-3 h-3 bg-emerald-400 rounded-full mb-2 shadow-[0_0_12px_#34d399]" />
              <span className="text-emerald-200 text-xs font-semibold tracking-widest uppercase">
                Listening
              </span>
            </motion.div>
          )}

          {state === "speaking" && (
            <motion.div className="flex flex-col items-center">
              <span className="text-white font-bold text-lg tracking-wider drop-shadow-md">
                AVANI
              </span>
              <span className="text-rose-200 text-[10px] tracking-widest uppercase mt-0.5 opacity-90">
                Speaking
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
