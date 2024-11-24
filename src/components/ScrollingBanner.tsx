
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';

function ScrollingBanner() {
  return (
    <div className="relative h-64 w-[90%] mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden">

      <div className="absolute flex w-[300%] h-full animate-bounceScroll">
        <img className="w-1/3 h-full object-cover" src={img1} alt="Image 1" />
        <img className="w-1/3 h-full object-cover" src={img2} alt="Image 2" />
        <img className="w-1/3 h-full object-cover" src={img3} alt="Image 3" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white">
        <h2 className="text-xl font-semibold">Discover Unique Customized Gifts!</h2>
      </div>
    </div>
  );
}

export default ScrollingBanner;
