import { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "../scss/main.scss";
import About from "./About";
import Home from "./Home";
import Recommend from "./Recommend";
import Footer from "./ui/Footer";
import Header from "./ui/Header";

function App() {
  console.log("PUBLIC_URL", process.env.PUBLIC_URL);
  const [videos, setVideos] = useState([]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header videos={videos} setVideos={setVideos} />
      <Switch>
        <Route exact path="/" render={() => <Home videos={videos} />} />
        <Route exact path="/about" component={About} />
        <Route
          exact
          path="/recommend"
          render={() => <Recommend videos={videos} />}
        />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
