
import { useContext } from "react"
import { UserContext } from "../../UserContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Logout(){
    const navigate = useNavigate()
    const {setuserInfo, userInfo} = useContext(UserContext)

    const handleLogout =async(e)=>{
        const response = await axios.post("http://localhost:4000/dashboard/logout",{}, {withCredentials:true})
        setuserInfo(null)
        navigate('/')
    }

    const handlenavigate = (e) => {
        navigate('/')
    }


    return(
        <>
            <div className="flex flex-col items-center justify-center w-full px-4 lg:px-24 py-8 bg-gray-100 rounded-lg shadow-md">
                <div className="w-full max-w-md">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Logout</h2>
                        <p className="text-gray-600 mt-2">Are you sure you want to log out?</p>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button 
                            onClick={handleLogout} 
                            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            Yes, Logout
                        </button>
                        <button 
                            onClick={handlenavigate} 
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}