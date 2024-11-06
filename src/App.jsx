import { useEffect, useState } from "react";
import Main from "./components/main";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

function App() {
  const [data, showData] = useState(null);
  const [loading, setloading] = useState(false);
  const [showModal, setShowModel] = useState(false);
  useEffect(() => {
    async function fetchAPIDATA() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url =
        "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_KEY}`;

      const today = new Date().toDateString();
      const localkey = `NASA-${today}`;
      console.log(localkey);

      if (localStorage.getItem(localkey)) {
        const apiData = JSON.parse(localStorage.getItem(localkey));
        showData(apiData);
        console.log("Fetched from cache today");

        return;
      }
      localStorage.clear();

      try {
        const res = await fetch(url);
        const apiData = await res.json();
        localStorage.setItem(localkey, JSON.stringify(apiData));
        showData(apiData);
        console.log("Fetched from API today");
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchAPIDATA();
  }, []);
  const toogle = () => {
    return setShowModel(!showModal);
  };
  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && <Sidebar data={data} toogle={toogle} />}
      {data && <Footer data={data} toogle={toogle} />}
    </>
  );
}

export default App;
