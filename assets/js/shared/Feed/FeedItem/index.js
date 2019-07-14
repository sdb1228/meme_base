import React from "react";
import Style from "../../../../css/feedItem.css";
import { FaHeart, FaRegHeart, FaShareAlt, FaArrowDown } from 'react-icons/fa';

const FeedItem = props => (
  <>
    <div className={Style.imageContainer}>
      <img src="https://i.imgur.com/OFxS42L.jpg" alt="" className={Style.memeImage}/>
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
          <FaArrowDown />
        </div>
        <div className={Style.shareIcon}>
          <FaShareAlt />
        </div>
      </div>
    </div>
  </>
);
export default FeedItem;
