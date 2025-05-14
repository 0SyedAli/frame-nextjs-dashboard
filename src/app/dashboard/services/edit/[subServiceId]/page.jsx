"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from 'next/image';
import axios from "axios";
import Spinner from "@/components/Spinner";
import AuthGuard from "@/components/AuthGuard";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
const EditServieDashboard = () => {

    const router = useRouter();
    const { subServiceId } = useParams();
    const [previewImages, setPreviewImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        // servicePoints: "",
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
                    // servicePoints: data.servicePoints || "",
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
            setLoading(true)
            const token = localStorage.getItem("token");
            const formDataToSend = new FormData();
            formDataToSend.append("subServiceId", subServiceId);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("text", formData.text);
            // formDataToSend.append("servicePoints", formData.servicePoints);
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
            showSuccessToast(response?.data?.msg); //

            setFormData({
                title: updated.title,
                text: updated.text,
                // servicePoints: updated.servicePoints,
                price: updated.price,
                subServiceImage: updated.subServiceImage || [],
            });
            setPreviewImages(
                (updated.subServiceImage || []).map(img =>
                    `${process.env.NEXT_PUBLIC_IMAGE_URL}/${img}`
                )
            );
            router.push("/dashboard/services");
        }
        catch (error) {
            console.error("Error updating service:", error);
            setLoading(false)
            showErrorToast(error.response?.data?.message || "Error adding Sub Service!");
        }
    };


    return (
        <div className='add_service2_dash'>
            <form onSubmit={handleSubmit}>
                {/* <h4>Service #1</h4> */}
                <div className="row align-items-end">
                    <div className="col-7">
                        <div className="row">
                            <div className="col-12">
                                <div className="auth_upload_bussiness_logo">
                                    <input
                                        accept="image/*"
                                        type="file"
                                        name="subServiceImage"
                                        multiple // ✅ Allow multiple selection
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="">
                                        <div className="aubl_img_container">
                                            <span className="aic_icon">
                                                <Image
                                                    src="/images/upload-icon.png"
                                                    width={16}
                                                    height={18}
                                                    className="pb-icon"
                                                    alt="Frame"
                                                />
                                            </span>
                                        </div>
                                        <h5>Update Subservices Pictures</h5>
                                    </label>
                                    <div className=" mt-4 d-flex align-items-center gap-2 flex-wrap">
                                        {previewImages.map((img, idx) => (
                                            <Image key={idx} src={img} className="preview-thumbnail" style={{ height: "100px", width: "100px", objectFit: "cover" }} alt={`Preview ${idx}`} height={70} width={70} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row as_form pt-5 gy-5">
                    <div className="col-12">
                        <label htmlFor="" className="pb-2" style={{ fontWeight: "bolder", fontSize: "20px", textTransform: "capitalize" }}>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Username" />
                    </div>
                    {/* <div className="col-12">
                        <select>
                            <option value="">Select City</option>
                            <option>abc</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <select>
                            <option value="">Select City</option>
                            <option>abc</option>
                        </select>
                    </div> */}
                    <div className="col-12">
                        <label htmlFor="" className="pb-2" style={{ fontWeight: "bolder", fontSize: "20px", textTransform: "capitalize" }}>Description</label>
                        <textarea
                            name="text"
                            value={formData.text}
                            onChange={handleChange}
                            rows="10">Description</textarea>
                    </div>
                    {/* <div className="col-12">
                        <label htmlFor="" className="pb-2" style={{ fontWeight: "bolder", fontSize: "20px", textTransform: "capitalize" }}>Service Point</label>
                        <input
                            type="number"
                            name="servicePoints"
                            value={formData.servicePoints}
                            onChange={handleChange}
                            placeholder="Add Points" />
                    </div> */}
                    <div className="col-12">
                        <label htmlFor="" className="pb-2" style={{ fontWeight: "bolder", fontSize: "20px", textTransform: "capitalize" }}>Price</label>
                        <div className="dollar_input ps-0">
                            <span>$</span>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="$" />
                        </div>
                    </div>
                    <div className='col-12 pt-4'>
                        <button disabled={loading} className="btn theme-btn2">
                            {loading ? <Spinner /> : "Continue"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}


const ProtectedEditServieDashboard = () => (
    <AuthGuard>
        <EditServieDashboard />
    </AuthGuard>
);

export default ProtectedEditServieDashboard;
