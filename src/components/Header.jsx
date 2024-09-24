import { bike } from "../data.js";
import { useState } from "react";
import Container from "./Container.jsx";
import Navbar from "../components/Navbar.jsx";
import Body from "./Body.jsx";
function Header()
{
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 1;
  
    const scrollLeft = () => {
      setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
    };
  
    const scrollRight = () => {
      setStartIndex((prevIndex) =>
        Math.min(prevIndex + itemsPerPage, bike.length - itemsPerPage)
      );
    };
  
    return(<div className="">
      
      <div className="text-black relative">
      <Navbar/>
     
      </div>
      <div className="absolute ml-10 mt-20 bg-white">
        <h1 className="mt-40 text-3xl font-semibold relative ">Hello,</h1>
        <div>
        <p className="ml-20 -mt-8 text-3xl font-bold text-blue-800 kanit-semibold">&nbsp;Motoshop</p>

        </div>
        <p className="suse-paragraph font-semibold text-xl font-sans mt-1 bg-white">
  Riding a motorcycle isn't just about the freedom 
  <br />of the open road—it's  a chance to escape the everyday and 
  <br />connect with the world around you.
</p>


      </div>

      <div className="bg-white">
        <Body/>
      </div>
      <div className="top-2/3 -mt-14 m-6 p-1  absolute">
      <div className="">
      <Container/>
      </div>
      </div>
      
    </div>)
}
export default Header