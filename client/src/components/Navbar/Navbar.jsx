import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import DarkMode from "./DarkMode";
import { useNavigate } from "react-router-dom";

const MenuLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Basket",
    link: "/basket",
  },
  {
    name: "Order",
    link: "/order",
  },
  {
    name: "Profile",
    link: "/profile",
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    navigate('/');
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40 container mx-auto max-w-screen-lg">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          {/* Logo and links section */}
          <div className="flex items-center gap-4">
            <a href="/" className="text-red-600 font-semibold tracking-widest text-2xl uppercase sm:text-3xl">E - Marketing</a>

            {/* Hamburger Icon (only shows on small screens) */}
            <button className="block lg:hidden text-2xl" onClick={toggleMenu}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {MenuLinks.map((data) => (
                  <li key={data.name}>
                    <a href={data.link} className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200">
                      {" "}
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
              <div className="lg:hidden mt-4">
                <ul className="flex flex-col items-start gap-2">
                  {MenuLinks.map((data) => (
                    <li key={data.name}>
                      <a href={data.link} className="block px-4 py-2 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200" >
                        {data.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Search and darkMode section */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input type="text" placeholder="Search" className="search-bar" />
              <IoMdSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200"/>
            </div>

            <DarkMode />

            <button className="bg-red-600 text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10" onClick={logout}>LogOut</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar