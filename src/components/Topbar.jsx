export default function Topbar({ pageName }) {
  return (
    <div className="dash_top_header">
      <div className="dth_content">
        {pageName === "" ? "" : (<h4>{pageName || "Default Page"}</h4>)}
        <h2>Dashboard</h2>
      </div>
    </div>
  );
}