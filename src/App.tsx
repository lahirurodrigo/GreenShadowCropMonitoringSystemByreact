import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Login from "./pages/LoginPage.tsx";
import ProtectedRoute from "./components/ProtectedRoutes"; // Import ProtectedRoute
import RootLayout from "./components/RootLayout"; // Layout
import Dashboard from "./pages/Dashboard"; // Example protected page

const App = () => {
  return (
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Protected Routes Wrapper */}
            <Route element={<ProtectedRoute />}>
              <Route element={<RootLayout />}>
                <Route path="/" element={<Dashboard />} />
                {/* Add other protected routes here */}
              </Route>
            </Route>
          </Routes>
        </Router>
      </Provider>
  );
};

export default App;



