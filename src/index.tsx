import { ReactDOM } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultPage from "./pages/DefaultPage";
import Layout from "./pages/Layout";
import NotFound from "./pages/404NotFound"
import Home from "./pages/Home";

import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="landing" element={<DefaultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;