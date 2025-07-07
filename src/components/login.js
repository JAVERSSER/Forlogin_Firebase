import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic input validation before calling Firebase
    if (!email || !password) {
      toast.error("Email and password are required.", {
        position: "top-center",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/profile";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      // Log error code and message to debug
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      if (error.code === "auth/user-not-found") {
        toast.error("User not registered yet. Please register first.", {
          position: "top-center",
        });
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.", {
          position: "top-center",
        });
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format. Please check and try again.", {
          position: "top-center",
        });
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Invalid credential. Please check your input.", {
          position: "top-center",
        });
      } else {
        toast.error(error.message, {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        New user? <a href="/register">Register Here</a>
      </p>
      <SignInwithGoogle />
    </form>
  );
}

export default Login;
