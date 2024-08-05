import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/services/firebase/config";
import { Marker } from "@/app/types/types";


export const addMarkerToFirebase = async (marker: Marker) => {
    const markersCollectionRef = collection(db, "markers");
    await addDoc(markersCollectionRef, marker);
  };
  
  export const fetchMarkersFromFirebase = async (userUid: any) => {
    const markersCollectionRef = collection(db, "markers");
    const querry = query(markersCollectionRef, where("user.uid", "==", userUid));
    const querySnapshot = await getDocs(querry);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  };
  
  export const fetchFriendsMarkersFromFirebase = async (userUid: any) => {
    const markersCollectionRef = collection(db, "markers");
    const userCollectionRef = collection(db, "users");
  
    const userDocSnapshot = await getDocs(userCollectionRef);
  
    const friends: [] = userDocSnapshot.docs
      .map((doc) => doc.data())
      .find((user) => user.uid === userUid)?.friends;
  
    if (!friends || friends.length == 0) return [];
  
    const querry = query(
      markersCollectionRef,
      where("user.uid", "in", friends)
    );
    const querySnapshot = await getDocs(querry);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  };