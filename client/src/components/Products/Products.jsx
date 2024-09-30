import { useEffect, useState } from "react";
import productServices from "../../services/product";
import basketServices from "../../services/basket";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    try{
      const response = await productServices.get();
      setProducts(response.data);
    } catch(error) {
      console.error(error);
    }
  };

  const addProduct = async ( productId ) => {
    const user = localStorage.getItem('profile');
    if(!user) {
      alert('Lütfen önce giriş yapınız!');
      return;
    }

    let id = JSON.parse(user)._id;
    const newBasket = {
      user_id: id,
      product_id: productId,
      amount: 1
    };

    try{
      await basketServices.add(newBasket);
      alert('Ürün eklendi.');
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [products.length]);

  return (
    <div className="container mx-auto max-w-screen-lg">
      <div className="mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
          {products.map((data) => (
            <div key={data._id} className="group">
              <div className="relative">
                <img src={data.photo} alt={data.name} className="h-[180px] w-[260px] object-cover rounded-md" />

                <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200">
                  <button className="bg-red-600 text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10" onClick={() => addProduct(data._id)}>Add To Basket</button>
                </div>
              </div>

              <div className="leading-7">
                <h2 className="font-semibold">{data.name}</h2>
                <h2 className="font-bold">${data.price}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products