import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch} from "../store";
import { addCrop, deleteCrop, updateCrop, fetchCrops, Crop } from "../reducers/cropSlice";

export default function CropManagement() {
    const dispatch = useAppDispatch();
    const crops = useSelector((state: RootState) => state.crops.list);

    const [formData, setFormData] = useState<Crop>({
        cropCode: "",
        cropCommonName: "",
        cropScientificName: "",
        cropCategory: "",
        cropSeason: "",
        images: []
    });

    const [imagePreviews, setImagePreviews] = useState<string[]>(["https://via.placeholder.com/200x200?text=Click+to+upload+Image"]);

    useEffect(() => {
        dispatch(fetchCrops());
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setImagePreviews([URL.createObjectURL(file)]);
            setFormData({ ...formData, images: [file] });
        }
    };

    const handleSave = () => {
        dispatch(addCrop(formData));
        resetForm();
    };

    const handleDelete = () => {
        dispatch(deleteCrop(formData.cropCode));
        resetForm();
    };

    const handleUpdate = () => {
        dispatch(updateCrop(formData));
        resetForm();
    };

    const resetForm = () => {
        setFormData({ cropCode: "", cropCommonName: "", cropScientificName: "", cropCategory: "", cropSeason: "", images: [] });
        setImagePreviews(["https://via.placeholder.com/200x200?text=Click+to+upload+Image"]);
    };

    return (
        <div id="cropPage">
            <div className="container containerPage">
                <h2>Crop Management</h2>
                <form className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="form-label">Crop Code</label>
                            <input type="text" className="form-control" name="cropCode" value={formData.cropCode} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="form-label">Common Name</label>
                            <input type="text" className="form-control" name="commonName" value={formData.cropCommonName} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="form-label">Scientific Name</label>
                            <input type="text" className="form-control" name="scientificName" value={formData.cropScientificName} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="form-label">Category</label>
                            <input type="text" className="form-control" name="category" value={formData.cropCategory} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="form-label">Season</label>
                            <input type="text" className="form-control" name="season" value={formData.cropSeason} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <div className="text-center">
                            <label className="form-label">Crop Image</label>
                            <div className="image-upload-wrapper">
                                <img className="image-preview" src={imagePreviews[0]} alt="Crop Image" />
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
                            <th>Crop Code</th>
                            <th>Common Name</th>
                            <th>Scientific Name</th>
                            <th>Category</th>
                            <th>Season</th>
                        </tr>
                        </thead>
                        <tbody>
                        {crops.map((crop) => (
                            <tr key={crop.cropCode}>
                                <td>{crop.cropCode}</td>
                                <td>{crop.cropCommonName}</td>
                                <td>{crop.cropScientificName}</td>
                                <td>{crop.cropCategory}</td>
                                <td>{crop.cropSeason}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
