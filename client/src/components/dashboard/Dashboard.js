import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { Button, Container } from "semantic-ui-react";

import { getCurrentUserProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

import isEmpty from "../../toolKit/isEmpty";

class Dashboard extends Component {
  componentDidMount = () => {
    document.title = "Dashboard Page";

    this.props.getCurrentUserProfile(this.props.auth.user.id);
  };

  render() {
    let dashboardContent;
    const { userProfile, loading } = this.props.profile;

    if (userProfile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (isEmpty(userProfile)) {
        dashboardContent = (
          <Container>
            <Link to="/editProfile">
              <Button color="blue">Go to Create Your Profile</Button>
            </Link>
          </Container>
        );
      } else if (Object.keys(userProfile).length > 0) {
        let userID = this.props.auth.user.id;

        dashboardContent = (
          <Container>
            <h1>Dashboard Page</h1>
            <Link to={`/userProfile/${userID}`}>
              <Button color="blue">Go to current profile</Button>
            </Link>
            <Link to="/editProfile">
              <Button color="blue">Edit Profile</Button>
            </Link>
          </Container>
        );
      }
    }

    return <div className="dashboard">{dashboardContent}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  getCurrentUserProfile: userID => {
    dispatch(getCurrentUserProfile(userID));
  }
});

Dashboard.propTypes = {
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
  profile: propTypes.object.isRequired,
  getCurrentUserProfile: propTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
