"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const EditService = () => {
    const router = useRouter();
    const { subServiceId } = useParams();
    const [previewImages, setPreviewImages] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        price: "",
        subServiceImage: [], // ✅ Make it an array
    });

    useEffect(() => {
        const fetchSubService = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/admin/getSubServiceById?subServiceId=${subServiceId}`
                );
                const data = response.data.data;

                setFormData({
                    title: data.title || "",
                    text: data.text || "",
                    price: data.price || "",
                    subServiceImage: data.subServiceImage || [], // ✅ Assuming array from API
                });

                // ✅ Show existing images as preview
                const previews = (data.subServiceImage || []).map(img =>
                    `${process.env.NEXT_PUBLIC_IMAGE_URL}/${img}`
                );
                setPreviewImages(previews);

            } catch (error) {
                console.error("Error fetching subservice:", error);
            }
        };

        if (subServiceId) fetchSubService();
    }, [subServiceId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(newPreviews); // ✅ Update preview images

        setFormData({ ...formData, subServiceImage: files }); // ✅ Store all selected files
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const formDataToSend = new FormData();
            formDataToSend.append("subServiceId", subServiceId);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("text", formData.text);
            formDataToSend.append("price", formData.price);
            // ✅ Append each image file
            formData.subServiceImage.forEach((image, index) => {
                if (image instanceof File) {
                    formDataToSend.append("subServiceImages", image);
                }
            });
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/EditSubService`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const updated = response.data.data;
            setFormData({
                title: updated.title,
                text: updated.text,
                price: updated.price,
                subServiceImage: updated.subServiceImage || [],
            });
            setPreviewImages(
                (updated.subServiceImage || []).map(img =>
                    `${process.env.NEXT_PUBLIC_IMAGE_URL}/${img}`
                )
            );
            alert("Service updated successfully!");
            router.push("/dashboard/services");
        }
        catch (error) {
            console.error("Error updating service:", error);
        }
    };

    return (
        <div className="edit-service">
            <h2>Edit Sub-Service</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label>Description</label>
                <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    required
                />

                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <label>Current Images</label>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {previewImages.map((img, idx) => (
                        <img key={idx} src={img} alt={`Preview ${idx}`} width={100} />
                    ))}
                </div>

                <label>Change Images</label>
                <input
                    type="file"
                    name="subServiceImage"
                    multiple // ✅ Allow multiple selection
                    onChange={handleFileChange}
                />

                <button type="submit">Update Service</button>
            </form>
        </div>
    );
};

export default EditService;
