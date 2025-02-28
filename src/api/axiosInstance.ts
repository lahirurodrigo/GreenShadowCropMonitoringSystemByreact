import axios from "axios";

// Crete an Axios Instance
const api = axios.create({
    baseURL: "http://localhost:5000/api",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
api.interceptors.response.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // If the error is 401 (Unauthorized) and the token has expired
        if (error.response.status === 401 && !originalRequest.isRetry) {
            originalRequest.isRetry = true

            // Try to refresh the token
            const refreshToken = localStorage.getItem("refresh_token")

            if (refreshToken) {
                try {
                    // Make the request to refresh the token
                    const response = await api.post(
                        "/auth/refresh-token",
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${refreshToken}` // Include the refresh token in the Authorization header
                            }
                        }
                    )
                    const newAccessToken = response.data.accessToken
                    //   const newRefreshToken = response.data.refreshToken

                    // Update localStorage with new tokens
                    localStorage.setItem("jwt_token", newAccessToken)
                    //   localStorage.setItem("refresh_token", newRefreshToken)

                    // Update the original request with the new access token
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`

                    // Retry the original request with the new token
                    return api(originalRequest)
                } catch (err) {
                    // If refreshing the token fails, redirect to login or show an error
                    console.error("Token refresh failed:", err)
                    // Example: redirect to login page
                    window.location.href = "/login"
                }
            } else {
                // If no refresh token is available, redirect to login
                window.location.href = "/login"
            }
        }
        return Promise.reject(error);
    }
);

