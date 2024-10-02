
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData, Navigate, useParams } from "react-router-dom";


export default function Update(){
    const {title,author,category,description,imgpath,bookurl,price} = useLoaderData().data[0]
    const {id} = useParams()
    const [err, seterr] = useState(false)
    const [msg, setmsg] = useState("")
    const [redirect, setredirect] = useState(false)

    


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);

        
        const data = {}

        formData.forEach((value, key) => {
            data[key] = value   
        });


        try{
// ####################################################################################################################
//############################ ONLY OBJECT CAN BE SEND TO SERVER USING RESULT BELOW ###################################
// ####################################################################################################################
            const result =await axios.patch(`http://localhost:4000/book/update/${id}`,data,{withCredentials:true})
            if(result.data.response){
                seterr(true)
                setmsg(result.data.response)
            }else{
                seterr(false)
                setredirect(true)
            }
            
        } catch(err){
            console.log(err) 
        }
    }

    if(redirect){
        return <Navigate to={'/dashboard/manage'} replace/>
    }

    return(
        <>
        <div className="px-4 my-12 lg:w-9/12 mx-auto">
    <h2 className="mb-8 text-3xl font-bold text-center">Update the Book Data</h2>

    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* First Row */}
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
                <Label htmlFor="bookTitle" value="Book Title" />
                <TextInput 
                    defaultValue={title} 
                    id="bookTitle" 
                    type="text" 
                    name="bookTitle" 
                    placeholder="Enter Book Name" 
                    required 
                    className="mt-2"
                />
            </div>
            <div className="lg:w-1/2">
                <Label htmlFor="author" value="Book Author" />
                <TextInput 
                    defaultValue={author} 
                    id="author" 
                    type="text" 
                    name="author" 
                    placeholder="Enter Author Name" 
                    required 
                    className="mt-2"
                />
            </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
                <Label htmlFor="bookimgurl" value="Book Image URL" />
                <TextInput 
                    defaultValue={imgpath} 
                    id="bookimgurl" 
                    type="url" 
                    name="bookimgurl" 
                    placeholder="Enter Book Image URL" 
                    required 
                    className="mt-2"
                />
            </div>
            <div className="lg:w-1/2">
                <Label htmlFor="category" value="Book Category" />
                <select 
                    defaultValue={category} 
                    name="category" 
                    id="category" 
                    className="block w-full mt-2 p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                    {["Art", "Biography", "Business", "Children", "Classics", "Comics", "CookBooks", "EBooks", "Fantasy", "Fiction", "Historical", "History", "Horror", "Music", "Mystery", "Nonfiction", "Psychology", "Romance", "Science", "Sports", "Thriller", "Travel", "Adult"].map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Third Row */}
        <div>
            <Label htmlFor="bookdesc" value="Book Description" />
            <Textarea 
                defaultValue={description} 
                id="bookdesc" 
                name="bookdesc" 
                placeholder="Write book description..." 
                required 
                rows={6} 
                className="mt-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" 
            />
        </div>

        {/* Fourth Row */}
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
                <Label htmlFor="bookPDFURL" value="Book PDF URL" />
                <TextInput 
                    defaultValue={bookurl} 
                    id="bookPDFURL" 
                    type="url" 
                    name="bookPDFURL" 
                    placeholder="Enter Book PDF URL" 
                    required 
                    className="mt-2"
                />
            </div>
            <div className="lg:w-1/2">
                <Label htmlFor="price" value="Book Price" />
                <TextInput 
                    defaultValue={price} 
                    id="price" 
                    type="number" 
                    name="price" 
                    placeholder="Enter Book Price" 
                    required 
                    className="mt-2"
                />
            </div>
        </div>

        {/* Error Message */}
        {err && <p className="text-center text-red-700">{msg}</p>}

        <Button 
            type="submit" 
            className="mt-5 font-semibold bg-blue-700 text-white hover:bg-blue-800 transition duration-200"
        >
            Update Book
        </Button>
    </form>
</div>

        </>
    )
}