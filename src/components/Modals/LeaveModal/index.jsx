import { FormInput } from "@/components/Forms/FormInput";
import { FormTextarea } from "@/components/Forms/FormTextarea";
import { useState, useEffect } from "react";

const leaveTypes = [
  { value: "", label: "Select leave type" },
  { value: "sick", label: "Sick Leave" },
  { value: "vacation", label: "Vacation Leave" },
  { value: "personal", label: "Personal Leave" },
  { value: "emergency", label: "Emergency Leave" },
];

const LeaveRequestModal = ({
  show,
  onHide,
  title = "Leave Request",
  buttonText = "Submit",
  buttonVariant = "btn-primary",
  showFooter = true,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      // Trigger animation after mount
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setFormData({
      type: "",
      startDate: "",
      endDate: "",
      reason: "",
    });
    onHide();
  };

  if (!show && !isVisible) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className={`modal-backdrop fade ${isVisible ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`modal fade ${isVisible ? "show" : ""}`}
        style={{
          display: show ? "block" : "none",
        }}
        onClick={handleClose}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="modal-content rounded-4 border-0"
            style={{ boxShadow: "0 0.5rem 1rem rgba(168, 63, 152, 0.3)" }}
          >
            <div className="modal-header d-flex justify-content-between align-items-center border-0">
              <h5 className="modal-title mb-0 h4 ">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body pt-0">
              <div className="card border-0">
                <div className="card-body py-4 px-1 pt-0">
                  <form onSubmit={handleSubmit}>
                    <div className="row align-items-center mb-3">
                      <div className="col-md-4">
                        <label
                          className="form-label"
                          style={{ fontSize: "22px", color: "#727272" }}
                        >
                          Type
                        </label>
                      </div>
                      <div className="col-md-8">
                        <FormInput
                          type="select"
                          name="type"
                          options={leaveTypes}
                          value={formData.type}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row align-items-center mb-3">
                      <div className="col-md-4">
                        <label
                          className="form-label"
                          style={{ fontSize: "22px", color: "#727272" }}
                        >
                          Start Date
                        </label>
                      </div>
                      <div className="col-md-8">
                        <FormInput
                          type="date"
                          name="startDate"
                          placeholder="Select leave type"
                          value={formData.startDate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row align-items-center mb-3">
                      <div className="col-md-4">
                        <label
                          className="form-label"
                          style={{ fontSize: "22px", color: "#727272" }}
                        >
                          End date
                        </label>
                      </div>
                      <div className="col-md-8">
                        <FormInput
                          type="date"
                          name="endDate"
                          placeholder="Select leave type"
                          value={formData.endDate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row align-items-center mb-3">
                      <div className="col-md-4">
                        <label
                          className="form-label"
                          style={{ fontSize: "22px", color: "#727272" }}
                        >
                          Reason
                        </label>
                      </div>
                      <div className="col-md-8">
                        <FormTextarea
                          name="reason"
                          placeholder="Enter your reason"
                          value={formData.reason}
                          onChange={handleChange}
                          className="rounded-3"
                        />
                      </div>
                    </div>

                    <div className="row justify-content-end">
                      <div className="col-md-6 offset-md-4">
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn text-white rounded-3 py-2"
                            style={{ backgroundColor: "#A83F98" }}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveRequestModal;
