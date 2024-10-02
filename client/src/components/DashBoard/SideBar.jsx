import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiOutlineLogout, HiOutlineChartBar, HiOutlineCloudUpload, HiOutlineHome, HiUser, HiCollection, HiCreditCard, HiLibrary } from "react-icons/hi";
import userlogo from '../../assets/profile.jpeg';
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBlog } from "react-icons/fa6";

export default function SideBar() {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location]);

    return (
        <div className="flex flex-col md:flex-row h-screen">
    {/* Sidebar */}
    <Sidebar className="bg-gray-800 text-white w-full md:w-64" aria-label="Sidebar">
    <Sidebar.Logo href="/dashboard/profile" className=" w-[200px] flex justify-center items-center">
    <img 
        src={userlogo} 
        alt="Profile logo" 
        className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover " 
    />
    <span className="text-black font-semibold text-lg md:text-xl">User</span>
</Sidebar.Logo>

        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Sidebar.Item 
                    as={Link}
                    to="/" 
                    icon={HiOutlineHome} 
                    className={`hover:bg-gray-700 ${activeItem === '/' ? 'bg-gray-600' : ''}`}
                >
                    Home
                </Sidebar.Item>
                <Sidebar.Item 
                    as={Link}
                    to="/blog" 
                    icon={FaBlog} 
                    className={`hover:bg-gray-700 ${activeItem === '/blog' ? 'bg-gray-600' : ''}`}
                >
                    Blog
                </Sidebar.Item>
                <Sidebar.Item 
                    as={Link}
                    to="/dashboard" 
                    icon={HiOutlineChartBar} 
                    className={`hover:bg-gray-700 ${activeItem === '/dashboard' ? 'bg-gray-600' : ''}`}
                >
                    Dashboard
                </Sidebar.Item>
                <Sidebar.Item 
                    as={Link}
                    to="/dashboard/upload" 
                    icon={HiOutlineCloudUpload} 
                    className={`hover:bg-gray-700 ${activeItem === '/dashboard/upload' ? 'bg-gray-600' : ''}`}
                >
                    Upload Book
                </Sidebar.Item>
                <Sidebar.Item 
                    as={Link}
                    to="/dashboard/manage" 
                    icon={HiLibrary} 
                    className={`hover:bg-gray-700 ${activeItem === '/dashboard/manage' ? 'bg-gray-600' : ''}`}
                >
                    Manage Books
                </Sidebar.Item>
                <Sidebar.Item 
                    as={Link}
                    to="/dashboard/profile" 
                    icon={HiUser} 
                    className={`hover:bg-gray-700 ${activeItem === '/dashboard/profile' ? 'bg-gray-600' : ''}`}
                >
                    Profile
                </Sidebar.Item>
                <Sidebar.Item 
                    as={Link}
                    to="/dashboard/logout" 
                    icon={HiOutlineLogout} 
                    className={`hover:bg-gray-700 ${activeItem === '/dashboard/logout' ? 'bg-gray-600' : ''}`}
                >
                    Log Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
                <Sidebar.Item 
                    as={Link}
                    to="/dashboard/manage_posts" 
                    icon={HiCollection} 
                    className={`hover:bg-gray-700 ${activeItem === '/dashboard/manage_posts' ? 'bg-gray-600' : ''}`}
                >
                    Manage Posts
                </Sidebar.Item>
                <Sidebar.Item 
                    as={Link}
                    to="/dashboard/upload_post" 
                    icon={HiCreditCard} 
                    className={`hover:bg-gray-700 ${activeItem === '/dashboard/upload_post' ? 'bg-gray-600' : ''}`}
                >
                    Upload Post
                </Sidebar.Item>
                <Sidebar.Item 
                    as={Link}
                    to="#" 
                    icon={BiBuoy} 
                    className={`hover:bg-gray-700 ${activeItem === '#help' ? 'bg-gray-600' : ''}`}
                >
                    Help
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>

    {/* Main Content */}
    <div className="flex-1 p-4 md:p-6 overflow-auto">
        {/* Main content goes here */}
    </div>
</div>

    );
}
