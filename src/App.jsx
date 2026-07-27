import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.scss"
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";

const App = () => {
  return(
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        {/* <Home /> */}
        <Routes>
          <Route path="/" Component={ Home }/>
          <Route path="/users" Component={ UserList }/>
          <Route path="/user/:userId" Component={ User }/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;