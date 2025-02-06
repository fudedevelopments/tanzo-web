import ShinyButton from "./smallcomponents/ShinyButton";
import { motion } from "framer-motion";
import { FiGift, FiHeart, FiShoppingCart, FiPlusCircle } from "react-icons/fi";

interface ShinyButtonProps {
  onClick?: () => void;
}

function Hero({ onClick }: ShinyButtonProps) {

  const floatVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const rotatingShapeVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 pb-32">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-white/10 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
            }}
            variants={rotatingShapeVariants}
            initial="initial"
            animate="animate"
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i + 8}
            className="absolute border-t border-white/5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
            }}
            animate={{
              x: [0, 100, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center h-full px-4">
        <motion.div
          className="text-center space-y-8"
          initial="initial"
          animate="animate"
        >
          {/* Main Heading with Split Text Animation */}
          <div className="overflow-hidden">
            <motion.h1
              className="text-5xl md:text-7xl font-playfair font-semibold tracking-tight"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="bg-gradient-to-r from-rose-300 to-amber-300 bg-clip-text text-transparent">
                Welcome To
              </span>{" "}
              <span className="bg-gradient-to-r from-amber-200 to-blue-300 bg-clip-text text-transparent">
                Tanzo
              </span>
            </motion.h1>
          </div>

          {/* Subheading with Staggered Letters */}
          <motion.div
            className="flex justify-center"
            variants={{
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                transition: { staggerChildren: 0.03, delayChildren: 0.2 }
              }
            }}
            initial="initial"
            animate="animate"
          >
            {Array.from("Transform moments into timeless elegance").map((char, i) => (
              <motion.span
                key={i}
                className="text-xl md:text-2xl font-light text-slate-300"
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          {/* Animated Icons Grid */}
          <motion.div
            className="grid grid-cols-4 gap-8 max-w-2xl mx-auto mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
          >
            {[FiGift, FiHeart, FiShoppingCart, FiPlusCircle].map((Icon, i) => (
              <motion.div
                key={i}
                className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                variants={floatVariants}
                animate="float"
              >
                <Icon className="w-12 h-12 mx-auto text-rose-200" />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button with Enhanced Animation */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <ShinyButton
              name="Discover Bespoke Collections"
              onClick={onClick}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZjAiIG9wYWNpdHk9IjAuMDgiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] pointer-events-none" />

      {/* Ambient Light Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] -top-1/2 -left-1/4 bg-gradient-to-r from-rose-400/20 blur-3xl opacity-30" />
        <div className="absolute w-[600px] h-[600px] -bottom-1/2 -right-1/4 bg-gradient-to-l from-blue-400/20 blur-3xl opacity-30" />
      </div>
    </section>
  );
}

export default Hero;
