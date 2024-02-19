import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import firebase from "firebase/compat/app";

type User ={
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextType ={
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
  }

  type AuthContextProviderProps ={
    children: ReactNode;
  }
  
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>();

    useEffect(()=> {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user){
          const {displayName, photoURL, uid} = user
          
          if (!displayName || !photoURL){
            throw new Error('Missing information form Google Account.')
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      })
  
      return () => {
        unsubscribe();
      }
    }, [])
  
    async function signInWithGoogle(){
      //Autenticação com o google
      const provider = new firebase.auth.GoogleAuthProvider();
  
      const result = await auth.signInWithPopup(provider);
      
        if (result.user){
          const {displayName, photoURL, uid} = result.user
          
          if (!displayName || !photoURL){
            throw new Error('Missing information form Google Account.')
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
  }
  
    return(
    <AuthContext.Provider value={{user, signInWithGoogle}} >
        {props.children}
    </AuthContext.Provider>
    );
}