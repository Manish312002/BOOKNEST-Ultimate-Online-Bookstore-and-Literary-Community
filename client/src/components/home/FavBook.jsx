import favBook from '../../assets/favbooks.jpg'
import { Link } from 'react-router-dom'


export default function FavBook(){
    return(
        <>
          <div className="px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="md:w-1/2">
              <img src={favBook} alt="Favorite Book" className='rounded-lg shadow-lg transition-transform transform duration-500 hover:scale-105' />
            </div>

            <div className="md:w-1/2 space-y-6">
              <h2 className='text-5xl font-extrabold my-5 leading-tight text-gray-800'>
                Find Your Favorite <span className='text-blue-600'>Book Here!</span>
              </h2>
              
              <p className='mb-10 text-lg text-gray-700 md:w-5/6'>
                Discovering your favorite book can be a transformative experience. Whether you're seeking an escape into a fantastical world, a deep dive into complex characters, or a thought-provoking narrative, the right book has the power to resonate with your soul. From timeless classics to contemporary bestsellers, each book offers a unique journey, inviting you to explore different perspectives and emotions. Whether you prefer gripping thrillers, heartwarming romances, or enlightening non-fiction, there's a perfect read waiting for you. Dive in, explore genres, and find that one book that captures your heart and imagination!
              </p>

              <div className='flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14'>
                <div className='text-center'>
                  <h3 className='text-4xl font-extrabold text-blue-600'>800+</h3>
                  <p className='text-base text-gray-600'>Book Listings</p>
                </div>
                <div className='text-center'>
                  <h3 className='text-4xl font-extrabold text-blue-600'>500+</h3>
                  <p className='text-base text-gray-600'>Registered Users</p>
                </div>
                <div className='text-center'>
                  <h3 className='text-4xl font-extrabold text-blue-600'>1200+</h3>
                  <p className='text-base text-gray-600'>PDF Downloads</p>
                </div>
              </div>

              <Link to='/shop' className='mt-12 block'>
                <button className='bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105'>
                  Explore More
                </button>
              </Link>
            </div>
          </div>

        </>
    )
}