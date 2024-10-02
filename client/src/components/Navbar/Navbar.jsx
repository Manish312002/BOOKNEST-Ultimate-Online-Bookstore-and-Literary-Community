import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBookAtlas, FaBars, FaXmark, FaCartPlus } from "react-icons/fa6";
import { UserContext } from '../../UserContext';
import axios from 'axios';

function Navbar() {
    const [isSticky, setIsSticky] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {userInfo, setuserInfo} = useContext(UserContext)
    const [activeLink, setActiveLink] = useState('');

    const handleToggleBtn = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        axios.get('http://localhost:4000/profile', {withCredentials:true})
        .then(response =>{setuserInfo(response.data)})
        .catch(error => {('Error fetching user info:', error)
            setuserInfo(null)
        });
    
    },[])


    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 30);
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLinkClick = (path) => {
        setActiveLink(path);
        setIsMenuOpen(false); // Close the menu when a link is clicked
      };

      const navItems = [
        { link: 'Home', path: '/' },
        { link: 'About', path: '/about' },
        { link: 'Shop', path: '/shop' },
        { link: 'Blog', path: '/blog' },
        ...(userInfo
          ? [{ link: 'DashBoard', path: '/dashboard' }]
          : [
              { link: 'Login', path: '/login' },
              { link: 'Register', path: '/register' },
            ])
      ];
      

    return (
        <>
        <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300'>
  <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300 shadow-lg" : ""}`}>
    <div className='flex justify-between items-center text-base gap-8'>
      <Link to='/' className='text-2xl font-bold text-blue-700 flex items-center gap-2'>
        <FaBookAtlas className='inline-block' /> BOOKNEST
      </Link>

      {/* Nav items for large devices */}
      <ul className='md:flex space-x-12 hidden'>
        {navItems.map(({ link, path }) => (
          <li key={path}>
            <Link
              to={path}
              className={`block text-base cursor-pointer uppercase transition-colors duration-200 ${activeLink === path ? 'text-blue-700 font-semibold' : 'text-black hover:text-blue-700'}`}
              onClick={() => handleLinkClick(path)}
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>

      {/* Button for large devices */}
      <div className='space-x-12 hidden lg:flex items-center'>
        <Link to={userInfo ? '/shop/cart' : '#'} className='text-black hover:text-blue-700'>
          {userInfo ? <FaCartPlus className='text-3xl' /> : <FaBars className='text-3xl' />}
        </Link>
      </div>

      {/* Button for small devices */}
      <div className="md:hidden">
        <button onClick={handleToggleBtn} className="text-black focus:outline-none hover:text-blue-700">
          {isMenuOpen ? <FaXmark className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
        </button>
      </div>

      {/* Nav items for small devices */}
      <div className={`fixed top-0 right-0 left-0 z-50 transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"} bg-blue-700 py-7 px-4`}>
        <ul className="space-y-4">
          {navItems.map(({ link, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`block text-base text-white uppercase cursor-pointer transition-colors duration-200 ${activeLink === path ? 'text-blue-300 font-semibold' : ''}`}
                onClick={() => {
                  handleLinkClick(path); // Close menu and set active link
                  setIsMenuOpen(false); // Close the menu on link click
                }}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </nav>
</header>

      </>
  
    );
}

export default Navbar;
