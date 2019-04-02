import React from 'react';
import { connect } from 'react-redux';

class UserHeader extends React.Component {
  render() {
    const { user } = this.props;
    console.log(`I'm userId from UserHeader ${this.props.userId}`);
    
    if (!user) {
      return null;
    }

    return (
      <div>
        <div className="header">{user.username}</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find(user => user.id === ownProps.userId) };
};

export default connect(mapStateToProps)(UserHeader);

