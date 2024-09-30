import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Settings from "./Settings";

const Profile = () => {
  const [showsignin, setShowsignin] = useState(false);
  const [twoFa, setTwoFa] = useState(false);
  const user = localStorage.getItem('profile');

  const handleSignIn = () => {
    setShowsignin(!showsignin);
  };

  const handleFa = () => {
    setTwoFa(!twoFa);
  };

  return (
    <div className="container mx-auto max-w-screen-lg">
      {user === null ? (
        <div className="mt-20 justify-center items-center text-center place-items-center">
          {showsignin ? <Register handleSignIn={handleSignIn} /> : <Login handleSignIn={handleSignIn} twoFa={twoFa} handleFa={handleFa} />}
        </div>
      ) : (
        <Settings />
      )}
    </div>
  )
}

export default Profile