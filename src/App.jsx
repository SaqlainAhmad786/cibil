import React from "react"
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
import PrintDetails from "./pages/PrintDetails"
import EditDefaulter from "./components/EditDefaulter/EditDefaulter"
import Dashboard from "./admin/Dashboard"
import VerifyPayment from "./pages/VerifyPayment"
import Subscribers from "./admin/Subscribers"
import Plans from "./admin/Plans"
import Users from "./admin/Users"
import User from "./admin/User"
import NotAdmin from "./components/NotAdmin/NotAdmin"
import AdminPanel from "./pages/AdminPanel"

function App() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/subscribe" element={<Subscribe />} />
                        <Route path="/verify-payment/:transactionId" element={<VerifyPayment />} />
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="login" element={<LoggedIn Component={Login} />} />
                        <Route path="signup" element={<LoggedIn Component={Signup} />} />
                        <Route path="forgetPassword" element={<LoggedIn Component={ForgetPassword} />} />
                        <Route path="overview" element={<NotLoggedIn Component={Overview} />}>
                            <Route index element={<Navigate to="home" />} />
                            <Route path="home" element={<Home />} />
                            <Route path="addDefaulter" element={<AddDefaulter />} />
                            <Route path="editDefaulter/:id" element={<EditDefaulter />} />
                            <Route path="defaulter/:id" element={<Defaulter />} />
                            <Route path="defaultersList" element={<DefaultersList />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="editProfile" element={<EditProfile />} />
                            <Route path="searchDefaulter" element={<MoneyBlockerFinder />} />
                        </Route>
                        <Route path="print" element={<PrintDetails />} />
                        <Route path="admin" element={<NotAdmin Component={AdminPanel} />}>
                            <Route index element={<Navigate to="users" />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="subscribers" element={<Subscribers />} />
                            <Route path="users" element={<Users />} />
                            <Route path="user/:id" element={<User />} />
                            <Route path="plans" element={<Plans />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}

export default App
