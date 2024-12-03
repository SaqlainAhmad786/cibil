import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Overview from "./pages/Overview"
import AddDefaulter from "./components/AddDefaulter"
import Subscribe from "./components/Subscribe"
import PageNotFound from "./pages/PageNotFound"
import Profile from "./components/Profile"
import Home from "./components/Home"
import EditProfile from "./components/EditProfile"
import MoneyBlockerFinder from "./components/MoneyBlockerFinder"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Overview />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="overview" element={<Overview />}>
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="addDefaulter" element={<AddDefaulter />} />
            <Route path="subscribe" element={<Subscribe />} />
            <Route path="profile" element={<Profile />} />
            <Route path="editProfile" element={<EditProfile />} />
            <Route path="searchDefaulter" element={<MoneyBlockerFinder />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
