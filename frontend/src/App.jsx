import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Auth from "./pages/Auth/Auth";

import { Toaster } from 'react-hot-toast';
import Dashboard from "./pages/Dashboard/Dashboard";
import GlobalLoading from "./components/GlobalLoading";
import { useContext } from "react";
import { ExpContext } from "./context/ExpContext";
// import LoadingWindow from "./components/LoadingWindow";

function App() {

  return (
    <>
      <GlobalLoading /> {/* 🔄 Spinner shown during query fetching */}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path="/" element={<Root />} />

        {/* Auth */}
        <Route path="/auth" element={<Auth />} />

        {/* Pages */}
        <Route path="/dashboard/*" element={<Dashboard />} />

        {/* <Route path="loading" element={<LoadingWindow />} /> */}

      </Routes>
    </>
  );
}
export default App;

const Root = () => {
  // Check if the token is exists or not
  const { token } = useContext(ExpContext);
  const isAuthenticated = !!token

  // Redirected to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to={"/dashboard/home"} />
  ) : (
    <Navigate to={"/auth"} />
  );
};
