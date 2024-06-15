import { BrowserRouter,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Header from "./compoents/Header"
import PrivateRoutes from "./compoents/PrivateRoutes"

export default function App() {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/About" element={<About/>}/>
            <Route path="/SignIn" element={<SignIn/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route element={<PrivateRoutes/>} >
            <Route path="/Profile" element={<Profile/>}/>
            </Route>
           
        </Routes>
    </BrowserRouter>
      
  )
}
