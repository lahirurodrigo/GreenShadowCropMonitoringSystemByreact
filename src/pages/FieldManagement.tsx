import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch} from "../store";
import { addField, deleteField, updateField, Field } from "../reducers/fieldSlice";
import {fetchCrops} from "../reducers/cropSlice.ts";

export default function FieldManagement() {
    const dispatch = useAppDispatch();
    const fields = useSelector((state: RootState) => state.fields.list);
    const crops = useSelector((state: RootState) => state.fields.crops);

    const [formData, setFormData] = useState<Field>({
        fieldCode: "",
        fieldName: "",
        fieldLocation: "",
        fieldSize: 0,
        cropCode: "",
        images: []
    });

    const [imagePreviews, setImagePreviews] = useState<string[]>([
        "https://via.placeholder.com/200x200?text=Click+to+upload+Image+1",
        "https://via.placeholder.com/200x200?text=Click+to+upload+Image+2"
    ]);

    useEffect(() => {
        dispatch(fetchCrops());
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const newPreviews = [...imagePreviews];
            newPreviews[index] = URL.createObjectURL(file);

            setImagePreviews(newPreviews);
            const newImages = [...formData.images];
            newImages[index] = file;
            setFormData({ ...formData, images: newImages });
        }
    };

    const handleSave = () => {
        dispatch(addField(formData));
        resetForm();
    };

    const handleDelete = () => {
        dispatch(deleteField(formData.fieldCode));
        resetForm();
    };

    const handleUpdate = () => {
        dispatch(updateField(formData));
        resetForm();
    };

    const resetForm = () => {
        setFormData({ fieldCode: "", fieldName: "", fieldLocation: "", fieldSize: 0, cropCode: "", images: [] });
        setImagePreviews([
            "https://via.placeholder.com/200x200?text=Click+to+upload+Image+1",
            "https://via.placeholder.com/200x200?text=Click+to+upload+Image+2"
        ]);
    };

    return (
        <div id="fieldPage">
            <div className="container containerPage">
                <h2>Field Management</h2>
                <form id="fieldForm" className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="form-label">Field Code</label>
                            <input type="text" className="form-control" name="fieldCode" value={formData.fieldCode} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="form-label">Field Name</label>
                            <input type="text" className="form-control" name="fieldName" value={formData.fieldName} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="form-label">Field Location</label>
                            <input type="text" className="form-control" name="fieldLocation" value={formData.fieldLocation} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="form-label">Field Size (Acres)</label>
                            <input type="number" className="form-control" name="fieldSize" value={formData.fieldSize} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="form-label">Crop ID</label>
                            <select className="form-control" name="cropCode" value={formData.cropCode} onChange={handleChange} required>
                                <option value="">Select a Crop</option>
                                {crops.map((crop) => (
                                    <option key={crop.id} value={crop.id}>
                                        {crop.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                        {[0, 1].map((index) => (
                            <div key={index} className="text-center">
                                <label className="form-label">Field Image {index + 1}</label>
                                <div className="image-upload-wrapper">
                                    <img className="image-preview" src={imagePreviews[index]} alt={`Preview ${index + 1}`} />
                                    <input type="file" className="form-control d-none" accept="image/*" onChange={(e) => handleImageUpload(index, e)} />
                                </div>
                            </div>
                        ))}
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
                            <th>Field Code</th>
                            <th>Field Name</th>
                            <th>Location</th>
                            <th>Size (Acres)</th>
                            <th>Crop Code</th>
                        </tr>
                        </thead>
                        <tbody>
                        {fields.map((field) => (
                            <tr key={field.fieldCode}>
                                <td>{field.fieldCode}</td>
                                <td>{field.fieldName}</td>
                                <td>{field.fieldLocation}</td>
                                <td>{field.fieldSize}</td>
                                <td>{field.cropCode}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
