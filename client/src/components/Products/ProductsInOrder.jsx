import { useEffect, useState } from "react";
import orderServices from "../../services/order";
import orderINproductServices from "../../services/orderINproduct";
import productServices from "../../services/product";

const ProductsInOrder = () => {
  const [message, setMessage] = useState(false);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("profile");
    if (!user) {
      setMessage(true);
    }

    let id = JSON.parse(user)._id;
    fetchOrder(id);
  }, []);

  const fetchOrder = async (user_id) => {
    try {
      const response = await orderServices.get(user_id);
      setOrders(response.data);

      const order_id = response.data.map(data => data._id);

      const oipPromises = order_id.map(id => orderINproductServices.get(id));
      const oipResponses = await Promise.all(oipPromises);

      const oipMap = {};
      const productMap = {};

      await Promise.all(
        oipResponses.map(async (res, index) => {
          oipMap[order_id[index]] = res.data;

          const productPromises = res.data.map(oip => productServices.byId(oip.product_id));
          const productResponses = await Promise.all(productPromises);
          productMap[order_id[index]] = productResponses.map(productRes => productRes.data);
        })
      );

      setProducts(productMap);
    } catch (error) {
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
          <h2 className="text-center font-bold text-3xl p-6 rounded-lg">Your orders!</h2>

          <div className="-m-1.5">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-x-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 place-items-center">
                  {orders.map((order) => (
                    <div key={order._id} className="text-center p-6 border border-gray-300 shadow-lg rounded-lg">
                      <div className="flex gap-4">
                        {products[order._id] && products[order._id].map((product) => (
                          <div key={product._id}>
                            <img src={product.photo} alt={product.name} className="h-[50px] w-[100px] object-cover" />
                          </div>
                        ))}
                      </div>
                      
                      <p className="flex justify-end mt-5 font-bold text-xl">Total Price: {order.total_price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsInOrder;