import { Visibility } from "@material-ui/icons"
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
        const res = await axios.get(baseURL + '/users/find?new=true', {
          headers: {
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNjhkN2ZhNTZjMDk0MmRmZTliMWFhZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc4NTc3ODkwMSwiZXhwIjoxNzg2MjEwOTAxfQ.mgcda5O_duiZPF0Nl1xloRO8487xDjdftXQbpREpZ1M'
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
            <li className="widgetSmListItem">
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
