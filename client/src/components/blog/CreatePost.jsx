

import { Button, Label, Textarea, TextInput } from "flowbite-react";
import axios from "axios";
import { useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

export default function CreatePost(){

    const modules = {toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ align: [] }],
    
        [{ list: 'ordered'}, { list: 'bullet' }],
        [{ indent: '-1'}, { indent: '+1' }],
    
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link', 'image', 'video'],
        [{ color: [] }, { background: [] }],
    
        ['clean'],
    ]}
    const formats =[
        'bold', 'italic', 'underline', 'strike',
        'align', 'list', 'indent',
        'size', 'header',
        'link', 'image', 'video',
        'color', 'background',
    ]
    const { quillRef, quill } = useQuill({modules, formats});
    const [err, seterr] = useState(false)
    const [sucess, setsucess] = useState(false)
    const [msg, setmsg] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        formData.append("content", quill.root.innerHTML);
        formData.set("file", e.target.file.files[0])

        try{
// ####################################################################################################################
//############################ ONLY OBJECT CAN BE SEND TO SERVER USING RESULT BELOW ###################################
// ####################################################################################################################
            const result =await axios.post('http://localhost:4000/dashboard/upload-post',formData,{withCredentials:true})
            if(result.data.error){
                seterr(true)
                setsucess(false)
                setmsg(result.data.error)
            }else{
                e.target.reset()
                quill.setText('');
                seterr(false)
                setsucess(true)
                setmsg(result.data.sucess)
            }
           
        } catch(err){
            console.log(err) 
        }
    }

    return(
        <>
            <div className="px-2 my-12 lg:w-9/12">
                <h2 className="mb-8 text-3xl font-bold text-center">Upload A Post</h2>

                <form onSubmit={handleSubmit} className="flex lg:w-[1180] flex-col flex-wrap gap-4">

                    {/* First Row  */}
                    <div className="flex gap-8">

                        <div className="lg:w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="bookTitle" value="Post Title" />
                            </div>
                                <TextInput id="bookTitle" type="text" name="title" placeholder="Post Title" required />
                        </div>

                        <div className="lg:w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="Genre" value="Post Genre" />
                            </div>
                            <select name="genre" id="genre" className="block w-full mt-2 p-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none">
                                <option value="">Select Post Type</option>
                                <option value="AI">AI</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Educational">Educational</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="News">News</option>
                                <option value="Opinion">Opinion</option>
                                <option value="Inspirational">Inspirational</option>
                                <option value="Promotional">Promotional</option>
                                <option value="Creative">Creative</option>
                                <option value="Community">Community</option>
                                <option value="Technical">Technical</option>
                                <option value="Technology">TechnologyF</option>
                                <option value="Other">Other</option>
                            </select>

                        </div>

                    </div>
                    
                    {/* Second Row   */}
                    <div className="flex gap-8">
                        <div className="lg:w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="file" value="Image" />
                            </div>
                                <TextInput id="file" type="file" name="file" placeholder="Image" required className="p-0" />
                        </div>
                    </div>

                    {/* Third Row  */}
                    <div className="mb-2 block">
                        <Label htmlFor="summary" value="Post Summary" />
                    </div>
                    <Textarea id="summary" name="summary" placeholder="Write post summary..." required rows={3} />
                    

                    {/* Fourth Row  */}
                    <div >
                        <div ref={quillRef} />
                    </div>
                    

                    <div>
                        {err && <p className="text-center text-red-700">{msg}</p>}
                        {sucess && <p className="text-center text-green-700">{msg}</p> }
                    </div>

                    <Button type="submit" className="mt-5 font-semibold bg-blue-700 text-white hover:bg-blue-800 transition duration-200">Upload Book</Button>
                </form>
            </div>
        </>
    )
}