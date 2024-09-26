import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Settings from "./Settings";

const Profile = () => {
  const [showsignin, setShowsignin] = useState(false);
  const id = localStorage.getItem('userId');

  const handleSignIn = () => {
    setShowsignin(!showsignin);
  };

  return (
    <div className="container">
      {id === null ? (
        <div className="sm:w-[600px] md:w-[380px]">
          {showsignin ? <Register handleSignIn={handleSignIn} /> : <Login handleSignIn={handleSignIn} />}
        </div>
      ) : (
        <Settings />
      )}
    </div>
  )
}

export default Profile