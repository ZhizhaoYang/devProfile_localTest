import React, { Component } from "react";
import { Grid, Divider, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./Landing.css";

export default class Landing extends Component {
  componentDidMount() {
    document.title = "Home Page";
  }

  render() {
    const headerStyle = {
      fontSize: "130px",
      wordSpacing: "20px",
      fontFamily: "'Spicy Rice', cursive",
      textSizeAdjust: "80%"
    };

    const subheaderStyle = {
      fontFamily: "'Montserrat', sans-serif",
      wordSpacing: "2px"
    };

    return (
      <div className="landing">
        <Grid>
          <Grid.Row centered>
            <Grid.Column computer={12} tablet={8} mobile={16}>
              <Header
                className="header"
                inverted
                textAlign="center"
                style={headerStyle}
              >
                Developer Profile
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered>
            <Grid.Column computer={16} tablet={8} mobile={16}>
              <Header
                inverted
                textAlign="center"
                as="h3"
                style={subheaderStyle}
              >
                A web app for developers to create personal profiles.
              </Header>
              <Divider />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row
            style={{ paddingTop: "30px", height: "90px", marginTop: "10px" }}
            centered
          >
            <Grid.Column computer={4} tablet={8} mobile={12}>
              <Link to="/register">
                <button className="btn-hover color-3">Register Now!</button>
              </Link>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row
            style={{
              paddingTop: "30px",
              height: "90px",
              marginBottom: "30px"
            }}
            centered
          >
            <Grid.Column computer={4} tablet={8} mobile={12}>
              <Link to="/login">
                <button className="btn-hover color-7 ">I Have Account</button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
