// --- CONFIGURASI FIREBASE (Dapatkan dari Project Settings Firebase) ---
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa0DzGNBSk7_l_-L2Wi33AEStqXCathr8",
  authDomain: "hctf-2b657.firebaseapp.com",
  projectId: "hctf-2b657",
  storageBucket: "hctf-2b657.firebasestorage.app",
  messagingSenderId: "109778257512",
  appId: "1:109778257512:web:6e9e23d929f59c76e19ddd",
  measurementId: "G-LVJ1B22H85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Fungsi Validasi Login menggunakan Cloud
async function validateUser(u, p) {
    try {
        const snapshot = await db.ref('users/' + u).once('value');
        const userData = snapshot.val();
        
        if (userData && userData.pass === p) {
            return userData; // Login Berhasil
        }
        return null; // Username/Password salah
    } catch (error) {
        console.error("Error connecting to Firebase:", error);
        return null;
    }
}
