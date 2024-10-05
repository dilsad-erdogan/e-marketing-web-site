import { useEffect, useRef, useState } from "react";
import productServices from "../../../services/product";

const UpdatePopup = ({ updatePopup, toggleUpdatePopup, productId, fetchProductMain }) => {
  const updatePopupRef = useRef();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");

  window.addEventListener("click", (e) => {
    if (updatePopupRef.current === e.target) {
      toggleUpdatePopup();
    }
  });

  useEffect(() => {
    if (productId) {
      setName(productId.name || "");
      setPhoto(productId.photo || "");
      setPrice(productId.price || "");
    }
  }, [productId]);

  const updateName = async () => {
    try {
      await productServices.updateName(productId._id, { name });
      fetchProductMain();
    } catch (error) {
      console.error(error);
    }
  };

  const updatePhoto = async () => {
    try {
      await productServices.updatePhoto(productId._id, { photo });
      fetchProductMain();
    } catch (error) {
      console.error(error);
    }
  };

  const updatePrice = async () => {
    try {
      await productServices.updatePrice(productId._id, { price });
      fetchProductMain();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {updatePopup && (
        <div ref={updatePopupRef} className="fixed top-0 left-0 w-full h-full z-50 overflow-y-auto">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-auto rounded-md bg-gray-800 dark:bg-gray-200 text-white dark:text-black p-4">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-center mb-4">Update Product</h1>

              <form className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <input type="text" className="border w-full rounded-full py-2 outline-none px-4 focus:ring-2 focus:border-transparent bg-transparent" value={name} onChange={(e) => setName(e.target.value)} />
                  <button type="button" className="bg-red-600 text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10" onClick={updateName}>
                    Update
                  </button>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col gap-2">
                    <img src={photo} alt={name} className="h-[100px] object-cover rounded-md" />
                    <input type="text" className="border w-full rounded-full py-2 outline-none px-4 focus:ring-2 focus:border-transparent bg-transparent" value={photo} onChange={(e) => setPhoto(e.target.value)} />
                  </div>
                  <button type="button" className="bg-red-600 text-white cursor-pointer hover:scale-105 duration-300 m-10 py-2 px-8 rounded-full relative z-10" onClick={updatePhoto}>
                    Change
                  </button>
                </div>

                <div className="flex gap-3">
                  <input type="text" className="border w-full rounded-full py-2 outline-none px-4 focus:ring-2 focus:border-transparent bg-transparent" value={price} onChange={(e) => setPrice(e.target.value)} />
                  <button type="button" className="bg-red-600 text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10" onClick={updatePrice}>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePopup;