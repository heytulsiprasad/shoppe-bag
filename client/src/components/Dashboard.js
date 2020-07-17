import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { loadUser } from './../redux/actions/authActions';

class Dashboard extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    loadUser: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadUser();
  }

  render() {
    let person = this.props.user;

    return (
      <React.Fragment>
        {this.props.isAuthenticated ? (
          <div>
            <h1>You are {person.user.name}</h1>
            <h4>Your email is {person.user.email}</h4>
            <h3>
              You have {person.user.items ? person.user.items.length : 'no'}{' '}
              todos
            </h3>
          </div>
        ) : (
          <h2> Sorry</h2>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loadUser })(Dashboard);
