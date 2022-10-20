import React, { useEffect, useState } from "react";
import "./Upload.css";
import {
   getStorage,
   ref,
   uploadBytesResumable,
   getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_VIDEO } from "../../graphql/Mutations/clientMutation";

const Upload = ({ setOpen }) => {
   const [img, setImg] = useState(undefined);
   const [imgPerc, setImgPerc] = useState(0);
   const [video, setVideo] = useState(undefined);
   const [videoPerc, setVideoPerc] = useState(0);
   const [inputs, setInputs] = useState({});
   const [tags, setTags] = useState([]);

   const { currentUser } = useSelector((state) => state.user);
   const navigate = useNavigate();

   const handleChange = (e) => {
      setInputs((prev) => {
         return { ...prev, [e.target.name]: e.target.value };
      });
   };

   const handleTags = (e) => {
      setTags(e.target.value.split(","));
   };

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
            urlType === "imgUrl"
               ? setImgPerc(Math.round(progress))
               : setVideoPerc(Math.round(progress));
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
               // console.log("File available at", downloadURL);
               setInputs((prev) => {
                  return { ...prev, [urlType]: downloadURL };
               });
            });
         }
      );
   };

   useEffect(() => {
      video && uploadFile(video, "videoUrl");
   }, [video]);
   useEffect(() => {
      img && uploadFile(img, "imgUrl");
   }, [img]);

   const [uploadDoc, { error, loading, data }] = useMutation(ADD_VIDEO);

   if (error) {
      console.log(error);
   }
   if (data) {
      console.log(data);
   }

   const handleUpload = async (e) => {
      e.preventDefault();
      await uploadDoc({
         variables: {
            ...inputs,
            tags,
         },
      });
      setOpen(false);
      navigate(`/profile/${currentUser._id}`);
   };

   return (
      <div className="uploadModal">
         <div className="wrapper">
            <span className="cros" onClick={() => setOpen(false)}>
               X
            </span>
            <h3 className="text-center mt-4">Upload a new Video</h3>
            <div className="inputField">
               <label htmlFor="">Video:</label>
               <br />
               {videoPerc > 0 ? (
                  <div className="process">{"Uploading: " + videoPerc}</div>
               ) : (
                  <input
                     type="file"
                     accept="video/*"
                     onChange={(e) => setVideo(e.target.files[0])}
                  />
               )}
               <input
                  type="text"
                  placeholder="Tittle"
                  name="tittle"
                  onChange={handleChange}
               />
               <textarea
                  rows="4"
                  placeholder="Description"
                  name="desc"
                  onChange={handleChange}
               ></textarea>
               <input
                  type="text"
                  placeholder="Relative Tags (spares the tags with ,comas)"
                  onChange={handleTags}
               />
               <label htmlFor="">Thumble:</label>
               <br />
               {imgPerc > 0 ? (
                  <div className="process">{"Uploading: " + imgPerc}</div>
               ) : (
                  <input
                     type="file"
                     accept="image/*"
                     onChange={(e) => setImg(e.target.files[0])}
                  />
               )}
               <button onClick={handleUpload}>Upload</button>
            </div>
         </div>
      </div>
   );
};

export default Upload;
