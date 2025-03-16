import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/User/Navbar'
import Footer from './Components/User/Footer'
import Homepage from './Pages/User/Homepage'
import LoginPage from './Components/User/LoginPage'
import RegisterPage from './Components/User/RegisterPage'
import CookBooks from './Pages/User/CookBooks'
import Recipes from './Pages/User/Recipes'
import CartPage from './Pages/User/CartPage'
import ContactUs from './Pages/User/ContactUs'
import Breakfast from './Pages/User/Breakfast'
import MainCourse from './Pages/User/MainCourse'
import Snacks from './Pages/User/Snacks'
import Drinks from './Pages/User/Drinks'

// Admin Components
import Admin from './Pages/Admin/AdminDashboard'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import CreateRecipeForm from './Components/Admin/CreateRecipeForm'
import AllUsers from './Components/Admin/AllUsers'
import Desert from './Pages/User/Desert'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/breakfast" element={<Breakfast />} />
        <Route path="/main-course" element={<MainCourse />} />
        <Route path="/desert" element={<Desert />} />
        <Route path="/snacks" element={<Snacks />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/soups-sandwiches" element={<Drinks />} />
        <Route path="/premium-cookbooks" element={<CookBooks />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact-us" element={<ContactUs />} />

        {/* 🛠 Nested Admin Routes */}
        <Route path="/admin" element={<Admin />}>
          <Route index element={<AdminDashboard />} /> {/* Default admin page */}
          <Route path="create-recipe" element={<CreateRecipeForm />} />
          <Route path="users" element={<AllUsers />} /> {/* ✅ Fix Path */}
        </Route>

      </Routes>
      <Footer /> 
    </BrowserRouter>
  )
}

export default App
