import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading";
import NewTweet from "./NewTweet";

/*
I lost about 1 hour because I was importing LoadingBar instead of default.
It's hard to detect the bug because LoadingBar exists too:

WRONG: (it's importing unconnected LoadingBar
import { LoadingBar } from 'react-redux-loading'

CORRECT: (it's importing connected LoadingBar
import LoadingBar from 'react-redux-loading'
**/

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true ? null : <NewTweet />}
      </div>
    );
  }
}

// export default App;
// export default connect()(App);
function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
