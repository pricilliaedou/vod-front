import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import Videos from "./pages/Videos";
import Contact from "./pages/Contact";
import Succes from "./pages/Succes";
import Temoignages from "./pages/Temoignages";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profil from "./pages/Profil";
import Error404 from "./pages/Error404";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/succes" element={<Succes />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/videos"
            element={
              <ProtectedRoute>
                <Videos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/temoignages"
            element={
              <ProtectedRoute>
                <Temoignages />
              </ProtectedRoute>
            }
          />

          <Route path="/profil" element={<Profil />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
