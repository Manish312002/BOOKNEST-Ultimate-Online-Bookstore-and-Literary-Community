
import axios from "axios";
import { Button, FloatingLabel } from "flowbite-react";
import { useState } from "react";
import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function Login(){
    const [err, seterr] = useState(false)
    const [redirect, setredirect] = useState(false)
    const [msg, setmsg] = useState("")
    const {setuserInfo} = useContext(UserContext)

    const handlelogin = async (e) =>{
        e.preventDefault()

        const formData = new FormData(e.target)
        const userData = {}
        formData.forEach((value,key) =>{
            userData[key] = value
        })

        if(userData.username === "" || userData.password === ""){
            seterr(true)
            setmsg("Enter the Username and Password")
            return;
        }else{
            seterr(false)

            const resposnse = await axios.post("http://localhost:4000/login",userData,{withCredentials:true})

            if(resposnse.data.message){
                seterr(true)
                setmsg(resposnse.data.message)  
            }else{
                setredirect(true)
                setuserInfo(resposnse.data)
            }
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return(
        <>
            <div className="px-4 lg:px-24 flex items-center">
                <div className="flex w-full flex-col md:flex-row justify-center items-center gap-12 py-40">
                    <form 
                        onSubmit={handlelogin} 
                        className="flex max-w-md w-full flex-col gap-4 bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                    >
                        <div>
                            <div className="mb-2 block">
                                <FloatingLabel 
                                    variant="outlined" 
                                    type="text" 
                                    label="Username or Email" 
                                    name="username" 
                                    className="transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <FloatingLabel 
                                    variant="outlined" 
                                    type="password" 
                                    label="Password" 
                                    name="password" 
                                    className="transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                            </div>
                        </div>
                        {err && <p className="text-red-700 text-center">{msg}</p>}
                        <Button 
                            className="transition-colors duration-300 hover:bg-blue-500 hover:text-white" 
                            type="submit"
                        >
                            Log in
                        </Button>
                    </form>
                </div>
            </div>

        </>
    )
}