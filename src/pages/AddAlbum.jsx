import { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../App";

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("bgColor", bgColor);
      const response = await axios.post(`${url}/api/album/add`, formData);
      if (response.data.success) {
        toast.success("Album added!");
        setName("");
        setDesc("");
        setBgColor("#ffffff");
        setImage(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-dashed rounded-full border-t-green-800 animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-6  text-gray-600"
    >
      <div className="flex flex-col gap-4 ">
        <p>Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          accept="image/*"
          name="image"
          id="image"
          hidden
        />
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt="upload area"
            className="w-24 cursor-pointer"
          />
        </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type here.........."
          required
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album Discription</p>
        <input
          type="text"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type Discription.........."
          required
        />
      </div>

      <div className="flex flex-col gap-3">
        <p>Background Color</p>
        <input
          type="color"
          onChange={(e) => setBgColor(e.target.value)}
          value={bgColor}
          required
        />
      </div>

      <button
        type="submit"
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;
