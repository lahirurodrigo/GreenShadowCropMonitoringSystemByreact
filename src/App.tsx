import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Login from "./pages/LoginPage.tsx";
import ProtectedRoute from "./components/ProtectedRoutes.tsx"; // Fixed import
import RootLayout from "./components/RootLayout.tsx"; // Fixed import
import Dashboard from "./pages/Dashboard.tsx";
import UserPage from "./pages/UserPage.tsx";
import FieldManagement from "./pages/FieldManagement.tsx";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    {/* Public Route */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<RootLayout />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/users" element={<UserPage />} />
                            <Route path="/fields" element={<FieldManagement />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
