import DarkMode from "./DarkMode";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    navigate('/');
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          {/* Logo and links section */}
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-red-600 font-semibold tracking-widest text-2xl uppercase sm:text-3xl">E - Marketing</a>
          </div>

          {/* Search and darkMode section */}
          <div className="flex justify-between items-center gap-4">
            <DarkMode />

            <button className="bg-red-600 text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10" onClick={logout}>LogOut</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar