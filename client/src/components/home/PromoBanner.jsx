import { Link } from "react-router-dom"
import NAbook from '../../assets/NAbook.png'



export default function PromoBanner(){
    return(
        <>

          <div className="mt-16 py-12 bg-teal-50 px-4 lg:px-24 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6 leading-snug">
                  2024 National Book Awards for Fiction Shortlist
                </h2>
                <Link to="/shop" className="block">
                  <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-500 transition-all duration-300 transform hover:scale-105">
                    Get Promo
                  </button>
                </Link>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={NAbook}
                  alt="National Book Awards"
                  className="w-full max-w-md rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>

        </>
    )
}