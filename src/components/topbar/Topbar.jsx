import { ArrowDropDown, Language, NotificationsNone, Settings } from "@mui/icons-material"
import "./topbar.scss"
import { AuthContext } from "../../context/authContext/AuthContext";
import { logoutStart } from "../../context/authContext/AuthActions";
import { useContext } from "react";

const Topbar = () => {
 const { dispatch } = useContext(AuthContext);

  const handleLogOut = () => {
    dispatch(logoutStart());
  };

  return (
    <div className='topbar'>
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin dashboard</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://i.pinimg.com/564x/1b/a2/e6/1ba2e6d1d4874546c70c91f1024e17fb.jpg"
            alt="profile"
            className="topAvatar"
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={ () => handleLogOut() }>Log out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
