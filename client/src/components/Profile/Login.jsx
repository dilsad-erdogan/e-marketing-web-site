import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/auth";

const useTokenExpiration = () => {
  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('profile');
    }
  };

  const interval = setInterval(checkTokenExpiration, 60000); // Her dakika kontrol et
  return () => clearInterval(interval); // Cleanup on unmount
};

const Login = ({ handleSignIn, twoFa, handleFa }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  useTokenExpiration();

  const handleSubmit = async () => {
    try{
      const user = { email: email, password: password };
      const response = await authServices.login(user);

      localStorage.setItem('token', response.token);
      localStorage.setItem('profile', JSON.stringify(response.user));

      if(response.user.role === "66f7aea0cbacb99bbc267965"){
        navigate('/');
      } else if(response.user.role === "66f7aeb6cbacb99bbc267967"){
        navigate('/admin');
      } else{
        alert('Please contact the admin!');
      }
    } catch(error) {
      setErrorMessage('Invalid email or password!');
      console.error(error);
    }
  };

  const getCode = async () => {
    try{
      const userData = { email: email, password: password };
      await authServices.login2FA(userData);
      alert('Code has been sent, check your email.');
    } catch (error){
      console.error(error);
    }
  };

  const verifyLogin = async () => {
    try{
      const userData = { email: email, twoFACode: code };
      const response = await authServices.verify2FA(userData);

      localStorage.setItem('token', response.token);
      localStorage.setItem('profile', JSON.stringify(response.user));
      
      if(response.user.role === "66f7aea0cbacb99bbc267965"){
        navigate('/');
      } else if(response.user.role === "66f7aeb6cbacb99bbc267967"){
        navigate('/admin');
      } else{
        alert('Please contact the admin!');
      }
    } catch (error){
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col justify-between p-20">
      {/* Content */}
      <div className="w-full flex flex-col max-w-[500px]">
        {/* Texts */}
        <div className="w-full flex flex-col mb-2">
          <h3 className="text-3xl font-semibold mb-2">{twoFa ? "2FA Login" : "Login"}</h3>
          <p className="text-base mb-2">Welcome back! Please enter your details.</p>
        </div>

        {/* Inputs */}
        <div className="w-full flex flex-col">
          <input className='w-full py-2 my-2 bg-transparent border-b outline-none focus:outline-none' type='email' placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}} />
          <input className='w-full py-2 my-2 bg-transparent border-b outline-none focus:outline-none' type='password' placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
        </div>

        {twoFa ? (
          <div className='w-full flex flex-col my-4'>
            <button className='w-full text-white my-2 font-semibold bg-red-600 rounded-md p-4 text-center flex items-center justify-center' onClick={getCode}>Send Code</button>
          </div>
        ):(<div></div>)}

        {twoFa ? (
          <div className='w-full flex flex-col'>
            <input className='w-full py-2 my-2 bg-transparent border-b outline-none focus:outline-none' type='text' placeholder='Code' value={code} onChange={(e) => {setCode(e.target.value)}}></input>
          </div>
        ):(<div></div>)}

        {errorMessage && <p className="text-red-600">{errorMessage}</p>}

        {/* Button */}
        <div className="w-full flex flex-col my-4">
          <button className='w-full text-white my-2 font-semibold bg-red-600 rounded-md p-4 text-center flex items-center justify-center' onClick={twoFa ? verifyLogin : handleSubmit}>{twoFa ? "2FA Login" : "Login"}</button>
        </div>
      </div>

      {/* Change register */}
      <div className="w-full flex flex-col items-center justify-center text-center">
        <p className='text-sm font-normal' onClick={handleFa}>Do you want 2FA login? 2FA Login</p>
        <p className='text-sm font-normal' onClick={handleSignIn}>Dont have a account? Sign up</p>
      </div>
    </div>
  )
}

export default Login