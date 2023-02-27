import { getAuth, onAuthStateChanged } from "@firebase/auth"
import { useEffect, useState } from "react"
import { SignInButton } from "./SignInButton"
import { SignOutButton } from "./SignOutButton"

export const DrawerAccount = () => {
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
        <SignOutButton />
        :
        <SignInButton />
      }
    </>
  );
}