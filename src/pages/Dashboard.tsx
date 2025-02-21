import { useDispatch } from "react-redux";
import { logout } from "../reducers/authSlice.ts";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import CardComponent from "../components/CardComponent.tsx";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="flex flex-wrap justify-evenly items-center">
            {/*className="flex justify-center items-center h-screen bg-gray-100"*/}

            <CardComponent>
                <h2 className="text-xl font-bold">Dashboard</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, nam praesentium. Blanditiis corporis doloribus eaque nam ullam. Ad alias modi nihil nulla, placeat recusandae repellendus temporibus ullam, unde veritatis voluptate.</p>
                <button onClick={handleLogout} className="bg-red-500 text-white p-2 mt-2 rounded">
                    Logout
                </button>
            </CardComponent>

            <CardComponent>
                <h2 className="text-xl font-bold">Dashboard</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, nam praesentium. Blanditiis corporis doloribus eaque nam ullam. Ad alias modi nihil nulla, placeat recusandae repellendus temporibus ullam, unde veritatis voluptate.</p>
                <button onClick={handleLogout} className="bg-red-500 text-white p-2 mt-2 rounded">
                    Logout
                </button>
            </CardComponent>

        </div>
    );
};

export default Dashboard;
