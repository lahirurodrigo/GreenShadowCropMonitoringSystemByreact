import { useDispatch } from "react-redux";
import { logout } from "../reducers/authSlice.ts";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <button onClick={handleLogout} className="bg-red-500 text-white p-2 mt-2 rounded">
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
