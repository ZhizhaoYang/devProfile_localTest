import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// import { Grid } from "semantic-ui-react";

import { getCurrentUserProfile } from "../../../actions/profileActions";
import "./UserProfile.css";
import Spinner from "../../common/Spinner";
import ProfileNamecard from "./ProfileNameCard";
import BioSection from "./BioSection";
import SkillSet from "./SkillSection";

class UserProfile extends Component {
  componentDidMount = () => {
    // console.log(this.props.match.params.user_id);
    let userID = this.props.match.params.user_id;

    this.props.getCurrentUserProfile(userID);
  };

  // componentWillUpdate = nextProps => {
  //   nextProps.getCurrentUserProfile(nextProps.auth.user.id);
  // };

  render() {
    const { userProfile, loading } = this.props.profile;

    let profileContent;

    if (userProfile === null || loading) {
      profileContent = <Spinner />;
    } else {
      const { skills } = userProfile;

      let nameCard = <ProfileNamecard userProfile={userProfile} />;
      let bioSection = <BioSection userProfile={userProfile} />;
      let skillSet = <SkillSet skills={skills} />;
      // The main container of single profile page
      profileContent = (
        <div>
          <div>{nameCard}</div>
          <div>{bioSection}</div>
          <div>{skillSet}</div>
        </div>
      );
    }

    return (
      <div className="userProfile">
        <section className="header-background" />
        {profileContent}
      </div>
    );
  }
}

UserProfile.propTypes = {
  auth: propTypes.object.isRequired,
  errors: propTypes.object,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  getCurrentUserProfile: userID => {
    dispatch(getCurrentUserProfile(userID));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserProfile));
