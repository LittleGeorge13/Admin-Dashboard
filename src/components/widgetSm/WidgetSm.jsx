import { Visibility } from "@mui/icons-material"
import { useEffect, useState } from "react";
import axios from "axios";
import { getBaseUrl } from "../../../api-config";
const baseURL = getBaseUrl();

import "./widgetSm.scss"

const WidgetSm = () => {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get(baseURL + '/users/find?new=true', {
          headers: {
            token: 'Bearer ' + user.accessToken
          }
        });
        setNewUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getNewUsers();
  }, []);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        { newUsers.map(user => {
          return (
            <li key={user.username} className="widgetSmListItem">
              <img
                src={ user.profilePic || 'https://i.pinimg.com/564x/1b/a2/e6/1ba2e6d1d4874546c70c91f1024e17fb.jpg' }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{ user.username }</span>
                <span className="widgetSmUserTitle">Software Engineer</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          );
        }) }
      </ul>
    </div>
  )
}

export default WidgetSm
