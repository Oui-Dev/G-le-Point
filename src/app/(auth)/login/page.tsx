"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, db } from "@/services/firebase/config";
import { redirectTo } from "@/lib/actions";
import {
  faceBookSignIn,
  googleSignIn,
  microsoftSignIn,
  useAuthStore,
} from "@/stores/authStore";
import { FirebaseUser } from "@/types/index";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";

const Login = () => {
  const { isAuthenticated, login } = useAuthStore();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (isAuthenticated) {
      redirectTo("/map");
    }
  }, [isAuthenticated]);

  const addToDbIfNewUser = async (user: any) => {
    const usersCollectionRef = collection(db, "users");
    const querry = query(usersCollectionRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(querry);
    if (querySnapshot.empty) {
      addDoc(usersCollectionRef, {
        ...user,
        friends: [],
        invitationCode: Math.random().toString(36).substr(2, 9),
      });
    }
  };

  const handleSignInFacebook = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const authUser = await faceBookSignIn();
      if (authUser && authUser.user) {
        const firebaseUser: FirebaseUser = {
          uid: authUser.user.uid,
          displayName: authUser.user.displayName,
          email: authUser.user.email,
          photoURL: authUser.user.photoURL,
        };
        login(firebaseUser);
        addToDbIfNewUser(firebaseUser);
        redirectTo("/map");
      }
    } catch (error : string | any) {
      if(error.code === 'auth/account-exists-with-different-credential'){
        setErrorMessage('Un compte avec cette adresse email existe déjà, veuillez vous connecter avec un autre fournisseur de connexion');
      }
    }
  };

  const handleSignInGoogle = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const authUser = await googleSignIn();
      if (authUser && authUser.user) {
        const firebaseUser: FirebaseUser = {
          uid: authUser.user.uid,
          displayName: authUser.user.displayName,
          email: authUser.user.email,
          photoURL: authUser.user.photoURL,
        };
        login(firebaseUser);
        addToDbIfNewUser(firebaseUser);
        redirectTo("/map");
      }
    } catch (error: string | any) {
      if(error.code === 'auth/account-exists-with-different-credential'){
        setErrorMessage('Un compte avec cette adresse email existe déjà, veuillez vous connecter avec un autre fournisseur de connexion');
      }
    }
  };

  const handleSignInMicrosoft = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const authUser = await microsoftSignIn();
      console.log(authUser);
      if (authUser && authUser.user) {
        const firebaseUser: FirebaseUser = {
          uid: authUser.user.uid,
          displayName: authUser.user.displayName,
          email: authUser.user.email,
          photoURL: authUser.user.photoURL,
        };
        login(firebaseUser);
        addToDbIfNewUser(firebaseUser);
        redirectTo("/map");
      }
    } catch (error: string | any) {
      if(error.code === 'auth/account-exists-with-different-credential'){
        setErrorMessage('Un compte avec cette adresse email existe déjà, veuillez vous connecter avec un autre fournisseur de connexion');
      }
    }
  }

  return (
    <main className="h-[90vh] flex justify-center items-center flex-col gap-24">
      <div className="flex flex-col gap-4">
        <Image
          className="mx-auto"
          src={"/images/logo-glepoint.svg"}
          width={250}
          height={250}
          alt="Logo de GlePoint"
        />
      </div>

      <Card className="w-3/4 flex items-center flex-col md:w-auto md:px-24">
        <CardHeader>
          <CardTitle>Connectez vous</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button variant="outline" size="sm" onClick={handleSignInGoogle}>
            Se connecter avec
            <Image
              src="/images/google-icon.svg"
              height={18}
              width={18}
              alt="Google Icon"
              className="ml-2"
            />
          </Button>
          <Button variant="outline" size="sm" onClick={handleSignInFacebook}>
            Se connecter avec
            <Image
              src="/images/facebook-icon.svg"
              height={18}
              width={18}
              alt="Facebook Icon"
              className="ml-2"
            />
          </Button>
          <Button variant="outline" size="sm" onClick={handleSignInMicrosoft}>
            Se connecter avec
            <Image
              src="/images/microsoft-icon.svg"
              height={18}
              width={18}
              alt="Microsoft Icon"
              className="ml-2"
            />
          </Button>
        </CardContent>
      </Card>
      {
        errorMessage && <div className={`absolute top-4 right-4 h-6 w-auto bg-glp-green-600 p-5 rounded-sm flex justify-center items-center text-white`}>
          {errorMessage}
          </div>
      }
    </main>
  );
};

export default Login;
