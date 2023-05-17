import { CNavItem,CSidebar,CSidebarNav,CSidebarToggler } from "@coreui/react";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <CSidebar unfoldable className="vh-100 bg-black">
      <CSidebarNav>
        <CNavItem href="#" className="bg-dark">
          <i class="bi bi-bar-chart-fill text-white m-2"></i>
          <div className="text-decoration-none text-white mx-3">
              Dashboard
            </div>
        </CNavItem>

        <CNavItem href="#">
          <i class="bi bi-house text-white m-2"></i>

          <Link to="/admin" className="text-decoration-none text-white mx-3"> Home</Link>
          

        </CNavItem>

        <div onClick={Logout}>
          <CNavItem href="#">
            <i class="bi bi-box-arrow-left text-white m-2"></i>
            <div className="text-decoration-none text-white mx-3">
              Logout
            </div>
          </CNavItem>
        </div>
      </CSidebarNav>
      <CSidebarToggler />
    </CSidebar>
  );
};

export default Sidebar;
