import React, { Component } from "react";
import WallpaperDataService from "../services/wallpaper.service";

export default class AddWallpaper extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeResolution = this.onChangeResolution.bind(this);
    this.onChangeItemType = this.onChangeItemType.bind(this);
    this.saveWallpaper = this.saveWallpaper.bind(this);
    this.newWallpaper = this.newWallpaper.bind(this);

    this.state = {
      id: null,
      name: "",
      resolution: "", 
      itemtype: "",

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeResolution(e) {
    this.setState({
      resolution: e.target.value
    });
  }

  onChangeItemType(e) {
    this.setState({
      itemtype: e.target.value
    });
  }

  saveWallpaper() {
    var data = {
      name: this.state.name,
      resolution: this.state.resolution,
      itemtype: this.state.itemtype
    };

    WallpaperDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          resolution: response.data.resolution,
          itemtype: response.data.itemtype,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newWallpaper() {
    this.setState({
      id: null,
      name: "",
      resolution: "",
      itemtype: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
          {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newWallpaper}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="resolution">Resolution</label>
              <input
                type="text"
                className="form-control"
                id="resolution"
                required
                value={this.state.resolution}
                onChange={this.onChangeResolution}
                name="resolution"
              />
            </div>

            <div className="form-group">
              <label htmlFor="itemtype">Item Type</label>
              <input
                type="text"
                className="form-control"
                id="itemtype"
                required
                value={this.state.itemtype}
                onChange={this.onChangeItemType}
                name="itemtype"
              />
            </div>

            <button onClick={this.saveWallpaper} className="btn btn-success">
              Submit
            </button>
          </div>
          )}
      </div>  
    );
  }
}