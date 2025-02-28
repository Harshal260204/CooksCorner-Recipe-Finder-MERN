import './App.css'
import Homepage from './Pages/User/Homepage'
import Navbar from './Components/User/Navbar'
import LoginPage from './Components/User/LoginPage'
import RegisterPage from './Components/User/RegisterPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './Components/User/Footer'
import CookBooks from './Pages/User/CookBooks'
import Recipes from './Pages/User/Recipes'
import SavedRecipes from './Pages/User/SavedRecipes'
import Admin from './Pages/Admin/Admin'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import CreateRecipe from './Pages/Admin/CreateRecipe'
import CartPage from './Pages/User/CartPage'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login-page' element={<LoginPage />} />
        <Route path='/register-page' element={<RegisterPage />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/premium-cookbooks' element={<CookBooks />} />
        <Route path='/saved-recipes' element={<SavedRecipes />} />
        <Route path='/cart' element={<CartPage />} />

        {/* Nested Routes For Admin */}
        <Route path='/admin' element={<Admin />}>
          <Route path='admin-dashboard' element={<AdminDashboard />} />
          <Route path='create-recipe' element={<CreateRecipe />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
