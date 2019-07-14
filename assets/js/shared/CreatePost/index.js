import React, { Component } from "react";
import Style from "../../../css/createPost.css";
import { FaTimes } from 'react-icons/fa';
import ReactModal from 'react-modal';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_POST = gql`
  mutation CreatePostMutation($title: String!, $url: String!, $user_id: ID!) {
    createPost(title: $title, url: $url, user_id: $user_id) {
      id
      title
      url
      user_id
    }
  }
`;

function isValidURL(str) {
   var a  = document.createElement('a');
   a.href = str;
   return (a.host && a.host != window.location.host);
}

export default class CreatePost extends Component {
  constructor() {
    super();
    this.state = { isOpen: true }
  }

  componentWillReceiveProps(props) {
    this.setState({ isOpen: props.isOpen})
  }

  closeModal = () => {
    this.setState({isOpen: false})
  }

  inputChange = (e, createPost) => {
    if (isValidURL(e.target.value)) {
      createPost({variables: { title: "testing", url: e.target.value, user_id: "1"}})
      this.closeModal()
    } else {
      //Throw error
    }
  }

  render() {
      return (
      <Mutation mutation={ADD_POST}>
        {(createPost, returnThing) => (
          <ReactModal
            isOpen={this.state.isOpen}
            overlayClassName={Style.modalOverlayStyle}
            className={Style.modalStyle}
            contentLabel="Create Post Modal"
            appElement={document.getElementById("index")}
          >
            <div className={Style.content} >
              <div className={Style.header} >
                <button className={Style.closeButton} onClick={this.closeModal}>
                  <FaTimes />
                </button>
              </div>
              <div className={Style.formContent}>
                <div className={Style.dropContainerParent}>
                  <div className={Style.dropContainer}>
                    Drop Here
                  </div>
                </div>
                <div className={Style.browseButtonContainer}>
                  <button className={Style.browseButton}>Browse</button>
                  <div className={Style.browseText}> or drag images here. </div>
                </div>
                <div className={Style.inputContainer} >
                  <input
                    id={Style.pasteUrlInput}
                    onChange={(e) => this.inputChange(e, createPost)}
                    placeholder="Paste Image or URL"/>
                </div>
              </div>
            </div>
          </ReactModal>
        )}
      </Mutation>
      );
  }
}
