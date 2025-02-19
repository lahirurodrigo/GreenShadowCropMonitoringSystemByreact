import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/authSlice";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
            </form>
        </div>
    );
};

export default Login;
