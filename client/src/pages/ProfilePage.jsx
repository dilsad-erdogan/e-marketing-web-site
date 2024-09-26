import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Profile from "../components/Profile/Profile";

localStorage.removeItem('user');
localStorage.removeItem('userId');

const ProfilePage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden min-h-screen flex flex-col">
      <Navbar />
      <Profile />
      <Footer />
    </div>
  )
}

export default ProfilePage