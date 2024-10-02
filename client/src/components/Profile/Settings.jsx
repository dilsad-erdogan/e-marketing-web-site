import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import userServices from "../../services/user";

const Settings = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('profile');
    setId(JSON.parse(user)._id);
    setName(JSON.parse(user).name);
    setEmail(JSON.parse(user).email);
  }, []);

  const logoutClick = () => {
    console.log("çalıştı")
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    navigate('/');
  };

  const saveName = async () => {
    logoutClick();
    try{
      await userServices.updateName(id, { name: name });
    } catch(error) {
      console.error(error);
    }
  };

  const saveEmail = async () => {
    logoutClick();
    try{
      await userServices.updateEmail(id, { email: email });
    } catch(error) {
      console.error(error);
    }
  };

  const savePassword = async () => {
    if(password === password2){
      logoutClick();
      try{
        await userServices.updatePassword(id, { password: password });
      } catch(error) {
        console.error(error);
      }
    } else {
      alert('Passwordler uyuşmuyor!');
    }
  };

  return (
    <div className="container mx-auto max-w-screen-lg">
      <div className="flex flex-col justify-center items-center text-center">
        <h2 className="text-center font-bold text-3xl p-6 rounded-lg">Settings!</h2>

        <div className="-m-1.5">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-x-auto">
                <form>
                  <div className="flex m-5 gap-5 items-center justify-start">
                    <h2 className="text-center font-bold text-xl p-6 rounded-lg">Name:</h2>
                    <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border border-gray-300 shadow-lg rounded-lg" />
                    <button className="bg-red-600 text-white cursor-pointer duration-300 py-2 px-8 rounded-full" onClick={saveName}>Edit Name</button>
                  </div>

                  <div className="flex m-5 gap-5 items-center justify-start">
                    <h2 className="text-center font-bold text-xl p-6 rounded-lg">Email:</h2>
                    <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border border-gray-300 shadow-lg rounded-lg" />
                    <button className="bg-red-600 text-white cursor-pointer duration-300 py-2 px-8 rounded-full" onClick={saveEmail}>Edit Email</button>
                  </div>

                  <div className="flex m-5 gap-5 items-center justify-start">
                    <h2 className="text-center font-bold text-xl p-6 rounded-lg">Password:</h2>
                    <input type="text" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border border-gray-300 shadow-lg rounded-lg" />
                  </div>
                  <div className="flex m-5 gap-5 items-center justify-start">
                    <h2 className="text-center font-bold text-xl p-6 rounded-lg">Password Again:</h2>
                    <input type="text" placeholder="Enter your password again" value={password2} onChange={(e) => setPassword2(e.target.value)} className="p-2 border border-gray-300 shadow-lg rounded-lg" />
                    <button className="bg-red-600 text-white cursor-pointer duration-300 py-2 px-8 rounded-full" onClick={savePassword}>Edit Password</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Settings