import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import BasketPage from "./pages/BasketPage";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* User Pages */}
        <Route path="/" element={<MainPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  )
}

export default App