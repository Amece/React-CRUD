import React, { Component } from "react";
import WallpaperDataService from "../services/wallpaper.service";
import { useParams } from 'react-router-dom';

export function withRouter(Children){
  return(props)=>{
     const match  = {params: useParams()};
     return <Children {...props}  match = {match}/>
 }
}

export class Wallpaper extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeResolution = this.onChangeResolution.bind(this);
    this.onChangeItemType = this.onChangeItemType.bind(this);
    this.getWallpaper = this.getWallpaper.bind(this);
    this.updateWallpaper = this.updateWallpaper.bind(this);
    this.deleteWallpaper = this.deleteWallpaper.bind(this);

    this.state = {
      currentWallpaper: {
        id: null,
        name: "",
        resolution: "",
        itemtype: ""
      },
      message: ""
    };

  }

  componentDidMount() {
    this.getWallpaper(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentWallpaper: {
          ...prevState.currentWallpaper,
          name: name
        }
      };
    });
  }

  onChangeResolution(e) {
    const resolution = e.target.value;
    
    this.setState(prevState => ({
      currentWallpaper: {
        ...prevState.currentWallpaper,
        resolution: resolution
      }
    }));
  }

  onChangeItemType(e) {
    const itemtype = e.target.value;
    
    this.setState(prevState => ({
      currentWallpaper: {
        ...prevState.currentWallpaper,
        itemtype: itemtype
      }
    }));
  }

  getWallpaper(id) {
    WallpaperDataService.get(id)
      .then(response => {
        this.setState({
          currentWallpaper: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateWallpaper() {
    WallpaperDataService.update(
      this.state.currentWallpaper.id,
      this.state.currentWallpaper
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Wallpaper was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteWallpaper() {    
    WallpaperDataService.delete(this.state.currentWallpaper.id)
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Wallpaper was deleted successfully!"
        });
        this.props.history.push('/wallpapers')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentWallpaper } = this.state;

    return (
      <div>
        {currentWallpaper ? (
          <div className="edit-form">
            <h4>Wallpaper</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentWallpaper.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="resolution">Resolution</label>
                <input
                  type="text"
                  className="form-control"
                  id="resolution"
                  value={currentWallpaper.resolution}
                  onChange={this.onChangeResolution}
                />
              </div>

              <div className="form-group">
                <label htmlFor="itemtype">Item Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemtype"
                  value={currentWallpaper.itemtype}
                  onChange={this.onChangeItemType}
                />
              </div>
            </form>

            <button
              className="btn btn-danger mr-2"
              onClick={this.deleteWallpaper}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateWallpaper}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
          </div>
        )}
      </div>
    )}
}

export default withRouter(Wallpaper);
