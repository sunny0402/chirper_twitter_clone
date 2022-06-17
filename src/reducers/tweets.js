import { RECEIVE_TWEETS, TOGGLE_TWEET } from "../actions/tweets";

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
    default:
      return state;
  }
}
