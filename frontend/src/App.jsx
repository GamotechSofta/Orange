import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import ApiServices from "./pages/ApiServices.jsx";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19]">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/apis" element={<ApiServices />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
