import { motion } from "framer-motion";



const TanzoBenefits = () => {
  return (
    <div className="relative overflow-hidden py-8 bg-gray-50">
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
        Why Choose <span className="text-pink-500">Tanzo Gifts</span>?
        </h2>
        <div className="container">
        <div className="flex overflow-hidden mask-gradient ">
        <motion.div  animate={{
          translateX : "-100%"
        }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
        }}
        >
              <div className="flex gap-x-16 flex-none">
              <img src="/src/assets/support.png" alt="support" className="logo-benefit-image" />
              <img src="/src/assets/bestprice.png" alt="bestprice"className="logo-benefit-image" />
              <img src="/src/assets/fastdelivery.png" alt="fastdelivery" className="logo-benefit-image"/>
              <img src="/src/assets/trust.png" alt="trust" className="logo-benefit-image" />
              <img src="/src/assets/secure.png" alt="payment" className="logo-benefit-image" />
              {/* second */}
              <img src="/src/assets/support.png" alt="support" className="logo-benefit-image" />
              <img src="/src/assets/bestprice.png" alt="bestprice" className="logo-benefit-image" />
              <img src="/src/assets/fastdelivery.png" alt="fastdelivery" className="logo-benefit-image" />
              <img src="/src/assets/trust.png" alt="trust" className="logo-benefit-image" />
              <img src="/src/assets/secure.png" alt="payment" className="logo-benefit-image" />
          </div>
          </motion.div>
        </div>
      </div>
      
    </div>
  );
};

export default TanzoBenefits;
