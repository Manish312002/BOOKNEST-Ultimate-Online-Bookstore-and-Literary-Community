
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";

export default function UploadBook(){
    const [err, seterr] = useState(false)

    const [msg, setmsg] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);

        // simple Method 

        // const form = e.target
        // const title = form.bookTitle.value
        // const author = form.author.value 
        // const imgpath = form.bookimgurl.value
        // const category = form.category.value
        // const description = form.bookdesc.value
        // const bookurl = form.bookPDFURL.value
        // const price = form.price.value
        
        const data = {}

        formData.forEach((value, key) => {
            data[key] = value   
        });


        try{

            const result =await axios.post('http://localhost:4000/upload-book',data,{withCredentials:true})
            if(result.data.response){
                seterr(true)
                setmsg(result.data.response)
            }else{
                e.target.reset()
            }
            
        } catch(err){
            console.log(err) 
        }
    }

    return(
        <>
            <div className="px-2 my-12 lg:w-9/12">
                <h2 className="mb-8 text-3xl font-bold text-center">Upload A Book</h2>

                <form onSubmit={handleSubmit} className="flex lg:w-[1180] flex-col flex-wrap gap-4">

                    {/* First Row  */}
                    <div className="flex gap-8">
                        <div className="lg:w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="bookTitle" value="Book Title" />
                            </div>
                                <TextInput id="bookTitle" type="bookTitle" name="bookTitle" placeholder="Book Name" required />
                        </div>
                        <div className="lg:w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="author" value="Book Author" />
                            </div>
                            <TextInput id="author" type="author" name="author" placeholder="Author Name" required />
                        </div>
                    </div>
                    
                    {/* Second Row   */}
                    <div className="flex gap-8">
                        <div className="lg:w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="bookimgurl" value="Book Image URL" />
                            </div>
                                <TextInput id="bookimgurl" type="bookimgurl" name="bookimgurl" placeholder="Book Image URL" required />
                        </div>
                        <div className="lg:w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="category" value="Book Category" />
                            </div>
                            <select name="category" id="category" className="block w-full mt-2 p-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none">
                                <option value="Art">Art</option>
                                <option value="Biography">Biography</option>
                                <option value="Business">Business</option>
                                <option value="Children">Children</option>
                                <option value="Classics">Classics</option>
                                <option value="Comics">Comics</option>
                                <option value="CookBooks">CookBooks</option>
                                <option value="EBooks">EBooks</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Historical">Historical</option>
                                <option value="History">History</option>
                                <option value="Horror">Horror</option>
                                <option value="Music">Music</option>
                                <option value="Mystery">Mystery</option>
                                <option value="Nonfiction">Nonfiction</option>
                                <option value="Psychology">Psychology</option>
                                <option value="Romance">Romance</option>
                                <option value="Science">Science</option>
                                <option value="Sports">Sports</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Travel">Travel</option>
                                <option value="Adult">Adult</option>
                            </select>

                        </div>
                    </div>

                    {/* Third Row  */}
                    <div className="mb-2 block">
                        <Label htmlFor="bookdesc" value="Book Description" />
                    </div>
                    <Textarea id="bookdesc" name="bookdesc" placeholder="Write book description..." required rows={6} />
                    
                    {/* Forth Row  */}
                    <div className="flex gap-8">
                        <div className="lg:w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="bookPDFURL" value="Book PDF URL" />
                            </div>
                                <TextInput id="bookPDFURL" type="bookPDFURL" name="bookPDFURL" placeholder="Book PDF URL" required />
                        </div>
                        <div className="lg:w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="price" value="Book Price" />
                            </div>
                            <TextInput id="price" type="price" name="price" placeholder="Book Price" required />
                        </div>
                    </div>
                    <div>
                        {err && <p className="text-center text-red-700">{msg}</p>}
                    </div>

                    <Button type="submit" className="mt-5 font-semibold bg-blue-700 text-white hover:bg-blue-800 transition duration-200">Upload Book</Button>
                </form>
            </div>
        </>
    )
}