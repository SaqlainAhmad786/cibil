import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext'
import NotAdmin from './components/ProtectedRoutes/NotAdmin'
import LoggedIn from './components/ProtectedRoutes/LoggedIn'
import NotLoggedIn from './components/ProtectedRoutes/NotLoggedIn'

import Login from './pages/Login'
import Signup from './pages/Signup'
import ProfileStatus from './pages/ProfileStatus'
import Overview from './pages/Overview'
import AddDefaulter from './components/AddDefaulter'
import Subscribe from './components/Subscribe'
import Profile from './components/Profile/Profile'
import Home from './components/Home'
import EditProfile from './components/EditProfile'
import MoneyBlockerFinder from './components/MoneyBlockerFinder'
import ForgetPassword from './pages/ForgetPassword'
import Defaulter from './components/Defaulter/Defaulter'
import DefaultersList from './components/DefaultersList/DefaultersList'
import PrintDetails from './pages/PrintDetails'
import EditDefaulter from './components/EditDefaulter/EditDefaulter'
import ViewResume from './components/ViewResume'
import Help from './pages/Help'
import VerifyPayment from './pages/VerifyPayment'

import AdminPanel from './pages/AdminPanel'
import Dashboard from './admin/Dashboard'
import Subscribers from './admin/Subscribers'
import Plans from './admin/Plans'
import Users from './admin/Users'
import PendingUsers from './admin/PendingUsers'

import PageNotFound from './pages/PageNotFound'
import NotApproved from './components/ProtectedRoutes/NotApproved'

function App() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="/subscribe" element={<Subscribe />} />
                        <Route path="/verify-payment/:transactionId" element={<VerifyPayment />} />
                        <Route path="login" element={<LoggedIn Component={Login} />} />
                        <Route path="signup" element={<LoggedIn Component={Signup} />} />
                        <Route path="forgetPassword" element={<LoggedIn Component={ForgetPassword} />} />
                        <Route path="profile-status" element={<NotApproved Component={ProfileStatus} />} />
                        <Route path="/view-resume" element={<NotLoggedIn Component={ViewResume} />} />
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
                            <Route path="help" element={<Help />} />
                        </Route>
                        <Route path="print" element={<NotLoggedIn Component={PrintDetails} />} />
                        <Route path="admin" element={<NotAdmin Component={AdminPanel} />}>
                            <Route index element={<Navigate to="dashboard" />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="subscribers" element={<Subscribers />} />
                            <Route path="users" element={<Users />} />
                            <Route path="plans" element={<Plans />} />
                            <Route path="pending-users" element={<PendingUsers />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}

export default App