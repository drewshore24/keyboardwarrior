import { useState } from "react";
import { imageDB } from "../../firebase/fire";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { notify } from "../../utils/otherUtils";

const ImageUpload = ({ user, setImgUrl }) => {
  const [img, setImg] = useState("");

  const handleClick = () => {
    const imgRef = ref(imageDB, `profile_pictures/${user.uid}`);
    uploadBytes(imgRef, img).then((val) => {
      notify("image uploaded successfully!", {
        type: "success",
      });
      getDownloadURL(val.ref).then((url) => {
        setImgUrl(url);
      });
    });
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => setImg(e.target.files[0])}
        className="w-3/4 text-sm"
      />
      <button
        className="w-1/4 py-1 px-2 text-sm tracking-wider font-semibold block rounded-sm mt-2 text-white bg-[#C96868] hover:bg-[#D2E0FB] focus:outline-[#C96868]"
        onClick={handleClick}
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUpload;
