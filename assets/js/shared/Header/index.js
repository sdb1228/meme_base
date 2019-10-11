import React, { Component, lazy, Suspense } from "react";
import Style from "../../../css/header.css";
import { IconContext } from "react-icons";
import { FaSearch, FaPlus } from 'react-icons/fa';
const CreatePost = lazy(() => import('../CreatePost'));

export default class Header extends Component {
  constructor() {
    super();
    this.state = { createPost: null }
  }

  openCreatePost = () => {
    this.setState({ createPost: this.renderPostModal()})
  }

  renderPostModal = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <CreatePost refetchFeed={this.props.refetchFeed} isOpen />
      </Suspense>
    )
  }

  render () {
    return (
      <div className={Style.header}>
        {this.state.createPost}
        <div className={Style.homeRouteContainer}>
          <a className={Style.homeRoute}  href="/">MEME BASE</a>
        </div>
        <IconContext.Provider value={{ color: "white", className: Style.searchIcon }}>
          <div className={Style.searchAddContainer}>
            <button className={Style.searchButton}>
              <FaSearch />
            </button>
            <button onClick={this.openCreatePost} className={Style.addButton}>
              <FaPlus />
            </button>
          </div>
        </IconContext.Provider>
      </div>
    );
  }
}
