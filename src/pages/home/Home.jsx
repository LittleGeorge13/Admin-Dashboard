import Chart from "../../components/chart/Chart"
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo"
import { userData } from "../../dummyData";

import "./home.scss"

const Home = () => {
    return (
        <div className="home">
            <FeaturedInfo />
            <Chart
              data={ userData }
              title="User Analytics"
              grid
              dataKey={"Active User"}
            />
        </div>
    )
}

export default Home
