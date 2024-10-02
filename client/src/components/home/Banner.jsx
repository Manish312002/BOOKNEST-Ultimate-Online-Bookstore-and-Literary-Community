import { useState } from "react"
import SwiperCard from "./swiper"
import { Link } from "react-router-dom"


export default function Banner() {
    const [searchtag, setseatchtag] = useState('a')

    return(
        <>
        <div className="px-4 lg:px-24 bg-teal-100 flex items-center">
    <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">

        {/* Text Content */}
        <div className="md:w-1/2 space-y-8">
            <h2 className="text-5xl font-bold leading-snug text-black">
                Buy and Sell Your Books <span className="text-blue-700">for the Best Prices</span>
            </h2>
            <p className="md:w-4/5 text-gray-700">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias aliquid laudantium nulla assumenda. 
                Dolor minima enim voluptate facere laboriosam debitis quisquam accusamus magni, assumenda quas at 
                non cupiditate incidunt eaque!
            </p>
            <div className="flex">
                <input
                    type="search"
                    name="search"
                    id="search"
                    onChange={e => setseatchtag(e.target.value)}
                    placeholder="Search for a book"
                    className="py-2 px-4 rounded-l-md outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <Link
                    to={`/shop/books/${searchtag}`}
                    className="bg-blue-700 px-6 py-2 font-medium text-white hover:bg-black transition-all duration-200 rounded-r-md"
                >
                    Search
                </Link>
            </div>
        </div>

        {/* Swiper Component */}
        <div className="md:w-1/2">
            <SwiperCard />
        </div>
    </div>
</div>

        </>
    )
}
