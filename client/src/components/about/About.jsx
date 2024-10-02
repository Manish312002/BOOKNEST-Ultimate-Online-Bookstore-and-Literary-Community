



export default function About(){
    return(
        <>
        <div className="px-4 lg:px-24 w-full my-16">
            <div className="w-10/12 mx-auto px-4 py-10">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">About Us</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-center">
                    Welcome to our bookstore! We believe that books have the power to change lives, ignite imaginations, and connect us all. Our mission is to provide a cozy and inviting space for readers of all ages to explore, discover, and cherish the written word.
                </p>
                <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    At our bookstore, we strive to promote literacy and a love for reading in our community. We curate a diverse selection of titles, from bestsellers to hidden gems, ensuring that every reader finds something they love.
                </p>
                <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Values</h3>
                <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 mb-6">
                    <li className="transition-transform transform hover:scale-105">Community: We are committed to fostering a sense of belonging among our customers.</li>
                    <li className="transition-transform transform hover:scale-105">Diversity: We celebrate the diverse voices and stories that enrich our lives.</li>
                    <li className="transition-transform transform hover:scale-105">Sustainability: We support eco-friendly practices in our operations.</li>
                </ul>
                <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Story</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Founded in 2024, our bookstore started as a small corner shop with a dream. Over the years, we have grown into a beloved community hub, hosting author events, book clubs, and workshops. Our passionate team is dedicated to helping you find your next great read!
                </p>
            </div>
        </div>
        </>
    )
}