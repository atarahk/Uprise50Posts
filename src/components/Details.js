import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchPostsAndUsers } from "../actions";
import UserHeader from "./UserHeader";

class Details extends Component {
  componentDidMount() {
    this.props.fetchPostsAndUsers(this.props.match.params.id);
  }

  render() {
    if (!this.props.user) {
      return <div>Loading</div>;
    }
    return (
      <div className="container" style={{ paddingTop: 30 }}>
        <div className="card card-lg text-center" style={{ padding: 50 }}>
          <h1
            className="text-xxxl mb-sm mt-sm"
            style={{ textTransform: "uppercase" }}
          >
            <UserHeader userId={this.props.post.userId} />
          </h1>
          <p className="text-sm mb-lg">{this.props.post.title}</p>
          <h2 className="text-xxl m-b">Post ID: {this.props.post.id}</h2>
          <p>
            <Link to="/">Go Back To Homepage</Link>
          </p>
          <div className="text-xs mx-auto">
            <p className="m-b-xs">{this.props.post.body}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users[ownProps.match.params.userid - 1],
    post: state.posts[ownProps.match.params.id - 1]
  };
};

export default connect(
  mapStateToProps,
  { fetchPostsAndUsers }
)(Details);
