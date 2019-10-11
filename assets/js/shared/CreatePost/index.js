import React, { Component } from "react";
import Style from "../../../css/createPost.css";
import { FaTimes } from 'react-icons/fa';
import ReactModal from 'react-modal';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import MemeCreator from './MemeCreator';

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
    this.state = {
      isOpen: true,
      selectedImage: null
    }
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

  onFileSelected = event => {
    const file = event.currentTarget.files[0]
    if (FileReader && file) {
        var fr = new FileReader();
        fr.onload = () => {
          const image = new Image();
          image.src = fr.result
          image.onload = () => {
            this.setState({selectedImage: image})
          }
        }
        fr.readAsDataURL(file);
    }
  }

  render() {
      return (
      <Mutation mutation={ADD_POST}>
        {(createPost, returnThing) => (
          <ReactModal
            isOpen={this.state.isOpen}
            overlayClassName={Style.modalOverlayStyle}
            className={this.state.selectedImage ? Style.memeCreatorModal : Style.modalStyle}
            contentLabel="Create Post Modal"
            appElement={document.getElementById("index")}
          >
            <div className={!this.state.selectedImage ? Style.content : null} >
              <div className={Style.header} >
                <button className={Style.closeButton} onClick={this.closeModal}>
                  <FaTimes />
                </button>
              </div>
              <MemeCreator closeModal={this.closeModal} file={this.state.selectedImage}/>
              {!this.state.selectedImage  &&
              <div className={Style.formContent}>
                <div className={Style.dropContainerParent}>
                  <div className={Style.dropContainer}>
                    Drop Here
                  </div>
                </div>
                <div className={Style.browseButtonContainer}>
                  <input
                    id="attachmentFile"
                    ref={element => {
                      this.fileInput = element
                    }}
                    onChange={this.onFileSelected}
                    style={{
                      display: 'none'
                    }}
                    accept=".png,.jpeg"
                    type="file"
                  />
                  <button onClick={() => { this.fileInput.click() }} className={Style.browseButton} >Browse</button>
                  <div className={Style.browseText}> or drag images here. </div>
                </div>
                <div className={Style.inputContainer} >
                  <input
                    id={Style.pasteUrlInput}
                    onChange={(e) => this.inputChange(e, createPost)}
                    placeholder="Paste Image or URL"/>
                </div>
              </div>
              }
            </div>
          </ReactModal>
        )}
      </Mutation>
      );
  }
}
