import React, { Component } from "react";

import { Grid, Header, Image, List } from "semantic-ui-react";

import isEmpty from "../../../toolKit/isEmpty";
import avatarUser from "../../../img/avatar-userProfile.jpg";

class profileNameCard extends Component {
  render() {
    const nameCardHeader = {
      marginTop: 20,
      marginLeft: 25,
      textAlign: "left",
      fontSize: 38
    };

    const contactListStyle = {
      fontSize: 16,
      color: "white",
      fontWeight: "bolder",
      marginTop: 65,
      marginLeft: 25
    };

    const contactListItemStyle = {
      padding: "5px 0px 5px 0px"
    };

    const imageStyle = {
      maxHeight: "100%",
      maxWidth: "87%",
      paddingTop: 5,
      paddingBottom: 5
    };

    let nameTitle;
    let contactList;
    let nameCard;

    const { userProfile } = this.props;
    const { email } = userProfile.user;
    const { phone, location, personalWebsite } = userProfile;

    if (Object.keys(userProfile).length > 0) {
      let jobStatus;
      let profileUserName;

      jobStatus = userProfile.jobStatus;
      profileUserName = userProfile.profileUserName;

      nameTitle = (
        <Header style={nameCardHeader}>
          <Header.Content
            className="nameCardHeaderContent"
            style={{
              color: "white",
              textAlign: "left"
            }}
          >
            {profileUserName}
            <Header.Subheader style={{ color: "white", fontSize: "20px" }}>
              {jobStatus}
            </Header.Subheader>
          </Header.Content>
        </Header>
      );

      contactList = (
        <List className="contactList" style={contactListStyle}>
          {!isEmpty(email) ? (
            <List.Item className="contactListItem" style={contactListItemStyle}>
              <List.Icon name="mail" />
              <List.Content>{email}</List.Content>
            </List.Item>
          ) : null}

          {!isEmpty(phone) ? (
            <List.Item className="contactListItem" style={contactListItemStyle}>
              <List.Icon name="phone" />
              <List.Content>{phone}</List.Content>
            </List.Item>
          ) : null}

          {!isEmpty(location) ? (
            <List.Item className="contactListItem" style={contactListItemStyle}>
              <List.Icon name="map marker alternate" />
              <List.Content>{location}</List.Content>
            </List.Item>
          ) : null}

          {!isEmpty(personalWebsite) ? (
            <List.Item className="contactListItem" style={contactListItemStyle}>
              <List.Icon name="globe" />
              <List.Content>{personalWebsite}</List.Content>
            </List.Item>
          ) : null}
        </List>
      );

      nameCard = (
        <div>
          <Grid container centered>
            <Grid.Row
              centered
              className="nameCard"
              as="section"
              style={{ padding: 0 }}
            >
              <Grid.Column textAlign="left" computer={8}>
                {nameTitle}
                {contactList}
              </Grid.Column>

              <Grid.Column
                textAlign="left"
                computer={8}
                style={{ paddingRight: 0 }}
              >
                <Image src={avatarUser} style={imageStyle} circular centered />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
    }

    return <div>{nameCard}</div>;
  }
}

export default profileNameCard;
