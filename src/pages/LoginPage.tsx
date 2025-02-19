import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/authSlice";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/login-background.jpg"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Add useNavigate hook
    const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }) as any);
    };

    // Redirect when authenticated
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate("/"); // Redirect to dashboard
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-fill bg-center bg-no-repeat"
             style={{ backgroundImage: `url(${loginBg})` }}>
            <div className="w-[28rem] bg-gradient-to-r from-green-200 to-green-200 border-2 border-green-300 p-6 rounded-lg shadow-lg">
                <h1 className="text-center text-3xl font-bold text-white mb-2">Login Page</h1>
                <h5 className="text-center text-lg text-white mb-4">Green Shadow Agriculture</h5>
                <p className="text-center text-gray-200 mb-4">Sign in to access the Crop Monitoring System</p>

                {error && <p className="text-red-500 text-center mb-3">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="text-white block text-sm font-medium">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-white block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="remember" className="mr-2" />
                        <label htmlFor="remember" className="text-white text-sm">Remember Me</label>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-bold transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
