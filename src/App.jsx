import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Videos from "./pages/Videos";
import Contact from "./pages/Contact";
import Temoignages from "./pages/Temoignages";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/temoignages" element={<Temoignages />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
