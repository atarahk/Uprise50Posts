import React from "react";
import { connect } from "react-redux";
import { fetchPostsAndUsers } from "../actions";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";

import Pagination from "./Pagination";
import "../css/myStyle.css";

class PostList extends React.Component {
  state = {
    posts: [],
    currentPosts: [],
    currentPage: null,
    totalPages: null
  };

  componentDidMount() {
    this.props.fetchPostsAndUsers();
  }

  onPageChanged = data => {
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentPosts = this.props.posts.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentPosts, totalPages });
  };

  render() {
    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      this.state.currentPage ? "border-gray border-right" : ""
    ]
      .join(" ")
      .trim();

    const totalPosts = this.props.posts.length;
    if (totalPosts === 0) return null;

    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                <strong className="text-secondary">{totalPosts}</strong> Posts
              </h2>

              {this.state.currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page{" "}
                  <span className="font-weight-bold">
                    {this.state.currentPage}
                  </span>{" "}
                  /{" "}
                  <span className="font-weight-bold">
                    {this.state.totalPages}
                  </span>
                </span>
              )}
            </div>

            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination
                totalRecords={totalPosts}
                pageLimit={5}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </div>
          </div>

          <table className="table" style={{ borderBottomStyle: "hidden" }}>
            <thead>
              <tr style={{ color: "#6b88a4" }}>
                <th style={{ width: "8%" }}>POST ID</th>
                <th style={{ width: "12%" }}>USER NAME</th>
                <th style={{ width: "24%" }}>TITLE</th>
                <th>BODY</th>
                <th style={{ width: "10%" }}>DETAILS</th>
              </tr>
            </thead>
          </table>

          {this.state.currentPosts.map(post => (
            <div key={post.id}>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th style={{ width: "8%" }}>{post.id}</th>
                    <th style={{ width: "12%" }}>
                      <UserHeader userId={post.userId} />
                    </th>
                    <th style={{ width: "24%" }}>{post.title}</th>
                    <th>{post.body}</th>
                    <th style={{ width: "10%" }}>
                      <Link
                        to={`/details/${post.id}/${post.userId}`}
                        className="linkStyle"
                      >
                        VIEW
                      </Link>
                    </th>
                  </tr>
                </tbody>
              </table>
              <div />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { posts: state.posts };
};

export default connect(
  mapStateToProps,
  { fetchPostsAndUsers }
)(PostList);
