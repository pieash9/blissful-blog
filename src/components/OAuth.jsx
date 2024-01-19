import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultFromGoggle = await signInWithPopup(auth, provider);

      const userData = {
        name: resultFromGoggle.user.displayName,
        email: resultFromGoggle.user.email,
        googlePhotoUrl: resultFromGoggle.user.photoURL,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/auth/google`,
        userData
      );
      console.log(res);
      if (res.data) {
        dispatch(signInSuccess(res.data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
    >
      <AiFillGoogleCircle className="size-6 mr-2" />
    </Button>
  );
};

export default OAuth;
