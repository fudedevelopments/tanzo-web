export const GradientLoader = () => {
    return (
        <div className="flex h-24 flex-col items-center justify-center space-y-4">
            <div className="relative h-16 w-16">
                {/* Main gradient spinner */}
                <div className="absolute h-full w-full animate-spin rounded-full 
                        border-[8px] border-b-transparent border-l-transparent 
                        border-r-transparent bg-gradient-to-r from-cyan-400 
                        via-blue-500 to-purple-600 shadow-[0_0_20px_rgba(88,86,214,0.7)]" />

                {/* Pulsating inner circle */}
                <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 
                        -translate-y-1/2 transform animate-pulse rounded-full 
                        bg-gradient-to-r from-pink-400 to-purple-600 
                        shadow-[0_0_30px_rgba(224,46,109,0.5)]" />

                {/* Glowing outer ring */}
                <div className="absolute -inset-2 animate-pulse rounded-full 
                        bg-gradient-to-r from-cyan-400 to-blue-500 
                        opacity-20 blur-xl" />
            </div>

            {/* Animated text with gradient */}
            <span className="animate-gradient bg-gradient-to-r from-cyan-400 
                       via-blue-500 to-purple-600 bg-clip-text text-1xl 
                       font-bold text-transparent">
                Adding magic to every occasion
            </span>
        </div>
    );
};
