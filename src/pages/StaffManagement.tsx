import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { addStaff, deleteStaff, updateStaff, Staff } from "../reducers/staffSlice";

export default function StaffManagement() {
    const dispatch = useAppDispatch();
    const staffList = useSelector((state: RootState) => state.staff.list);

    const [formData, setFormData] = useState<Staff>({
        staffId: "",
        firstName: "",
        lastName: "",
        designation: "",
        gender: "MALE",
        role: "EMPLOYEE",
        joinDate: "",
        dateOfBirth: "",
        contactNo: "",
        email: "",
        address: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        dispatch(addStaff(formData));
        resetForm();
    };

    const handleDelete = () => {
        dispatch(deleteStaff(formData.staffId));
        resetForm();
    };

    const handleUpdate = () => {
        dispatch(updateStaff(formData));
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            staffId: "",
            firstName: "",
            lastName: "",
            designation: "",
            gender: "MALE",
            role: "EMPLOYEE",
            joinDate: "",
            dateOfBirth: "",
            contactNo: "",
            email: "",
            address: ""
        });
    };

    return (
        <div id="staffPage">
            <div className="container containerPage">
                <h2>Staff Management</h2>
                <form id="staffForm" className="mt-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="form-label">Staff ID</label>
                            <input type="text" className="form-control" name="staffId" value={formData.staffId} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                            <label className="form-label">Designation</label>
                            <input type="text" className="form-control" name="designation" value={formData.designation} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="form-label">Gender</label>
                            <select className="form-control" name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Role</label>
                            <select className="form-control" name="role" value={formData.role} onChange={handleChange} required>
                                <option value="MANAGER">Manager</option>
                                <option value="EMPLOYEE">Employee</option>
                                <option value="ADMINISTRATIVE">Administrative</option>
                                <option value="SCIENTIST">Scientist</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="form-label">Join Date</label>
                            <input type="date" className="form-control" name="joinDate" value={formData.joinDate} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="form-label">Date of Birth</label>
                            <input type="date" className="form-control" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="form-label">Contact Number</label>
                            <input type="text" className="form-control" name="contactNo" value={formData.contactNo} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        <button type="button" className="btn btn-secondary" onClick={handleUpdate}>Update</button>
                    </div>
                </form>
                <div className="table-container mt-5">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Designation</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {staffList.map((staff) => (
                            <tr key={staff.staffId}>
                                <td>{staff.staffId}</td>
                                <td>{staff.firstName}</td>
                                <td>{staff.lastName}</td>
                                <td>{staff.designation}</td>
                                <td>{staff.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
