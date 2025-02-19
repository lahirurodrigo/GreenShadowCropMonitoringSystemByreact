import { useDispatch } from "react-redux";
import { logout } from "../reducers/authSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login"); // Redirect to login page
    };

    return (
        <nav className="p-4 bg-gray-800 text-white flex justify-between">
            <h1>My App</h1>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Logout
            </button>
        </nav>
    );
};

export default NavBar;
