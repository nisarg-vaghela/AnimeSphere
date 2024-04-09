import React, { useState } from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import ProfileIcon from "./profileIcon";
import SearchBar from "./SearchBar";
import logo from "../icons/logo.png";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
  Button,
} from "reactstrap";

const AppNavbar = (props) => {
  const { user } = props;

  const [isNavDropdownOpen, setNavDropdown] = useState(false);
  const toggleNavbarDropdown = () => setNavDropdown(!isNavDropdownOpen);

  return (
    <>
      <Navbar color="dark" dark expand="md" className="sticky-top mb-3">
        <Container>
          <Link className="navbar-brand " to="/">
            <img
              src={logo}
              width="150px"
              height="40px"
              alt="logo"
              loading="lazy"
            />
          </Link>

          <NavbarToggler onClick={toggleNavbarDropdown} />
          <Collapse isOpen={isNavDropdownOpen} navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <SearchBar placeholder="Search . . ." {...props} />
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/nisarg-vaghela">
                  <i className="fa fa-github" style={{ fontSize: "2rem" }} />
                  {/* Github */}
                </NavLink>
              </NavItem>
              <NavItem>
                <Link to="/users" className="nav-link text-nowrap">
                  <i className="fa fa-users" style={{ fontSize: "1.4rem" }} />{" "}
                  All Users
                </Link>
              </NavItem>
              {!user && (
                <>
                  <NavItem>
                    <div className="d-flex flex-row">
                      <Link className="nav-link px-2" to="/register">
                        <Button color="success">Register</Button>
                      </Link>
                      <Link className="nav-link pe-2" to="/login">
                        <Button color="info" outline>
                          Login
                        </Button>
                      </Link>
                    </div>
                  </NavItem>
                </>
              )}
              {user && (
                <NavItem>
                  <ProfileIcon user={user} />
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
