import { db } from "@/services/FirebaseConfig";
import { TripDocument } from "@/types/trip";
import axios from "axios";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export type tripData = {
  destination?: string;
  companion?: string;
  budget?: string;
  days?: string;
};
export const validate = (formData: tripData) => {
  const newErrors: string[] = [];

  if (!formData.destination) {
    newErrors.push("Destination is required");
  }
  if (!formData.companion) {
    newErrors.push("Companion is required");
  }
  if (!formData.budget) {
    newErrors.push("Budget is required");
  }
  if (
    !formData.days ||
    isNaN(Number(formData.days)) ||
    Number(formData.days) <= 0
  ) {
    newErrors.push("InValid number of days is required");
  }

  return newErrors;
};

export const isAuth = () => {
  const user = localStorage.getItem("user");
  return user ? true : false;
};

export const getUserInfoFromGoogle = (tokenInfo: any) => {
  axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: `Application/json`,
        },
      }
    )
    .then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
    });
};

export const getAuthUserData = () => {
  return JSON.parse(localStorage.getItem("user") as string);
};
export const saveTrip = async (
  tripData: TripDocument,
  userChoice: tripData
) => {
  const user = getAuthUserData();
  const docId: string = Date.now().toString();
  await setDoc(doc(db, "trips", docId), {
    userChoice: userChoice,
    tripData: tripData,
    userEmail: user?.email,
    id: docId,
  });
  return docId;
};

export async function getDocument(collectionName: string, documentId: string) {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}
export async function getCurrentUserTrips(): Promise<
  TripDocument[] | undefined
> {
  try {
    const user = getAuthUserData();
    const q = query(
      collection(db, "trips"),
      where("userEmail", "==", user?.email)
    );
    const trips: TripDocument[] = [];
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((q) => {
      trips.push(q.data());
    });
    return trips;
  } catch (error) {
    console.log(error);
  }
}
