import React from 'react';
import Style from "../../../css/memeCreator.css";

const initialState = {
  toptext: "",
  bottomtext: "",
  isTopDragging: false,
  isBottomDragging: false,
  topY: "10%",
  topX: "50%",
  bottomX: "50%",
  bottomY: "90%"
}

class MemeCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
      modalIsOpen: false,
      currentImagebase64: null,
      ...initialState
    };
  }

  openImage = (index) => {
    const base_image = new Image();
    base_image.src = image.src;
    const base64 = this.getBase64Image(base_image);
    this.setState(prevState => ({
      currentImage: index,
      modalIsOpen: !prevState.modalIsOpen,
      currentImagebase64: base64,
      ...initialState
    }));
  }

  toggle = () => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }));
  }

  changeText = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

  getStateObj = (e, type) => {
    let rect = this.imageRef.getBoundingClientRect();
    const xOffset = e.clientX - rect.left;
    const yOffset = e.clientY - rect.top;
    let stateObj = {};
    if (type === "bottom") {
      stateObj = {
        isBottomDragging: true,
        isTopDragging: false,
        bottomX: `${xOffset}px`,
        bottomY: `${yOffset}px`
      }
    } else if (type === "top") {
      stateObj = {
        isTopDragging: true,
        isBottomDragging: false,
        topX: `${xOffset}px`,
        topY: `${yOffset}px`
      }
    }
    return stateObj;
  }

  handleMouseDown = (e, type) => {
    const stateObj = this.getStateObj(e, type);
    document.addEventListener('mousemove', (event) => this.handleMouseMove(event, type));
    this.setState({
      ...stateObj
    })
  }

  handleMouseMove = (e, type) => {
    if (this.state.isTopDragging || this.state.isBottomDragging) {
      let stateObj = {};
      if (type === "bottom" && this.state.isBottomDragging) {
        stateObj = this.getStateObj(e, type);
      } else if (type === "top" && this.state.isTopDragging){
        stateObj = this.getStateObj(e, type);
      }
      this.setState({
        ...stateObj
      });
    }
  };

  handleMouseUp = (event) => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.setState({
      isTopDragging: false,
      isBottomDragging: false
    });
  }

  dataURItoBlob = (dataURI) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], {type: mimeString});
  }

  convertSvgToImage = () => {
    const svg = this.svgRef;
    let svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
    img.onload = () => {
      canvas.getContext("2d").drawImage(img, 0, 0);
      const canvasdata = canvas.toDataURL("image/png");
      const blob = this.dataURItoBlob(canvasdata)
      var fd = new FormData();
      var xhr = new XMLHttpRequest();
      fd.append("img", blob);
      xhr.open('POST', '/upload', true);
      xhr.send(fd);
      this.props.closeModal()
    };
  }

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }

  render() {
    if (!this.props.file) {
      return null
    }
    var wrh = this.props.file.width / this.props.file.height;
    var newWidth = 600;
    var newHeight = newWidth / wrh;
    const textStyle = {
      fontFamily: "Impact",
      fontSize: "50px",
      textTransform: "uppercase",
      fill: "#FFF",
      stroke: "#000",
      userSelect: "none"
    }

    return (
      <div className={Style.memeCreatorContainer}>
        <svg
          width={newWidth}
          id="svg_ref"
          height={newHeight}
          ref={el => { this.svgRef = el }}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink">
          <image
            ref={el => { this.imageRef = el }}
            xlinkHref={this.props.file.src}
            height={newHeight}
            width={newWidth}
          />
          <text
            style={{ ...textStyle, zIndex: this.state.isTopDragging ? 4 : 1 }}
            x={this.state.topX}
            y={this.state.topY}
            dominantBaseline="middle"
            textAnchor="middle"
            onMouseDown={event => this.handleMouseDown(event, 'top')}
            onMouseUp={event => this.handleMouseUp(event, 'top')}
          >
              {this.state.toptext}
          </text>
          <text
            style={textStyle}
            dominantBaseline="middle"
            textAnchor="middle"
            x={this.state.bottomX}
            y={this.state.bottomY}
            onMouseDown={event => this.handleMouseDown(event, 'bottom')}
            onMouseUp={event => this.handleMouseUp(event, 'bottom')}
          >
              {this.state.bottomtext}
          </text>
        </svg>
        <div className={Style.memeForm}>
            <label className={Style.textLabels} for="toptext">Top Text</label>
            <input className={Style.textInput} type="text" name="toptext" id="toptext" placeholder="Add text to the top" onChange={this.changeText} />
            <label className={Style.textLabels} for="bottomtext">Bottom Text</label>
            <input className={Style.textInput} type="text" name="bottomtext" id="bottomtext" placeholder="Add text to the bottom" onChange={this.changeText} />
          <button onClick={() => this.convertSvgToImage()} >Upload Meme!</button>
        </div>
      </div>
    )
  }
}

export default MemeCreator;
