import React, { Component } from "react";
import WallpaperDataService from "../services/wallpaper.service";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

export default class WallpapersList extends Component {
  constructor(props) {
    super(props);
    this.retrieveWallpapers = this.retrieveWallpapers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveWallpaper = this.setActiveWallpaper.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this)

    this.state = {
      wallpapers: [],
      currentWallpaper: null,
      currentIndex: -1,

      page: 1,
      count: 0,
      pageSize: 5,
    };

    this.pageSizes = [5, 10, 15, 20];
  }

  componentDidMount() {
    this.retrieveWallpapers();
  }

  getRequestParams(page, pageSize) {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrieveWallpapers() {
    const { page, pageSize } = this.state;
    const params = this.getRequestParams(page, pageSize);

    WallpaperDataService.getAll(params)
      .then((response) => {
        const { wallpapers, totalPages } = response.data;

        this.setState({
            wallpapers: wallpapers,
            count: totalPages,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveWallpapers();
    this.setState({
      currentWallpaper: null,
      currentIndex: -1
    });
  }

  setActiveWallpaper(wallpaper, index) {
    this.setState({
      currentWallpaper: wallpaper,
      currentIndex: index
    });
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrieveWallpapers();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.retrieveWallpapers();
      }
    );
  }

  render() {
    const { wallpapers, currentWallpaper, currentIndex, page, count, pageSize, } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Wallpapers List</h4>

          <div className="mt-3">
            {"Wallpapers per Page: "}
            <select onChange={this.handlePageSizeChange} value={pageSize}>
              {this.pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={this.handlePageChange}
            />
          </div>

          <ul className="list-group">
            {wallpapers &&
              wallpapers.map((wallpaper, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveWallpaper(wallpaper, index)}
                  key={index}
                >
                  {wallpaper.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentWallpaper ? (
            <div>
              <h4>Wallpaper Details</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentWallpaper.name}
              </div>
              <div>
                <label>
                  <strong>Resolution:</strong>
                </label>{" "}
                {currentWallpaper.resolution}
              </div>
              <div>
                <label>
                  <strong>Item Type:</strong>
                </label>{" "}
                {currentWallpaper.itemtype}
              </div>

              <Link
                to={"/wallpapers/" + currentWallpaper.id}
                className="btn btn-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Click on a wallpaper for extra details</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}