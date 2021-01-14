import { useState } from "react";
import "../scss/main.scss";
import Home from "./Home";
import Footer from "./ui/Footer";
import Header from "./ui/Header";

function App() {
  const [videos, setVideos] = useState([]);

  return (
    <div className="App">
      <Header videos={videos} setVideos={setVideos} />

      <Home videos={videos} />

      <Footer />
    </div>
  );
}

export default App;
