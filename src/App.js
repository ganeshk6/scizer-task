import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const dataUrl = "https://swapi.dev/api/people/";
  useEffect(() => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData.results);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }, []);
  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await axios.get("https://picsum.photos/200/300/");
        setImageUrl(response.request.responseURL);
      } catch (error) {
        console.error("Error fetching random image:", error);
      }
    };

    fetchRandomImage();
  }, []);
  return (
    <div className="container">
      {data.map((item) => (
        <div className="card">
          {imageUrl && (
            <img src={imageUrl} className="card-img-top" alt="Random" />
          )}
          <div className="card-body">
            <h5 className="card-title titleBold">{item.name}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="titleBold">Hair Colour:</span>{" "}
                {item.hair_color}
              </li>
              <li className="list-group-item">
                <span className="titleBold">Skin Colour:</span>{" "}
                {item.skin_color}
              </li>
              <li className="list-group-item">
                <span className="titleBold">Gender:</span> {item.gender}
              </li>
              <li className="list-group-item">
                <span className="titleBold">Vehicles:</span>{" "}
                {item.vehicles.length}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
