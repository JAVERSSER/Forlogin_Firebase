import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import googleLogo from "../google.png"; // import image correctly

function SignInwithGoogle() {
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();

    // Force account chooser popup every time
    provider.setCustomParameters({ prompt: "select_account" });

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: user.displayName,
            photo: user.photoURL,
            lastName: "",
          });
          toast.success("User logged in Successfully", {
            position: "top-center",
          });
          window.location.href = "/profile";
        }
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
        toast.error("Google sign-in failed. Please try again.", {
          position: "top-center",
        });
      });
  };

  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={googleLogo} alt="signIn" width="60%" />
      </div>
    </div>
  );
}

export default SignInwithGoogle;
