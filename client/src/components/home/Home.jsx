
import Banner from "./Banner"
import BestSellerBooks from "./BestSellerBooks"
import FavBook from "./FavBook"
import OtherBooks from "./OtherBooks"
import PromoBanner from "./PromoBanner"
import Reviews from "./Reviews"

export default function Home(){
    return(
        <>
        <div >
            <Banner />
            <BestSellerBooks />
            <FavBook />
            <PromoBanner />
            <OtherBooks />
            <Reviews />
        </div>
        </>
    )
}