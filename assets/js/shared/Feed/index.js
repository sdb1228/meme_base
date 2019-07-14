import React from "react";
import Style from "../../../css/feed.css";
import FeedItem from "./FeedItem";

function renderItems (items) {
  return items.map((item) =>
    <div key={item.node.id} className={Style.feedItemContainer}>
      <FeedItem item={item.node}/>
    </div>
  )
}

const Feed = props => (
  <div className={Style.feed}>
    {props.items.length ? renderItems(props.items) : null}
  </div>
);
export default Feed;
