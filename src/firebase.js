import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyAtIZqcozVy6-HTG_V1FHo8iaY9PSqKBHo",

   authDomain: "toutube-graphql.firebaseapp.com",

   projectId: "toutube-graphql",

   storageBucket: "toutube-graphql.appspot.com",

   messagingSenderId: "160185343549",

   appId: "1:160185343549:web:32738e463b2b5adce11454",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
