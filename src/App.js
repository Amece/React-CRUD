import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddWallpaper from "./components/add-wallpaper.component";
import Wallpaper from "./components/wallpaper.component";
import WallpapersList from "./components/wallpapers-list.component";



class App extends Component {
  render() {
    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/wallpapers" className="navbar-brand">
              PROG 6 - Fullstack - 1019785
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/wallpapers"} className="nav-link">
                  Wallpaper List
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Routes>
              <Route path="/wallpapers" element={<WallpapersList />} />
              <Route path="/add" element={<AddWallpaper />} />
              <Route path="/wallpapers/:id" element={<Wallpaper />} />
            </Routes>
          </div>
        </div>  
         
    );
  }
}

export default App;