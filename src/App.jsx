import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./contexts/authContext"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Overview from "./pages/Overview"
import AddDefaulter from "./components/AddDefaulter"
import Subscribe from "./components/Subscribe"
import PageNotFound from "./pages/PageNotFound"
import Profile from "./components/Profile/Profile"
import Home from "./components/Home"
import EditProfile from "./components/EditProfile"
import MoneyBlockerFinder from "./components/MoneyBlockerFinder"
import LoggedIn from "./components/LoggedIn/LoggedIn"
import NotLoggedIn from "./components/NotLoggedIn/NotLoggedIn"
import ForgetPassword from "./pages/ForgetPassword"
import Defaulter from "./components/Defaulter/Defaulter"
import DefaultersList from "./components/DefaultersList/DefaultersList"

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate to="overview" />} />
            <Route path="login" element={<LoggedIn Component={Login} />} />
            <Route path="signup" element={<LoggedIn Component={Signup} />} />
            <Route path="forgetPassword" element={<LoggedIn Component={ForgetPassword} />} />
            <Route path="overview" element={<NotLoggedIn Component={Overview} />}>
              <Route index element={<Navigate to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="addDefaulter" element={<AddDefaulter />} />
              <Route path="defaulter/:id" element={<Defaulter />} />
              <Route path="defaultersList" element={<DefaultersList />} />
              <Route path="subscribe" element={<Subscribe />} />
              <Route path="profile" element={<Profile />} />
              <Route path="editProfile" element={<EditProfile />} />
              <Route path="searchDefaulter" element={<MoneyBlockerFinder />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
