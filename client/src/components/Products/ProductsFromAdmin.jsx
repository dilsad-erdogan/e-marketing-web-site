import { useEffect, useState } from "react";
import productServices from "../../services/product";
import AddPopup from "./Popup/AddPopup";
import UpdatePopup from "./Popup/UpdatePopup";

const ProductsFromAdmin = () => {
  const [products, setProducts] = useState([]);
  const [addPopup, setAddPopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [id, setId] = useState("");

  const fetchProduct = async () => {
    try{
      const response = await productServices.get();
      setProducts(response.data);
    } catch(error) {
      console.error(error);
    }
  };

  const deleteProduct = async ( id ) => {
    try{
      await productServices.deleted(id);
      fetchProduct();
    } catch(error) {
      console.error(error);
    }
  };

  const addProduct = async () => {
    toggleAddPopup();
  };

  const updateProduct = async (id) => {
    try {
      const response = await productServices.byId(id);
      setId(response.data);
    } catch (error) {
      console.error(error);
    }
    toggleUpdatePopup();
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const toggleAddPopup = () => {
    setAddPopup((prev) => !prev);
  };

  const toggleUpdatePopup = () => {
    setUpdatePopup((prev) => !prev);
  };

  return (
    <div className="container mx-auto max-w-screen-lg">
      <div className="flex flex-col justify-center items-center text-center">
        <div className="flex">
          <h2 className="text-center font-bold text-3xl p-6 rounded-lg">Products!</h2>
          
          <button className="bg-red-600 text-white cursor-pointer hover:scale-105 duration-300 m-5 py-1 px-8 rounded-full relative z-10 justify-end items-end" onClick={addProduct}>Add Product</button>
        </div>

        <table className="min-w-full divide-y">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-start text-xs sm:text-sm font-medium">Photo</th>
              <th scope="col" className="px-6 py-3 text-start text-xs sm:text-sm font-medium">Name</th>
              <th scope="col" className="px-6 py-3 text-start text-xs sm:text-sm font-medium">Price</th>
              <th scope="col" className="px-6 py-3 text-start text-xs sm:text-sm font-medium">Active</th>
              <th scope="col" className="px-6 py-3 text-start text-xs sm:text-sm font-medium">Update</th>
              <th scope="col" className="px-6 py-3 text-start text-xs sm:text-sm font-medium">Delete</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="py-4 whitespace-nowrap text-sm font-medium">
                  {product.photo ? (
                    <img src={product.photo} alt={product.name} className="max-h-[100px] object-cover" />
                  ) : (
                    <span>Yükleniyor...</span>
                  )}
                </td>
                <td className="py-4 whitespace-nowrap text-sm font-medium">{product.name}</td>
                <td className="py-4 whitespace-nowrap text-sm font-medium">{product.price}</td>
                <td className="py-4 whitespace-nowrap text-sm font-medium">
                  <div className='bg-gray-100 dark:bg-gray-800 cursor-pointer relative w-20 h-10 rounded-full'>
                    <input className='sr-only peer' type='checkbox' checked={product.is_active} onChange={() => {}} />
                    <span className="w-2/5 h-4/5 bg-gray-800 peer-checked:bg-gray-800 dark:bg-gray-100 dark:peer-checked:bg-gray-100 absolute rounded-full left-1 top-1 peer-checked:left-11 transition-all duration-500"></span>
                  </div>
                </td>
                <td className="py-4 whitespace-nowrap text-sm font-medium">
                  <button className="bg-red-600 text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10" onClick={() => updateProduct(product._id)}>Update</button>
                </td>
                <td className="py-4 whitespace-nowrap text-sm font-medium">
                  <button className="bg-red-600 text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10" onClick={() => deleteProduct(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddPopup addPopup={addPopup} toggleAddPopup={toggleAddPopup}></AddPopup>
      <UpdatePopup updatePopup={updatePopup} toggleUpdatePopup={toggleUpdatePopup} productId={id} fetchProductMain={fetchProduct}></UpdatePopup>
    </div>
  )
}

export default ProductsFromAdmin