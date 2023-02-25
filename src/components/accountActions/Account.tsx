import { getAuth, onAuthStateChanged } from "@firebase/auth"
import { useEffect, useState } from "react"
import { ShowProfile } from "./ShowProfile"
import { SignInButton } from "./SignInButton"

export const Account = () => {
  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      user ? setIsAuthenticated(true) : setIsAuthenticated(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      {
        isAuthenticated ?
        <ShowProfile />
        :
        <SignInButton />
      }
    </>
  );
}