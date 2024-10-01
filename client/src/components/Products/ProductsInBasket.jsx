import { useEffect, useState } from "react";
import basketServices from "../../services/basket";
import productServices from "../../services/product";
import orderServices from "../../services/order";
import orderINproductServices from "../../services/orderINproduct";

const ProductsInBasket = () => {
  const [message, setMessage] = useState(false);
  const [baskets, setBaskets] = useState({});
  const [products, setProducts] = useState({});
  const [id, setId] = useState({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true); // Yüklenme durumu

  const fetchBasket = async (b_id) => {
    try {
      const response = await basketServices.get(b_id);
      setBaskets(response.data);
  
      const pro_id = response.data.map(data => data.product_id);
      const product = await Promise.all(pro_id.map(id => productServices.byId(id)));
      
      const productMap = {};
      product.forEach((res, index) => {
        productMap[pro_id[index]] = res.data;
      });
      setProducts(productMap);
      setLoading(false); // Veriler yüklendi
    } catch (error) {
      console.error(error);
      setLoading(false); // Hata olursa da yüklenme durumu biter
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('profile');
    if (!user) {
      setMessage(true);
      setLoading(false);
      return;
    }
  
    let id = JSON.parse(user)._id;
    setId(id);
    fetchBasket(id);
  }, []);

  useEffect(() => {
    if (baskets.length && Object.keys(products).length) {
      let totalSum = 0;
      baskets.forEach((basket) => {
        const product = products[basket.product_id];
        if (product) {
          totalSum += product.price * basket.amount;
        }
      });
      setTotal(totalSum); // Toplamı güncelle
    }
  }, [baskets, products]); // Sepet veya ürünler güncellenince toplam hesaplanır

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <h2 className="text-center font-bold text-3xl p-6">Yükleniyor...</h2>
      </div>
    );
  }

  const removeBasket = async (pro_id) => {
    try{
      await basketServices.deleted(pro_id);
      fetchBasket(id);
    } catch(error) {
      console.error(error);
    }
  };

  const decrease = async (pro_id, amount) => {
    try{
      await basketServices.updateAmount(pro_id, { amount: amount-1 });
      fetchBasket(id);
    } catch(error) {
      console.error(error);
    }
  };

  const increase = async (pro_id, amount) => {
    try{
      await basketServices.updateAmount(pro_id, { amount: amount+1 });
      fetchBasket(id);
    } catch(error) {
      console.error(error);
    }
  };

  const getOrder = async () => {
    try{
      const newOrder = {
        user_id: id
      };

      const response = await orderServices.add(newOrder);
      const order_id = response.data._id;

      baskets.forEach( async (basket) => {
        const newOIP = {
          order_id: order_id,
          basket_id: basket._id
        };

        await basketServices.deleted(basket._id);
        await orderINproductServices.add(newOIP);
      });

      fetchBasket(id);
      alert('Ürünlerin siparişi verildi!');
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-lg">
      {message ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <h2 className="text-center font-bold text-3xl p-6 border border-gray-300 shadow-lg rounded-lg">
            Lütfen önce giriş yapınız!
          </h2>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-center font-bold text-3xl p-6 rounded-lg">Your basket!</h2>

          <div className="-m-1.5">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700 dark:divide-gray-400">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start text-xs sm:text-sm font-medium">Photo</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs sm:text-sm font-medium">Name</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs sm:text-sm font-medium">Price</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs sm:text-sm font-medium">Amount</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs sm:text-sm font-medium">Remove</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs sm:text-sm font-medium">Total</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-400 dark:divide-gray-700">
                    {baskets.map((basket) => (
                      <tr key={basket._id}>
                        <td className="py-4 whitespace-nowrap text-sm font-medium">
                          {products[basket.product_id] ? (
                            <img src={products[basket.product_id].photo} alt={products[basket.product_id].name} className="max-h-[100px] object-cover" />
                          ) : (
                            <span>Yükleniyor...</span>
                          )}
                        </td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium">{products[basket.product_id].name}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium">{products[basket.product_id].price}</td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium">                          
                          <button onClick={() => {decrease(basket._id, basket.amount)}} className="bg-red-500 text-white py-1 px-2 rounded mr-1">-</button>
                          {basket.amount}
                          <button onClick={() => {increase(basket._id, basket.amount)}} className="bg-green-500 text-white py-1 px-2 rounded ml-1">+</button>
                        </td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium">
                          <button className="inline-block bg-red-600/90 text-white py-2 px-4 mt-4 ml-2 text-sm rounded-full" onClick={() => {removeBasket(basket._id)}}>
                            Remove
                          </button>
                        </td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium">{products[basket.product_id] ? products[basket.product_id].price * basket.amount : 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-between mt-4">
                  <h2 className="text-center font-bold text-xl p-6 rounded-lg">Total: {total}</h2>

                  <button className="inline-block bg-red-600/90 text-white py-2 px-4 mt-4 ml-2 text-sm rounded-full" onClick={() => {getOrder()}}>
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsInBasket;