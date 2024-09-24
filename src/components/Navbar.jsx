import { Link } from "react-router-dom";
import bike1 from "../assests/bike2.png";
 

function Navbar() {
    return (
        <div>
            
            <header className="fixed z-50 w-screen px-10 md:px-16 lg:px-20 justify-center">
                <div className="hidden md:flex w-full h-full items-center justify-between px-4 md:px-0 max-w-6xl mx-auto">
                    <p className="text-3xl font-bold mr-auto -ml-4  text-[#000] absolute mb-2">
                        Moto Shop
                    </p>
                    <div className="mr-auto">
                        <div className="-ml-36 relative">
                            <img src={bike1} alt="" className="w-32 mb-3" />
                        </div>
                    </div>

                    <div className="flex items-center gap-8 mr-8 mb-5">
                        <h4 className="cursor-pointer hover:text-blue-600 text-[#000] font-semibold">
                           <Link to={"/home"}>Home</Link> 
                        </h4>
                        <h5 className="cursor-pointer hover:text-orange-500 text-[#000] font-semibold">
                          <Link to={"/aboutus"}>About us</Link>  
                        </h5>
                        <h5 className="cursor-pointer hover:text-orange-500 text-[#000] font-semibold">
                            <Link to={"/contact"}>Contact</Link>
                        </h5>
                    </div>
                </div>
            </header>
            {/* <Prebooking />  */}
        </div>
    );
}

export default Navbar;
