"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from 'next/image';
import axios from "axios";
const AddService = () => {

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
                        <button className="btn theme-btn2">Continue</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddService