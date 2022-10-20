import React, { useEffect, useState } from "react";
import "./SigninModal.css";
import User from "@iconscout/react-unicons/icons/uil-user";
import Email from "@iconscout/react-unicons/icons/uil-pen";
import Password from "@iconscout/react-unicons/icons/uil-key-skeleton";
import Google from "../../img/1534129544.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import {
   REGISTER_USER,
   LOGIN_USER,
   GOOGLE_LOGIN_USER,
} from "../../graphql/Mutations/clientMutation";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const SigninModal = () => {
   const [newUser, setNewUser] = useState(true);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPass, setConfirmPass] = useState("");
   const [samePass, setSamePass] = useState("");

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { currentUser } = useSelector((state) => state.user);

   console.log(currentUser);

   const [register, { error: regError, loading: regLoading, data: regData }] =
      useMutation(REGISTER_USER);
   const [login, { error: logError, loading: logLoading, data: logData }] =
      useMutation(LOGIN_USER);
   const [googleLogin, { error: gError, loading: gLoading, data: gData }] =
      useMutation(GOOGLE_LOGIN_USER);

   useEffect(() => {
      if (logLoading === false && logData) {
         dispatch(loginSuccess(logData?.login));
         navigate("/");
      }
   }, [logLoading, logData]);
   useEffect(() => {
      if (regLoading === false && regData) {
         dispatch(loginSuccess(regData?.register));
         navigate("/");
      }
   }, [regLoading, regData]);
   useEffect(() => {
      if (gLoading === false && gData) {
         dispatch(loginSuccess(gData?.googleSignin));
         navigate("/");
      }
   }, [gLoading, gData]);

   const handleLogin = async (e) => {
      e.preventDefault();
      if (!newUser) {
         await login({
            variables: {
               email: email,
               password: password,
            },
         });
      }
      if (newUser) {
         await register({
            variables: {
               name: name,
               email: email,
               password: password,
            },
         });
      }
   };
   const handleGoogleLogin = async () => {
      dispatch(loginStart());
      signInWithPopup(auth, provider).then((result) => {
         const user = result.user;
         googleLogin({
            variables: {
               email: user.email,
               name: user.displayName,
               img: user.photoURL,
            },
         });
      });
   };

   return (
      <div className="signin col-md mt-5">
         <form action="">
            {regError && <p>{regError.message}</p>}
            {logError && <p>{logError.message}</p>}
            <h3 className="text-center">{newUser ? "Sign Up" : "Login"}</h3>
            <div className="main-input">
               {newUser && (
                  <div className="input">
                     <Email color="" size={"1.5rem"} />
                     <input
                        type="text"
                        placeholder="channel name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                     />
                  </div>
               )}
               <div className="input">
                  <User color="" size={"1.5rem"} />
                  <input
                     type="email"
                     placeholder="username or email"
                     name="email"
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div className="input">
                  <Password color="" size={"1.5rem"} />
                  <input
                     type="password"
                     placeholder="password"
                     name="password"
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               {newUser && (
                  <div className="input">
                     <Password color="" size={"1.5rem"} />
                     <input
                        type="password"
                        placeholder="confirm password"
                        name="confirmPass"
                        onChange={(e) => setConfirmPass(e.target.value)}
                     />
                  </div>
               )}
            </div>
            <p>{samePass}</p>
            <button onClick={handleLogin} className="signinBtn">
               {newUser ? "SignUp" : "signIn"}
            </button>
            <p onClick={() => setNewUser(!newUser)}>Already have an acount</p>
         </form>
         <h6 className="text-center">
            <b>OR</b>
         </h6>
         <hr />
         <div className="google" onClick={handleGoogleLogin}>
            <img src={Google} alt="" />
            <span>Continue with Google</span>
         </div>
      </div>
   );
};

export default SigninModal;
