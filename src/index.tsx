import { ReactDOM } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultPage from "./pages/DefaultPage";
import NotFound from "./pages/404NotFound"
import Home from "./pages/Home";
import ModelLoaderPage from "./pages/ModelLoader";

import './index.css';
import {NavBar} from "./components/navBar";

const App = () => {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
          <Route index element={<Home />} />
          <Route path="landing" element={<DefaultPage />} />
          <Route path="model" element={<ModelLoaderPage />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;