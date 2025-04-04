import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { app } from './setup';

// Get Firestore instance
export const db = getFirestore(app);

export const createUserProfile = async (userId: string, userData: any) => {
    const userRef = doc(collection(db, 'users'), userId);
    await setDoc(userRef, userData, { merge: true });
    return userRef;
}

export const getUserProfile = async (userId: string) => {
    const userRef = doc(collection(db, 'users'), userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        return userDoc.data();
    } else {
        console.error("No such user!");
        return null;
    }
}