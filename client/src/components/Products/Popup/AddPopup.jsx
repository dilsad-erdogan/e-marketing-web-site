import { useRef, useState } from "react";
import productServices from "../../../services/product";

const AddPopup = ({ addPopup, toggleAddPopup }) => {
  const addPopupRef = useRef();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");

  window.addEventListener("click", (e) => {
    if(addPopupRef.current === e.target) {
        toggleAddPopup();
    }
  });

  const addProduct = async () => {
    try{
      const newProduct = {
        name: name,
        photo: photo,
        price: price
      };

      await productServices.add(newProduct);
      toggleAddPopup();
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <div>
        {addPopup && (
          <div  ref={addPopupRef} className="fixed top-0 left-0 w-full h-full z-50 overflow-y-auto">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-auto bg-gray-800 dark:bg-gray-200 text-white dark:text-black p-4">
              <div className="p-6">
                <h1 className="text-3xl font-bold text-center mb-4">Add Product</h1>

                <form className="flex flex-col gap-3">
                  <input type="text" className="border w-full rounded-full py-2 outline-none px-4 focus:ring-2 focus:border-transparent bg-transparent" placeholder="Name" value={name} onChange={(e) => {setName(e.target.value)}} />
                  <input type="text" className="border w-full rounded-full py-2 outline-none px-4 focus:ring-2 focus:border-transparent bg-transparent" placeholder="Photo" value={photo} onChange={(e) => {setPhoto(e.target.value)}} />
                  <input type="text" className="border w-full rounded-full py-2 outline-none px-4 focus:ring-2 focus:border-transparent bg-transparent" placeholder="Price" value={price} onChange={(e) => {setPrice(e.target.value)}} />
                  <button className="bg-red-600 text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10 justify-end" onClick={addProduct}>Add Product</button>
                </form>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default AddPopup