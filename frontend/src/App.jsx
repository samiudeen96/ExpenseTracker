import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Auth from "./pages/Auth/Auth";

import { Toaster } from 'react-hot-toast';
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
        <Routes>
          <Route path="/" element={<Root />} />

          {/* Auth */}
          <Route path="/auth" element={<Auth />} />

          {/* Pages */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard/*" element={<Dashboard />} />

        </Routes>
    </>
  );
}
export default App;

const Root = () => {
  // Check if the token is exists or not
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirected to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to={"/dashboard/home"} />
  ) : (
    <Navigate to={"/auth"} />
  );
};
