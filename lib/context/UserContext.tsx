// context/UserContext.tsx
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { auth } from "@/lib/firebase/setup";
import { onAuthStateChanged, User } from "firebase/auth";

interface IUserContext {
  user: User | null;
    loading: boolean;
    email?: string; // Optional: if you want to expose email or other user details
}

export const UserContext = createContext<IUserContext>({
  user: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    
    console.log("UserProvider initialized, loading:", loading, "user:", user); // Debug output

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        console.log("Auth state changed, firebaseUser:", firebaseUser); // Debug output
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // You might choose to render a loading indicator here or let the component below handle it.
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
