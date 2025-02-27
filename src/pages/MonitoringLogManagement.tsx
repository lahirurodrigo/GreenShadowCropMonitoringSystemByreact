import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { addLog, deleteLog, updateLog, Log } from "../reducers/monitoringLogSlice.ts";
import { fetchFields } from "../reducers/fieldSlice";
import { fetchCrops } from "../reducers/cropSlice";
import { fetchStaff } from "../reducers/staffSlice";

export default function MonitoringLogManagement() {
    const dispatch = useAppDispatch();
    const logs = useSelector((state: RootState) => state.logs.list);
    const fields = useSelector((state: RootState) => state.fields.list);
    const crops = useSelector((state: RootState) => state.crops.list);
    const staff = useSelector((state: RootState) => state.staff.list);

    const [formData, setFormData] = useState<Log>({
        logCode: "",
        logDate: "",
        logDetails: "",
        staffId: "",
        fieldCode: "",
        cropCode: "",
        observedImage: null,
    });

    const [imagePreview, setImagePreview] = useState<string>("https://via.placeholder.com/200x200?text=Click+to+upload");

    useEffect(() => {
        dispatch(fetchFields());
        dispatch(fetchCrops());
        dispatch(fetchStaff());
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setImagePreview(URL.createObjectURL(file));
            setFormData({ ...formData, observedImage: file });
        }
    };

    const handleSave = () => {
        dispatch(addLog(formData));
        resetForm();
    };

    const handleDelete = () => {
        dispatch(deleteLog(formData.logCode));
        resetForm();
    };

    const handleUpdate = () => {
        dispatch(updateLog(formData));
        resetForm();
    };

    const resetForm = () => {
        setFormData({ logCode: "", logDate: "", logDetails: "", staffId: "", fieldCode: "", cropCode: "", observedImage: null });
        setImagePreview("https://via.placeholder.com/200x200?text=Click+to+upload");
    };

    return (
        <div id="monitoringLogPage">
            <div className="container containerPage">
                <h2>Monitoring Log Management</h2>
                <form id="logForm" className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="form-label">Log Code</label>
                            <input type="text" className="form-control" name="logCode" value={formData.logCode} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="form-label">Log Date</label>
                            <input type="date" className="form-control" name="logDate" value={formData.logDate} onChange={handleChange} required />
                        </div>
                        <div className="col-span-2">
                            <label className="form-label">Log Details</label>
                            <textarea className="form-control" name="logDetails" value={formData.logDetails} onChange={handleChange} rows={3} required />
                        </div>
                        <div>
                            <label className="form-label">Staff ID</label>
                            <select className="form-control" name="staffId" value={formData.staffId} onChange={handleChange} required>
                                <option value="">Select Staff</option>
                                {staff.map((s) => (
                                    <option key={s.staffId} value={s.staffId}>{s.firstName}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Field Code</label>
                            <select className="form-control" name="fieldCode" value={formData.fieldCode} onChange={handleChange} required>
                                <option value="">Select a Field</option>
                                {fields.map((field) => (
                                    <option key={field.fieldCode} value={field.fieldCode}>{field.fieldName}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Crop Code</label>
                            <select className="form-control" name="cropCode" value={formData.cropCode} onChange={handleChange} required>
                                <option value="">Select a Crop</option>
                                {crops.map((crop) => (
                                    <option key={crop.cropCode} value={crop.cropCode}>{crop.cropCommonName}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4 justify-center">
                        <div className="text-center">
                            <label className="form-label">Observed Image</label>
                            <div className="image-upload-wrapper">
                                <img className="image-preview" src={imagePreview} alt="Observed Preview" />
                                <input type="file" className="form-control d-none" accept="image/*" onChange={handleImageUpload} />
                            </div>
                        </div>
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
                            <th>Log Code</th>
                            <th>Log Date</th>
                            <th>Field Code</th>
                            <th>Crop Code</th>
                            <th>Staff ID</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logs.map((log) => (
                            <tr key={log.logCode}>
                                <td>{log.logCode}</td>
                                <td>{log.logDate}</td>
                                <td>{log.fieldCode}</td>
                                <td>{log.cropCode}</td>
                                <td>{log.staffId}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm" onClick={() => setFormData(log)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
