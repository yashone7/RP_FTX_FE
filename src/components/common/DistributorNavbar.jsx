import React, { forwardRef } from "react";
import {
  AiOutlineMenuFold as MenuClose,
  AiOutlineMenuUnfold as MenuOpen,
  AiOutlineMenu as Menu,
} from "react-icons/ai";
import { FaRegUserCircle as Profile } from "react-icons/fa";
import { FiLogOut as Logout } from "react-icons/fi";
import { logout } from "../../redux/actions/authAction";
import { connect } from "react-redux";

const NavbarRef = (
  {
    handleMenu,
    handleSidebar,
    iconGroup,
    isSidebarActive,
    logout,
    goToProfile,
  },
  ref
) => {
  return (
    <nav className="layout-navbar">
      <div className="nav-start nav-greeting">
        <div className="nav-icon">
          {isSidebarActive ? (
            <MenuOpen
              size={28}
              cursor="pointer"
              title="close menu"
              onClick={handleSidebar}
            />
          ) : (
            <MenuClose
              size={28}
              cursor="pointer"
              title="close menu"
              onClick={handleSidebar}
            />
          )}
        </div>
      </div>
      <div className="nav-end">
        <div className="menu-group-mobile" ref={ref}>
          <div className="menu-mobile">
            <Menu
              size={28}
              cursor="pointer"
              title="menu"
              onClick={handleMenu}
            />
          </div>
          <div className={iconGroup}>
            <ul className="menu-list">
              <li className="nav-items" onClick={goToProfile}>
                <div className="nav-icon">
                  <Profile size={28} cursor="pointer" title="my profile" />
                </div>
                <p className="hide-desktop">Profile</p>
              </li>
              <li className="nav-items" onClick={logout}>
                <div className="nav-icon">
                  <Logout size={28} cursor="pointer" title="logout" />
                </div>
                <p className="hide-desktop">Logout</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Navbar = forwardRef(NavbarRef);

const mapStateToProps = (state) => ({});

// mergeProps function receives three parameters namely ownProps, stateProps and dispatchProps
const mergeProps = (ownProps, stateProps, dispatchProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
});

export default connect(mapStateToProps, { logout }, mergeProps, {
  forwardRef: true,
})(Navbar);