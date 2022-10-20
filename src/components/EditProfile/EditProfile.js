import React, { useEffect, useRef, useState } from "react";
import "./EditProfile.css";
import Camera from "@iconscout/react-unicons/icons/uil-camera";
import { useSelector } from "react-redux";
import defaultProfile from "../../img/images.png";
import defaultCover from "../../img/jn8jyih8obj71.webp";
import {
   getStorage,
   ref,
   uploadBytesResumable,
   getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import app from "../../firebase";

const EditProfile = ({ setOpen }) => {
   const { currentUser } = useSelector((state) => state.user);
   const [img, setImg] = useState(undefined);
   const [cover, setCover] = useState(undefined);

   const [coverPerc, setCoverPerc] = useState(0);
   const [imgPerc, setImgPerc] = useState(0);

   const [inputs, setInputs] = useState({});
   const [name, setName] = useState("");
   const imageRef = useRef(null);
   const coverRef = useRef(null);
   const navigate = useNavigate();

   const authAxios = axios.create({
      baseURL: "http://localhost:5000/api",
      headers: {
         Authorization: `Bearer ${currentUser ? currentUser.token : null}`,
      },
   });

   const uploadFile = (file, urlType) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
         "state_changed",
         (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("Upload is " + progress + "% done");
            urlType === "img"
               ? setImgPerc(Math.round(progress))
               : setCoverPerc(Math.round(progress));
            switch (snapshot.state) {
               case "paused":
                  console.log("Upload is paused");
                  break;
               case "running":
                  console.log("Upload is running");
                  break;
               default:
                  break;
            }
         },
         (error) => {
            console.log(error);
         },
         () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               setInputs((prev) => {
                  return { ...prev, [urlType]: downloadURL };
               });
            });
         }
      );
   };

   const handleUpload = async (e) => {
      e.preventDefault();
      const res = await authAxios.put(`/users/${currentUser._id}`, {
         ...inputs,
         name,
      });
      setOpen(false);
      res.status(200) && navigate(`/profile/${currentUser._id}`);
   };

   useEffect(() => {
      img && uploadFile(img, "img");
   }, [img]);
   useEffect(() => {
      cover && uploadFile(cover, "coverImg");
   }, [cover]);

   return (
      <div className="uploadModal">
         <div className="wrapper">
            <span className="cros" onClick={() => setOpen(false)}>
               X
            </span>
            <h3 className="text-center mt-4"> Update Your Info</h3>
            <div className="inputField">
               <div className="coverImg">
                  <img
                     src={
                        cover
                           ? URL.createObjectURL(cover)
                           : currentUser.coverImg
                     }
                     alt=""
                  />
                  <Camera
                     onClick={() => coverRef.current.click()}
                     color=""
                     size={"1.8rem"}
                  />
               </div>
               <div className="profileImg">
                  <img
                     src={img ? URL.createObjectURL(img) : currentUser.img}
                     alt=""
                  />
                  <Camera
                     onClick={() => imageRef.current.click()}
                     color=""
                     size={"1.8rem"}
                  />
               </div>
               {coverPerc > 0 ? (
                  <div>
                     Cover Done:{" "}
                     <span style={{ color: "green", fontWeight: "bold" }}>
                        {coverPerc}%
                     </span>
                  </div>
               ) : (
                  ""
               )}
               {imgPerc > 0 ? (
                  <div>
                     Profile Done:{" "}
                     <span style={{ color: "green", fontWeight: "bold" }}>
                        {imgPerc}%
                     </span>
                  </div>
               ) : (
                  ""
               )}
               <input
                  type="file"
                  accept="image/*"
                  ref={coverRef}
                  style={{ display: "none" }}
                  onChange={(e) => setCover(e.target.files[0])}
               />
               <input
                  type="file"
                  accept="image/*"
                  ref={imageRef}
                  style={{ display: "none" }}
                  onChange={(e) => setImg(e.target.files[0])}
               />
               <input
                  type="text"
                  placeholder="Change Channel Name"
                  onChange={(e) => setName(e.target.value)}
               />

               <button onClick={handleUpload}>Upload</button>
            </div>
         </div>
      </div>
   );
};

export default EditProfile;
