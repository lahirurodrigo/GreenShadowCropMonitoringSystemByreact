import { useDispatch } from "react-redux";
import { logout } from "../reducers/authSlice.ts";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import CardComponent from "../components/CardComponent.tsx";
import loginBg from "../assets/login-background.jpg";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="flex flex-wrap justify-evenly items-center">

            {/* Dashboard Card with App Info */}
            <CardComponent>
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                <div className="flex flex-col items-center">
                    {/* Image of the app */}
                    <img
                        src={loginBg}
                        alt="App Image"
                        className="mb-4 rounded shadow-lg max-w-md"
                    />
                    {/* App description */}
                    <p className="text-center text-gray-700 mb-4">
                        Welcome to our Crop Monitoring App!
                        <br/><br/>
                        Designed to help you manage your crops efficiently, our app provides real-time data on soil conditions, weather, and crop health. With detailed analytics, automated alerts, and seamless integration, it empowers you to make informed decisions, optimize yields, and reduce resource wastage, all while ensuring sustainable farming practices. Whether you're a small grower or managing large fields, this app makes crop management easier than ever
                    </p>
                    {/* Logout Button */}
                    <button onClick={handleLogout} className="bg-red-500 text-white p-2 mt-2 rounded">
                        Logout
                    </button>
                </div>
            </CardComponent>
        </div>
    );
};

export default Dashboard;

