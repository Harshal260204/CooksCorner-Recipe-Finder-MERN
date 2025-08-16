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
import UserProfile from './Pages/User/UserProfile'
import VerifyEmail from './Components/User/VerifyEmail'
import ForgotPassword from './Components/User/ForgotPassword'
import ResetPassword from './Components/User/ResetPassword'

// Admin Components
import Admin from './Pages/Admin/AdminDashboard'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import CreateRecipeForm from './Components/Admin/CreateRecipeForm'
import AllUsers from './Components/Admin/AllUsers'
import Desert from './Pages/User/Desert'
import AllRecipes from './Components/Admin/AllRecipes'
import AdminLogin from './Components/Admin/AdminLogin'
import AdminProtectedRoutes from './ProtectedRoutes/AdminProtectedRoutes'
import UserProtectedRoutes from './ProtectedRoutes/UserProtectedRoutes'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
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
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* User Protected Routes */}
        <Route element={<UserProtectedRoutes />}>
          <Route path="/premium-cookbooks" element={<CookBooks />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<AdminProtectedRoutes />}>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="all-recipes" element={<AllRecipes />} />
            <Route path="create-recipe" element={<CreateRecipeForm />} />
            <Route path="all-users" element={<AllUsers />} />
          </Route>
        </Route>

        {/* Admin Login (Public) */}
        <Route path="/admin-login" element={<AdminLogin />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
