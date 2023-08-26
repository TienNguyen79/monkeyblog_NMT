import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export default function useFireBaseImage(setValue, getValues, cb) {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const storage = getStorage();

  if (!setValue || !getValues) return;
  //xử lí upload lên cloud storge
  const handleUploadImage = (file) => {
    const timestamp = new Date().getTime();
    const storageRef = ref(storage, "images/" + (file.name + "_" + timestamp));
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done"); //cái này chỉ là tính phần trăm tốc độ tải ảnh lên
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at All");
        }
      },
      (error) => {
        console.log("Error");
      },
      () => {
        //lấy được đường dẫn hình ảnh
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };
  // xử lí chọn file
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // setValue("image_name", file.name); //setvalue của react hookform
    const timestamp = new Date().getTime();
    setImageName(file.name + "_" + timestamp);
    // console.log("file.name: " + file.name);
    handleUploadImage(file);
  };

  //xóa ảnh trong cloud storage
  const handleDeleteImage = () => {
    // Create a reference to the file to delete
    // const desertRef = ref(storage, "images/" + getValues("imageName"));
    const desertRef = ref(
      storage,
      "images/" + (imageName || getValues("imageName"))
    );

    deleteObject(desertRef)
      .then(() => {
        console.log("Remove Image Successfully");
        setImage("");
        setProgress(0);
        cb && cb();
      })
      .catch((error) => {
        console.log("Cannot Image ");
      });
  };

  return {
    handleSelectImage,
    setImage,
    setProgress,
    handleDeleteImage,
    progress,
    image,
    imageName,
  };
}
