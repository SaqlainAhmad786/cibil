import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Overview from "./pages/Overview"
import AddDefaulter from "./components/AddDefaulter"
import Subscribe from "./components/Subscribe"
import PageNotFound from "./pages/PageNotFound"
import Profile from "./components/Profile"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/overview" element={<Overview />}>
            <Route path="addDefaulter" element={<AddDefaulter />} />
            <Route path="subscribe" element={<Subscribe />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
