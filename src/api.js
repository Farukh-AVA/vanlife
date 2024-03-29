import "./server"
import { initializeApp } from "firebase/app";
import { 
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    where
} from "firebase/firestore/lite"; 

const firebaseConfig = {
  apiKey: "AIzaSyBubDxD2qHh2XjKIwYzLrnMr9xw0XClmZE",
  authDomain: "vanlife-d6ea9.firebaseapp.com",
  projectId: "vanlife-d6ea9",
  storageBucket: "vanlife-d6ea9.appspot.com",
  messagingSenderId: "671306853189",
  appId: "1:671306853189:web:0e2166541f976a6c566c2c"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

const vansCollectionRef = collection(db, "vans");

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef);
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans; 
}

export async function getVan(id){
    const docRef = doc(db, "vans", id);
    const snapshot = await getDoc(docRef); 
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
    
}


export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}





/** 
    export async function getVans(id) {
        const url = id ? `/api/vans/${id}` : "/api/vans"
        const res = await fetch(url)
        if (!res.ok) {
            throw {
                message: "Failed to fetch vans",
                statusText: res.statusText,
                status: res.status
            }
        }
        const data = await res.json()
        return data.vans
    }

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}
*/
export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}