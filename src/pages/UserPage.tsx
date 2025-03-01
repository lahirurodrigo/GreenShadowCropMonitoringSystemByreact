
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addUser, deleteUser, User } from "../reducers/userSlice";

export default function UserManagement() {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users);

    // State for form input
    const [formData, setFormData] = useState<User>({
        email: "",
        password: "",
        role: "MANAGER",
    });

    // Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Save User
    const handleSave = () => {
        if (!formData.email || !formData.password) return;
        dispatch(addUser(formData));
        setFormData({ email: "", password: "", role: "MANAGER" });
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
                                    name="email"
                                    value={formData.email}
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
                                    <option value="MANAGER">Manager</option>
                                    <option value="ADMIN">Administrative</option>
                                    <option value="SCIENTIST">Scientist</option>
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
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => dispatch(deleteUser(user.email))}
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
