import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import AddSong from "./pages/AddSong";
import AddAlbum from "./pages/AddAlbum";
import ListSong from "./pages/ListSong";
import ListAlbum from "./pages/ListAlbum";
import Sidebar from "../src/components/Sidebar";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";

export const url = "https://spotify-backend-1d3u.vercel.app/";
function App() {
  return (
    <div className="flex items-start min-h-screen">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path="/" element={<AddSong />} />
            <Route path="/add-song" element={<AddSong />} />
            <Route path="/add-album" element={<AddAlbum />} />
            <Route path="/list-song" element={<ListSong />} />
            <Route path="/list-album" element={<ListAlbum />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
