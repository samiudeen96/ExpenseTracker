import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Auth
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

// Pages
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />

          {/* Auth */}
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />

          {/* Pages */}
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

const Root = () => {
  // Check if the token is exists or not
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirected to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to={"/dashboard"} />
  ) : (
    <Navigate to={"/login"} />
  );
};
