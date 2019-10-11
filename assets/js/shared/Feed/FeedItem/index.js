import React from "react";
import Style from "../../../../css/feedItem.css";
import { FaHeart, FaRegHeart, FaShareAlt, FaArrowDown } from 'react-icons/fa';


function downloadURI(uri) {
  var link = document.createElement("a");
  link.download = "meme.png";
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const FeedItem = props => (
  <>
    <div className={Style.imageContainer}>
      <img src={props.item.url} alt="" className={Style.memeImage}/>
    </div>
    <div className={Style.likesAndShare}>
      <div className={Style.likeContainer}>
        <div className={Style.likeIcon}>
          <FaRegHeart />
        </div>
        <div className={Style.likeCount}>
          12 Loves
        </div>
      </div>
      <div className={Style.shareContainer}>
        <div className={Style.downloadIcon}>
          <button className={Style.downloadButton} onClick={() => downloadURI(props.item.url)}>
            <FaArrowDown />
          </button>
        </div>
        <div className={Style.shareIcon}>
          <FaShareAlt />
        </div>
      </div>
    </div>
  </>
);
export default FeedItem;


