import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.album);
        console.log(data);
      } else {
        toast.error(response.data.success);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [data]);
  return (
    <div>
      <p>All Album List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100 ">
          <b>Image</b>
          <b>Name</b>
          <b>Discription</b>
          <b>BgColor</b>
          <b>Action</b>
        </div>
        {data?.map((item, index) => (
          <div
            key={index}
            className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100 "
          >
            <img src={item.image} alt="image of audio" className="w-12 " />
            <p>{item.name}</p>
            <p>{item.desc}</p>
            <input type="color" value={item.bgColor} readOnly />
            <p
              onClick={() => removeSong(item._id)}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              Remove
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
