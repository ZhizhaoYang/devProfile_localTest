import React, { Component } from "react";

import { Grid, Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./UserProfile.css";

export default class bioSection extends Component {
  render() {
    const bioSectionStyle = {
      marginTop: 50,
      padding: 0,
      width: "100%"
      //   boxShadow: "0px 0px 1px 2px , 0px 0px 0px 0px "
    };

    const bioHeaderStyle = {
      //   wordSpacing: 1,
      fontSize: 30,
      textAlign: "center"
    };

    const bioDescStyle = {
      fontSize: 17,
      wordSpacing: 2,
      padding: "10px 8px 10px 8px",
      textAlign: "left",
      lineHeight: 1.3,
      minHeight: 100
      //   maxHeight: 130
    };

    const { userProfile } = this.props;
    const description = userProfile.bio;

    return (
      <div className="bioSection">
        <Grid container centered>
          <Grid.Row
            centered
            className="bioSection"
            as="section"
            style={{ padding: 0 }}
          >
            <Grid.Column
              textAlign="left"
              verticalAlign="middle"
              computer={13}
              tablet={13}
              mobile={13}
              style={{ padding: 0 }}
            >
              <Card fluid centered style={bioSectionStyle} color="teal">
                <Card.Content>
                  <Card.Header style={bioHeaderStyle}>
                    {userProfile.profileUserName}
                    {`'s `} &nbsp;&nbsp;&nbsp;
                    {"Bio"}
                  </Card.Header>
                </Card.Content>

                <Card.Content>
                  <Card.Description style={bioDescStyle}>
                    {description}
                  </Card.Description>
                </Card.Content>

                <Card.Content
                  style={{
                    textAlign: "center",
                    fontFamily: "'Muli', sans-serif"
                  }}
                >
                  <Grid.Column>
                    <Button.Group color="blue" width={8}>
                      <Button style={{ width: 180 }} as="button">
                        DOWNLOAD &nbsp;&nbsp; CV
                      </Button>
                      <Button.Or text="&" />

                      <Link to="https://github.com/ZhizhaoYang">
                        <Button style={{ width: 180 }} as="button">
                          MY &nbsp;&nbsp;GITHUB
                        </Button>
                      </Link>
                    </Button.Group>
                  </Grid.Column>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
