import { useState, useEffect } from "react";
import { bike } from "../data.js";
import Prebooking from "./Prebooking.jsx";
function Body() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % bike.length 
      );
    }, 2000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div>
      <div className="flex justify-center ml-96">
        <img
          src={bike[currentImageIndex].imageSrc} 
          alt={`Bike ${currentImageIndex + 1}`}
          className="w-880 transition-all duration-1000 ease-in-out mt-1 ml-48"
        />
      </div>
      <div>
      <Prebooking/>
      </div>
      

    </div>
  );
}

export default Body;
