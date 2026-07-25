import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.scss"
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;