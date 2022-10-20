import axios from "axios";
export const VerifyAuth = (currentUser) => {
   axios.create({
      baseURL: "http://localhost:5000/api",
      headers: {
         Authorization: `Bearer ${currentUser ? currentUser.token : null}`,
      },
   });
};
