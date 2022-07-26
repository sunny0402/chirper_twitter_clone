import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from "../actions/tweets";

/* 
When liking a tweet (or unliking a tweet), the state for that specific tweet needs 
to change - either the tweet's like property (which, if you remember, is an array and 
will contain the names of the users that have liked the tweet) will need to change to 
include the user that clicked it (if they're liking the tweet) or the user's name will 
need to be removed from the array (if they're unliking the tweet).
**/

export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets,
      };
    case TOGGLE_TWEET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes:
            action.hasLiked === true
              ? state[action.id].likes.filter(
                  (uid) => uid !== action.authedUser
                )
              : state[action.id].likes.concat([action.authedUser]),
        },
      };

    /**
     * Tweets part of state. Replies is an array.
     * Replies array indicates all the tweets (twee ids) 
     * of all the tweets that have to replied to this tweet.
     * State:
      {
        tweets: {
          tweetId: { tweetId, authorId, timestamp, text, likes, replies, replyingTo},
          tweetId: { tweetId, authorId, timestamp, text, likes, replies, replyingTo}
        },
        users: {
          userId: {userId, userName, avatar, tweets array},
          userId: {userId, userName, avatar, tweets array}
        },
        authedUser: userId
      }
    */

    case ADD_TWEET:
      const { tweet } = action;

      let replyingTo = {};
      if (tweet.replyingTo !== null) {
        replyingTo = {
          // [tweet.replyingTo] is the id of a tweet in our state
          // which new tweet is replying to
          [tweet.replyingTo]: {
            // update the tweet that is being replied to
            // this is tweets reducer, so ...state updates the tweet part of state
            ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id]),
          },
        };
      }

      return {
        ...state,
        // add new tweet to the tweet slice of state
        [action.tweet.id]: action.tweet,
        ...replyingTo,
      };

    default:
      return state;
  }
}
