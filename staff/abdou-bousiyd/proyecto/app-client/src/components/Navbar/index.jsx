import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toggleLikeProject from '../../logic/toggleLikeProject'
import Login from "../Login";
// import "./index.sass";

import "./index.css";

const Sidebar = ({ toggleSkypack, download, toggle, toggleTitle, name, projectId, onLikeClicked, project }) => {

  const navigate = useNavigate();

  const location = useLocation().pathname;

  const handleLogoutClick = () => {
    delete sessionStorage.token;
    window.location.reload();
  };

  const handleToRegister = () => {
    navigate("/register");
  };

  const handleToLogin = () => {
    navigate("/login");
  };
  const handleToProject = () => {
    navigate("/");
  };
  const handleToDashboard = () => {
    navigate("/dashboards");
  };  
  const handleToPens = () => {
    navigate("/pens");
  };
  const handleLikeClick = async() => {
    try {
        await toggleLikeProject(sessionStorage.token, projectId)
        onLikeClicked()
    } catch(error) {
        console.log('error like')
    }
  }
  const { likes = [] } = project || {}

  return (
    <>
      <header className="header">

        {/* <a className="header__Logo" htmlFor="" onClick={handleToPens}>CP</a> */}
        <img className="svg" src="https://www.svgrepo.com/show/327338/logo-apple-ar.svg" alt="codepen" onClick={handleToPens} /> 

        <nav className="header__content">
                
            <ul className="header__content__links">

                <li className={`header__content__links__item ${(location === "/dashboards" || location === "/pens") && "header__content__links__item__heartNone"}`}
                  onClick={handleLikeClick}
                >
                  <div className="header__content__links__item__likes">
                    { likes && likes.length> 0 && <h2 >{likes.length}</h2> }
                    {
                      name && <span className="material-icons">favorite_border</span> 
                    }
                  </div>
                </li>

                <li className={`header__content__links__item ${(location === "/dashboards" || location === "/pens") && "header__content__links__item__downloadNone"}`}
                    onClick={download}
                >
                    <span className="material-icons">get_app</span>
                </li>
                
                <li className={`header__content__links__item ${(location === "/dashboards" || location === "/pens") && "header__content__links__item__skypackNone"}` }
                    onClick={toggleSkypack}
                >
                    <span className="material-icons">rocket_launch</span>
                </li>

                <li className={`header__content__links__item ${( location === "/dashboards" || location === "/pens" )&& "header__content__links__item__codeNone"}`}
                    onClick={toggle}
                >
                    <span className="material-icons">data_object</span>
                </li>

                <li className={`header__content__links__item ${(location === "/dashboards" || location === "/pens") && "header__content__links__item__addNone"}`}
                    onClick={toggleTitle}
                >
                    <span className="material-icons">add</span>
                </li>
                <li className={`header__content__links__item ${(location === "/" || location === "/project" || location === `/previewProject/${projectId}`) && "header__content__links__item__addNone"}`}
                    onClick={handleToProject}
                >
                    <span className="material-icons">arrow_back</span>
                </li>
                <li className={`header__content__links__item ${location === "/dashboards" && "header__content__links__item__tikcodeNone"}`}
                    onClick={handleToDashboard}
                >
                    <span className="material-icons">visibility</span>
                </li>
            </ul>
            {!name && (
            <div className="header__content__btns">
                <button className="header__content__btns__btn"  onClick={handleToRegister}> Sign Up </button>
                <button className="header__content__btns__btn" onClick={handleToLogin} >Log In </button>
            </div>
            )}

            {name && (
            <div className="header__content__btns">
              <button className="header__content__btns__btn" onClick={handleLogoutClick}> log out </button>
              <button className="header__content__btns__btn">{name}</button>
            </div>
            )}

            {/* <div class="header__content__select">
                <select>
                    <option value="Brooklyn">Brooklyn</option>
                    <option value="Manhattan">Manhattan</option>
                    <option value="Queens">Queens</option>
                </select>
            </div> */}
        </nav>
      </header>
    </>
  );
};
export default Sidebar;
