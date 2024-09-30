import { useEffect, useState } from "react";

const ProductsInOrder = () => {
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('profile');
    if(!user){
      setMessage(true);
    }
  }, []);

  return (
    <div className="container">
      {message ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <h2 className="text-center font-bold text-3xl p-6 border border-gray-300 shadow-lg rounded-lg">Lütfen önce giriş yapınız!</h2>
        </div>
      ) : (
        <div>
          <p>Giriş yapıldı</p>
        </div>
      )}
    </div>
  )
}

export default ProductsInOrder