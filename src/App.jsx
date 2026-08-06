import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.scss"
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { AuthContext } from './context/authContext/AuthContext';
import { useContext } from "react";
import MovieList from "./pages/movieList/MovieList";
import MovieListEdit from "./pages/movieListEdit/MovieListEdit";
import NewMovieList from "./pages/newMovieList/NewMovieList";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={ user ? <Navigate replace to={'/'} /> : <Login/> }
        />
      </Routes>
    { user ? (
      <>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/users" Component={UserList} />
            <Route path="/user/:userId" Component={User} />
            <Route path="/newUser" Component={NewUser} />
            <Route path="/movies" Component={ProductList} />
            <Route path="/products/:productId" Component={Product} />
            <Route path="/newProduct" Component={NewProduct} />
            <Route path="/lists" Component={MovieList} />
            <Route path="/lists/:movieListId" Component={MovieListEdit} />
            <Route path="/newList" Component={NewMovieList} />
          </Routes>
        </div>
      </>
    ) : (
      <Login/>
    )}
    </Router>
  );
};

export default App;