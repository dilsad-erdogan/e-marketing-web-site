import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/auth";

const Register = ({ handleSignIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if(password === password2){
      try{
        const userData = { role: "66f7aea0cbacb99bbc267965", name: name, email: email, password: password };
        await authServices.register(userData);
        alert('Registration was successful.');
        navigate('/profile');
      } catch(error) {
        alert('Registration was not successful.', error);
      }
    } else{
      alert('Passwords do not match.');
    }
  };

  return (
    <div className="flex flex-col justify-between p-20">
      {/* Content */}
      <div className="w-full flex flex-col max-w-[500px]">
        {/* Texts */}
        <div className="w-full flex flex-col mb-2">
          <h3 className="text-3xl font-semibold mb-2">Register</h3>
          <p className="text-base mb-2">Welcome! Please enter your details.</p>
        </div>

        {/* Inputs */}
        <div className="w-full flex flex-col">
          <input className='w-full py-2 my-2 bg-transparent border-b outline-none focus:outline-none' type='name' placeholder='Name' value={name} onChange={(e) => {setName(e.target.value)}} />
          <input className='w-full py-2 my-2 bg-transparent border-b outline-none focus:outline-none' type='email' placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}} />
          <input className='w-full py-2 my-2 bg-transparent border-b outline-none focus:outline-none' type='password' placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
          <input className='w-full py-2 my-2 bg-transparent border-b outline-none focus:outline-none' type='password' placeholder='Password again' value={password2} onChange={(e) => {setPassword2(e.target.value)}} />
        </div>

        {/* Button */}
        <div className="w-full flex flex-col my-4">
          <button className='w-full text-white my-2 font-semibold bg-red-600 rounded-md p-4 text-center flex items-center justify-center' onClick={handleSubmit}>Register</button>
        </div>
      </div>

      {/* Change register */}
      <div className="w-full flex flex-col items-center justify-center text-center">
        <p className='text-sm font-normal' onClick={handleSignIn}>Sign in</p>
      </div>
    </div>
  )
}

export default Register