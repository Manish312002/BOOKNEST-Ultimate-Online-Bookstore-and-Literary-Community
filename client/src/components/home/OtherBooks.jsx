import { useEffect, useState } from "react";
import axios from 'axios'
import BookCards from "./BookCards";


export default function OtherBooks(){
    const [books, setbooks] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/books')
        .then(response => {setbooks(response.data)})
        .catch(error => {console.log("Failed to fetch books", error)})
    }, [])

    return(
        <>
        <BookCards books={books} headline='OTHER BOOKS'/>
        </>
    )
}