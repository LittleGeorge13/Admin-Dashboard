import Chart from "../../components/chart/Chart"
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo"
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import { userData } from "../../dummyData";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { getBaseUrl } from "../../../api-config";

const baseURL = getBaseUrl();

import "./home.scss"

const Home = () => {
  const MONTHS = useMemo(() => [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ], []);

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get(baseURL + `/users/stats`, {
          headers: {
            token: 'Bearer ' + user.accessToken
          }
        });
        const statsList = res.data.sort((a, b) => a._id - b._id);
        const statsListFormatted = statsList.map(item => ( { name: MONTHS[item._id - 1], "New User": item.total } ));
        setUserStats(statsListFormatted);
      } catch (error) {
        console.log(error)
      }
    }
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey={"New User"}
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}

export default Home
