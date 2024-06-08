import { BrowserRouter,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignOut from "./pages/SignOut"
import Profile from "./pages/Profile"

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/About" element={<About/>}/>
            <Route path="/SignIn" element={<SignIn/>}/>
            <Route path="/SignOut" element={<SignOut/>}/>
            <Route path="/Profile" element={<Profile/>}/>
        </Routes>
    </BrowserRouter>
      
  )
}
