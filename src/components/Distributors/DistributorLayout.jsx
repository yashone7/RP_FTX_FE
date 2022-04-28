import React, { useState, useEffect, useRef } from "react";
import { useResizeDetector } from "react-resize-detector";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import DistributorNavbar from "../common/DistributorNavbar";
import SidebarDist from "./SidebarDist";

function DistributorLayout({ isAuthenticated, children, user }) {
  const [isSidebarActive, setIsActive] = useState(false);
  const [isMenuOpen, toggleMenu] = useState(false);
  const { width, ref } = useResizeDetector();

  const history = useHistory();

  // this ref is used to detect click events outside of menu-dropdown component
  // it is used for closing dropdown on away click. ref forwarding concept is used
  const myRef = useRef();
  const sidebarRef = useRef();

  let sidebar = "layout-sidebar";
  let mainbar = "layout-main";
  let hideSidebar = "";
  let showMainbar = "";
  let iconGroup = "icon-group";

  if (isMenuOpen) {
    iconGroup = "icon-group-mobile-toggle";
  } else iconGroup = "icon-group";

  if (isSidebarActive) {
    if (width < 1024) {
      sidebar = "layout-sidebar-open";
      hideSidebar = "sidebar-hide";
      showMainbar = "mainbar-show";
      mainbar = "layout-main-shrink";
    } else {
      sidebar = "sidebar-hide";
      mainbar = "mainbar-show";
    }
  } else {
    sidebar = "layout-sidebar";
    mainbar = "layout-main";
  }

  const handleSidebar = () => {
    setIsActive(!isSidebarActive);
  };

  const handleMenu = () => {
    toggleMenu(!isMenuOpen);
  };

  useEffect(() => {
    const onOutsideClick = (e) => {
      if (myRef.current && !myRef.current.contains(e.target)) {
        toggleMenu(false);
      }
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, [myRef]);

  useEffect(() => {
    const onOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        if (width < 1024) {
          setIsActive(false);
        }
      }
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, [sidebarRef, width]);

  const handleProfile = () => {
    history.push("/profile");
  };

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (isAuthenticated) {
    if (user) {
      if (user.role !== "distributor") {
        return <Redirect to="/login" />;
      }
    }
  }

  return (
    <div className="layout" ref={ref}>
      <div className={`${sidebar} ${hideSidebar}`} ref={sidebarRef}>
        <SidebarDist />
      </div>
      <div className={`${mainbar} ${showMainbar}`}>
        <DistributorNavbar
          handleSidebar={handleSidebar}
          handleMenu={handleMenu}
          ref={myRef}
          goToProfile={handleProfile}
          isSidebarActive={isSidebarActive}
          iconGroup={iconGroup}
        />
        <div className="my-container">{children}</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer.user,
});

export default connect(mapStateToProps)(DistributorLayout);
