import Navbar from "../components/Navbar/NavbarFromAdmin";
import Footer from "../components/Footer/Footer";
import ProductsFromAdmin from "../components/Products/ProductsFromAdmin";

const AdminPage = () => {
  return (
    <div>
      <Navbar />
      <ProductsFromAdmin />
      <Footer />
    </div>
  )
}

export default AdminPage