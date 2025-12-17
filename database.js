// database.js

const firebaseConfig = {
  apiKey: "AIzaSyAa0DzGNBSk7_l_-L2Wi33AEStqXCathr8",
  authDomain: "hctf-2b657.firebaseapp.com",
  projectId: "hctf-2b657",
  databaseURL: "https://hctf-2b657-default-rtdb.firebaseio.com", // Pastikan URL ini benar sesuai dashboard Firebase
  storageBucket: "hctf-2b657.firebasestorage.app",
  messagingSenderId: "109778257512",
  appId: "1:109778257512:web:6e9e23d929f59c76e19ddd",
  measurementId: "G-LVJ1B22H85"
};

// Inisialisasi Firebase (Cara Compat)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// Fungsi Validasi Login - Harus pakai async
async function validateUser(u, p) {
    try {
        // Menunggu data dari Firebase Cloud
        const snapshot = await db.ref('users/' + u).once('value');
        const userData = snapshot.val();
        
        if (userData && userData.pass === p) {
            return userData; 
        }
        return null; 
    } catch (error) {
        console.error("Error Firebase:", error);
        return null;
    }
}
