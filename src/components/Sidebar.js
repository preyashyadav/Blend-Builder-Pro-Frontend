import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";

const Nav = styled.div`
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  // border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.18);
  height: 80px;
  display: none;

  @media (max-width: 950px) {
    /* Show in mobile view */
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;

const SidebarNav = styled.nav`
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.24);
  font: 1.5rem;
  font-weight: bold;
  width: 200px;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 30vh;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  @media (max-width: 800px) {
    top: 0;
    height: 100vh;
    z-index: 999;
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(window.innerWidth >= 950); // Set initial state based on screen width
  const showSidebar = () => setSidebar(!sidebar);

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          window.innerWidth < 950
        ) {
          setSidebar(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    const handleResize = () => {
      setSidebar(window.innerWidth >= 950);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="width-20" ref={wrapperRef}>
      <IconContext.Provider value={{ color: "#4b7d83" }}>
        <Nav>
          {window.innerWidth < 950 && (
            <NavIcon to="#">
              <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>
          )}
        </Nav>

        <Outlet />
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            {window.innerWidth < 950 && (
              <NavIcon to="#">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </NavIcon>
            )}
            {SidebarData.map((item, index) => (
              <SubMenu item={item} key={index} />
            ))}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </div>
  );
};

export default Sidebar;
