import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; 

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && isMounted) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            const fullName = user.displayName || "No Name";
            const [firstName, ...lastParts] = fullName.split(" ");
            const lastName = lastParts.join(" ");
            const newUserData = {
              email: user.email || "",
              firstName,
              lastName,
              photo: user.photoURL || "",
            };
            await setDoc(docRef, newUserData);
            setUserDetails(newUserData);
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        } finally {
          if (isMounted) setLoading(false);
        }
      } else if (isMounted) {
        navigate("/login", { replace: true });
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", minHeight: "400px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3 style={{ textAlign: "center", marginTop: "1rem" }}>
          {loading ? "Loading..." : `Welcome ${userDetails.firstName} 🙏🙏`}
        </h3>
      </div>

      {!loading && (
        <div style={{ marginTop: "1rem" }}>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>First Name:</strong> {userDetails.firstName}</p>
          <p><strong>Last Name:</strong> {userDetails.lastName || "-"}</p>
          <button className="btn btn-primary" onClick={handleLogout} style={{ marginTop: "1rem" }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
