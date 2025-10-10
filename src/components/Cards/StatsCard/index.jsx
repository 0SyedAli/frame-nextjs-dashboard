"use client";

const StatsCard = ({
  icon,
  statsMainHeading,
  footerLeftSideHeading,
  footerLeftSideCount,
  footerRightSideHeading,
  footerRightSideCount,
}) => {
  return (
    <div className="col-md-4 col-sm-6">
      <div
        className="card border-0 shadow-sm h-100 position-relative overflow-hidden"
        style={{ borderRadius: "16px" }}
      >
        <div className="card-body p-3">
          <div className="d-flex align-items-center gap-2">
            <div
              className="card_profile rounded-4 d-flex align-items-center justify-content-center"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#A83F98",
              }}
            >
              {icon}
            </div>
            <h6
              className="card-title text-muted mb-0"
              style={{ fontSize: "16px", fontWeight: "500" }}
            >
              {statsMainHeading}
            </h6>
          </div>
        </div>
        <div className="card-footer p-3 pb-0  border-0 bg-transparent d-flex flex-row align-items-center justify-content-between gap-2">
          <div className="d-flex flex-column align-items-start">
            <span className="text-muted" style={{fontSize:'13px'}}>{footerLeftSideHeading}</span>
            <p>{footerLeftSideCount}</p>
          </div>
          <div className="d-flex flex-column align-items-start">
            <span className="text-muted" style={{fontSize:'13px'}}>{footerRightSideHeading}</span>
            <p>{footerRightSideCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
