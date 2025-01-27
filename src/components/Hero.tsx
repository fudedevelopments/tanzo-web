
import ShinyButton from "./smallcomponents/ShinyButton";


interface ShinyButtonProps {
  onClick?: () => void;
}

function Hero({onClick}: ShinyButtonProps) {
  return (
    <section className="relative w-full h-screen overflow-visible">
      {/* Spline Section */}

      {/* Text Section */}
      <div className="relative z-5 container flex flex-col items-center justify-center md:items-start md:justify-center h-full text-center md:text-left text-container">
        <div className="text-5xl px-5 py-0 rounded-lg tracking-tight text-black tailwindcss-text-stroke glow-text">
          Welcome to Tanzo
        </div>
        <div className="text-5xl px-5 py-0 rounded-lg tracking-tight text-transparent bg-gradient-to-r from-purple-500 via-green-500 to-blue-500 bg-clip-text stroke-white">
          Lets Start Customization
        </div>
        <div className="px-10 mt-5">
          <ShinyButton name="Explore Products" onClick={onClick}/>
        </div>
      </div>
    </section>
  );
}

export default Hero;
