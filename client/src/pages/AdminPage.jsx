import Navbar from "../components/Navbar/NavbarFromAdmin";
import Footer from "../components/Footer/Footer";
import ProductsFromAdmin from "../components/Products/ProductsFromAdmin";

const AdminPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden min-h-screen flex flex-col">
      <Navbar />
      <ProductsFromAdmin />
      <Footer />
    </div>
  )
}

export default AdminPage