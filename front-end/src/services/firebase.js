import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBqQpCAI5yNAkr9m1YccUb2i_VXEJl0-As",
  authDomain: "oficina-integracao-2-ellp.firebaseapp.com",
  projectId: "oficina-integracao-2-ellp",
  storageBucket: "oficina-integracao-2-ellp.firebasestorage.app",
  messagingSenderId: "520757125525",
  appId: "1:520757125525:web:58fcbc02394de8d144169c",
  measurementId: "G-N57H7K1NHV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);