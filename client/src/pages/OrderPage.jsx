import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ProductsInOrder from "../components/Products/ProductsInOrder";

const OrderPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden min-h-screen flex flex-col">
      <Navbar />
      <ProductsInOrder />
      <Footer />
    </div>
  )
}

export default OrderPage