import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";

import { Grid, Container, Header } from "semantic-ui-react";

import { getProfiles } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem.js";
import isEmpty from "../../toolKit/isEmpty";

import "./ProfilesList.css";

class ProfilesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profiles: []
    };
  }

  // get all the profiles list from API
  componentDidMount = () => {
    this.props.getProfiles();
  };

  // set state when receive new props
  componentWillReceiveProps = (nextProps, prevProps) => {
    if (!isEmpty(nextProps.profile.profiles)) {
      this.setState({ profiles: nextProps.profile.profiles });
    }
  };

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    // if no file in the list, return spinner
    if (profiles === null || loading) {
      profileItems = (
        <Grid.Row as="section" centered>
          <Grid.Column className="profileItem">
            <Spinner />
          </Grid.Column>
        </Grid.Row>
      );
    } else {
      // if received the list
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => {
          let profileItem = <ProfileItem key={profile._id} profile={profile} />;
          return profileItem;
        });
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profilesList">
        <Container>
          <Grid>
            <Grid.Row as="section">
              <Grid.Column textAlign="center">
                <span className="listHeader">Developers Profiles</span>
              </Grid.Column>
            </Grid.Row>
            {profileItems}
          </Grid>
        </Container>
      </div>
    );
  }
}

ProfilesList.propTypes = {
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  getProfiles: () => {
    dispatch(getProfiles());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilesList);
