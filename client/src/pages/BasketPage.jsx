import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ProductsInBasket from "../components/Products/ProductsInBasket";

const BasketPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden min-h-screen flex flex-col">
      <Navbar />
      <ProductsInBasket />
      <Footer />
    </div>
  )
}

export default BasketPage