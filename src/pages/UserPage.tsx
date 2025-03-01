import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";  // Import AppDispatch here
import { addUser, deleteUser, User } from "../reducers/userSlice";

export default function UserManagement() {
    const dispatch = useDispatch<AppDispatch>();  // Type the dispatch function
    const users = useSelector((state: RootState) => state.users);

    // State for form input
    const [formData, setFormData] = useState<User>({
        username: "",
        password: "",
        role: "ADMIN",
    });

    // Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Save User (Dispatch addUser)
    const handleSave = () => {
        if (!formData.username || !formData.password) return;
        dispatch(addUser(formData));  // Dispatch the addUser action with the form data
        setFormData({ username: "", password: "", role: "STAFF" });  // Reset form
    };

    // Handle Search
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const query = (e.target as HTMLInputElement).value.toLowerCase();
        console.log("Search query:", query);
    };

    return (
        <>
            <div id="userPage">
                <div className="container containerPage">
                    <h2>User Management</h2>

                    {/* Search User */}
                    <div className="search-container">
                        <input
                            type="text"
                            id="searchUser"
                            className="search-bar"
                            placeholder="Search User..."
                            onKeyUp={handleSearch}
                        />
                    </div>

                    {/* User Form */}
                    <form id="UserForm">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label htmlFor="userEmail" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control form-control-sm"
                                    id="userEmail"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="userPassword" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-sm"
                                    id="userPassword"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="userRole" className="form-label">Role</label>
                                <select
                                    id="userRole"
                                    className="form-select form-select-sm"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="STAFF">Manager</option>
                                    <option value="ADMIN">Administrative</option>
                                    <option value="USER">Scientist</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-4 d-flex justify-content-end gap-2">
                            <button type="button" className="btn btn-primary btn-sm" onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </form>

                    {/* Table to display User details */}
                    <div className="table-container mt-4">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => dispatch(deleteUser(user.username))}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
