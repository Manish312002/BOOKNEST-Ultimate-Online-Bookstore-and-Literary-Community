
import axios from "axios";
import { Button, FloatingLabel } from "flowbite-react";
import { useState } from "react";


export default function Register(){
    const [err, seterr] = useState(false)
    const [sucess, setsucess] = useState(false)
    const [msg, setmsg] = useState("")

    function isValidPassword(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length > 7;
        
        return hasUpperCase && hasLowerCase && hasSymbol && isLongEnough;
    }

    const handleregisteration = async (e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const newuser = {}
        formData.forEach((value, key) =>{
            newuser[key] = value
        })

        const {username, password, email, full_name, confirm_password} = newuser
        if( !username || !password || !email || !full_name ){
            seterr(true)
            setmsg("All fields are required!")
        }else if(password !== confirm_password){
            seterr(true)
            setmsg("Password does not match, Try again!")
        }else{
            seterr(false)
            if(isValidPassword(password)){
                const result = await axios.post('http://localhost:4000/register',newuser)
                if(result.data.sucess){
                    seterr(false)
                    setsucess(true)
                    setmsg(result.data.sucess)
                    e.target.reset()
                }else{
                    setsucess(false)
                    seterr(true)
                    setmsg(result.data.message)
                }
                
            }else{
                seterr(err)
                setmsg("Password must be atleast 8+ characters with upper, lower, and special characters.");
            }    
        }
    }
    return(
        <>
            <div className="container mx-auto px-4 lg:px-24 flex items-center">
    <div className="flex w-full flex-col md:flex-row justify-center items-center gap-12 py-40">
        <form 
            onSubmit={handleregisteration} 
            className="flex max-w-md w-full flex-col gap-4 bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
        >
            <div>
                <div className="mb-2 block">
                    <FloatingLabel 
                        variant="outlined" 
                        type="text" 
                        label="Username" 
                        name="username" 
                        className="transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200" 
                    />
                </div>

                <div className="mb-2 block">
                    <FloatingLabel 
                        variant="outlined" 
                        type="text" 
                        label="Full Name" 
                        name="full_name" 
                        className="transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200" 
                    />
                </div>

                <div className="mb-2 block">
                    <FloatingLabel 
                        variant="outlined" 
                        type="email" 
                        label="Email" 
                        name="email" 
                        className="transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200" 
                    />
                </div>

                <div className="mb-2 block">
                    <FloatingLabel 
                        variant="outlined" 
                        type="password" 
                        label="Password" 
                        name="password" 
                        className="transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200" 
                    />
                </div>

                <div className="mb-2 block">
                    <FloatingLabel 
                        variant="outlined" 
                        type="password" 
                        label="Confirm Password" 
                        name="confirm_password" 
                        className="transition-all duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200" 
                    />
                </div>
            </div>

            {err && <p className="text-red-700 text-center">{msg}</p>}
            {sucess && <p className="text-green-700 text-center">{msg}</p>}
            <Button className="transition-colors duration-300 hover:bg-blue-500 hover:text-white" type="submit">
                Register
            </Button>
        </form>
    </div>
</div>


        </>
    )
}