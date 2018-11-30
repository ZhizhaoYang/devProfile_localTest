import React, { Component } from "react";
import { Grid, Card, Header, Button } from "semantic-ui-react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

import "./ProfileItem.css";
import UserProfile from "../profile/userProfile/UserProfile";

// get the specified user profile based on the profile user id
class ProfileItem extends Component {
  render() {
    let userID = this.props.profile.user._id;
    let username = this.props.profile.profileUserName;
    let jobStatus = this.props.profile.jobStatus;
    let location = this.props.profile.location;

    return (
      <div className="itemContainer">
        <Grid.Row as="section" centered>
          <Grid.Column className="profileItem">
            <Card centered fluid className="card">
              <Card.Content>
                <Grid
                  columns={2}
                  className="cardContent"
                  style={{ paddingLeft: 45 }}
                >
                  {/* <Grid.Row> */}
                  <LeftSection
                    username={username}
                    jobStatus={jobStatus}
                    location={location}
                    userID={userID}
                  />

                  <Grid.Column>
                    <h1>C2</h1>
                  </Grid.Column>
                  {/* </Grid.Row> */}
                </Grid>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </div>
    );
  }
}

const LeftSection = props => {
  // console.log(props.userID);

  return (
    <Grid.Column textAlign="left">
      <span className="itemHeader">{props.username}</span>
      <Card.Meta style={{ fontSize: 16, paddingTop: 10 }}>
        {props.jobStatus}
      </Card.Meta>

      <Card.Meta style={{ fontSize: 13, paddingTop: 5 }}>
        {props.location}
      </Card.Meta>
      <Link to={`UserProfileBySearch/${props.userID}`}>
        <Button
          color="teal"
          size="tiny"
          style={{ marginTop: 70, marginBottom: 15 }}
        >
          View Profile
        </Button>
      </Link>
    </Grid.Column>
  );
};

ProfileItem.propTypes = {
  profile: propTypes.object.isRequired
};

export default ProfileItem;
