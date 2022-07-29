import React from "react";
import SearchContact from "./contact/SearchContact";
import {useLocation} from "react-router-dom"
import { Purple, Background } from "../helpers/colors";
function Navbar() {
  const location = useLocation()
  
  return (
    <nav
      className="navbar navbar-dark navbar-expand-lg shadow-lg"
      style={{ backgroundColor: Background }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
              <i className="fas fa-id-badge" style={{ color: Purple }}></i> وب
              اپلیکیشن مدیریت <span style={{ color: Purple }}>مخاطبین</span>
            </div>
          </div>
          {location.pathname === "/contacts" ? (
            <div className="col">
              <SearchContact/>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
