import React, { Component } from "react";
import { connect } from "react-redux";
import Tweet from "./Tweet";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3 className="center">Your Timeline</h3>
        <ul className="dashboard-list">
          {this.props.tweetIds.map((id) => (
            <li key={id}>
              <Tweet id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ tweets }) {
  return {
    tweetIds: Object.keys(tweets).sort(
      (a, b) => tweets[b].timestamp - tweets[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Dashboard);

/* 
App State:
{
  tweets: {
    tweetId: { tweet id, author’s id, timestamp, text, likes, replies, replyingTo},
    tweetId: { tweet id, author’s id, timestamp, text, likes, replies, replyingTo}
  },
  users: {
    userId: {user’s id, user’s name, avatar, tweets array},
    userId: {user’s id, user’s name, avatar, tweets array}
  }
}
**/
