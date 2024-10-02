

import { Table, TableCell } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ManageBooks(){
    const [allBooks, setallBooks] = useState([])

    useEffect(() =>{
        axios.get('http://localhost:4000/dashboard/books',{withCredentials:true})
        .then((response) => setallBooks(response.data))
        .catch((error) => (console.log(error)))
    },[])

    const handledelete = async(id) =>{
        try{
            const response = await axios.delete(`http://localhost:4000/book/delete/${id}`,{withCredentials:true})
        }catch(err){
            console.log(err)
        }
    }

    

    return(
        <>
            <div className="px-4 my-12">
                <h2 className="mb-8 text-3xl font-bold">Manage Your Books</h2>
                <div className="overflow-x-auto">
                <Table hoverable className="lg:w-[1080px] mx-auto border border-gray-300 rounded-lg shadow-lg">
                    <Table.Head>
                        <Table.HeadCell className="bg-gray-200 text-gray-700 font-semibold text-center">
                            Sr.No
                        </Table.HeadCell>
                        <Table.HeadCell className="bg-gray-200 text-gray-700 font-semibold">
                            Book Title
                        </Table.HeadCell>
                        <Table.HeadCell className="bg-gray-200 text-gray-700 font-semibold text-center">
                            Author
                        </Table.HeadCell>
                        <Table.HeadCell className="bg-gray-200 text-gray-700 font-semibold text-center">
                            Category
                        </Table.HeadCell>
                        <Table.HeadCell className="bg-gray-200 text-gray-700 font-semibold text-center">
                            Price ($)
                        </Table.HeadCell>
                        <Table.HeadCell className="bg-gray-200 text-gray-700 font-semibold text-center">
                            Edit
                        </Table.HeadCell>
                        <Table.HeadCell className="bg-gray-200 text-gray-700 font-semibold text-center">
                            Delete
                        </Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y">
                        {allBooks.map((book, index) => (
                            
                            <Table.Row key={book.id} className="hover:bg-gray-100 transition-colors duration-200">
                            <Table.Cell className="p-4 text-center">{index + 1}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white p-4">
                                {book.title}
                            </Table.Cell>
                            <Table.Cell className="p-4 text-center">{book.author}</Table.Cell>
                            <Table.Cell className="p-4 text-center">{book.category}</Table.Cell>
                            <Table.Cell className="p-4 text-center">${book.price}</Table.Cell>
                            <Table.Cell className="p-4 text-center">
                            <button 
                                    type="button" 
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                <Link to={`/dashboard/edit/book/${book.id}`}>
                                    Edit
                                </Link>
                                </button>
                            </Table.Cell>
                            <Table.Cell className="p-4 text-center">
                                <button 
                                    onClick={async () => {
                                        if (window.confirm(`Are you sure you want to delete ${book.title}?`)) {
                                            try {
                                                await handledelete(book.id);
                                                alert(`${book.title} has been deleted successfully.`);
                                            } catch (error) {
                                                alert(`Failed to delete ${book.title}. Please try again.`);
                                            }
                                        }
                                    }} 
                                    type="button" 
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
                                    aria-label={`Delete ${book.title}`}
                                >
                                    Delete
                                </button>
                            </Table.Cell>
                        </Table.Row>
                        
                        ))}
                    </Table.Body>
                </Table>

                </div>
            </div>
        </>
    )
}