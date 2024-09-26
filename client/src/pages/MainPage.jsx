import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Products from "../components/Products/Products";

const MainPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden min-h-screen flex flex-col">
      <Navbar />
      <Products />
      <Footer />
    </div>
  )
}

export default MainPage