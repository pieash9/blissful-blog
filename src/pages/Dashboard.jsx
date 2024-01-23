import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/Dashboard/DashSidebar";
import DashProfile from "../components/Dashboard/DashProfile";
import DashPosts from "../components/Dashboard/DashPosts";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/* <div className="w-full"> */}
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPosts />}
      {/* </div> */}
    </div>
  );
};

export default Dashboard;
