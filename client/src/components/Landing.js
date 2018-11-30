import React, { Component } from "react";
import { Grid, Divider, Header } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./Landing.css";

class Landing extends Component {
  componentDidMount = () => {
    document.title = "Home Page";
  };

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

    let registerBtn;
    let accountBtn;
    let goToDashboard;

    let username = "";
    if (this.props.auth.user.name) {
      username = this.props.auth.user.name;
    }

    if (!this.props.auth.isValidToLogin) {
      registerBtn = (
        <Grid.Column computer={4} tablet={8} mobile={12}>
          <Link to="/register">
            <button className="btn-hover color-3">Register Now!</button>
          </Link>
        </Grid.Column>
      );

      accountBtn = (
        <Grid.Column computer={4} tablet={8} mobile={12}>
          <Link to="/login">
            <button className="btn-hover color-7 ">I Have Account</button>
          </Link>
        </Grid.Column>
      );
    } else {
      goToDashboard = (
        <Grid.Column computer={4} tablet={8} mobile={12}>
          <Link to="/dashboard">
            <button className="btn-hover color-9">
              Clike here to Dashboard
            </button>
          </Link>
        </Grid.Column>
      );
      registerBtn = (
        <Grid.Column computer={4} tablet={8} mobile={12} textAlign="center">
          <Header as="h1" inverted>
            Welcome! {username}
          </Header>
        </Grid.Column>
      );
      accountBtn = goToDashboard;
    }

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

          {/* Two Buttons */}
          <Grid.Row
            style={{ paddingTop: "30px", height: "90px", marginTop: "10px" }}
            centered
          >
            {registerBtn}
          </Grid.Row>

          <Grid.Row
            style={{
              paddingTop: "30px",
              height: "90px",
              marginBottom: "30px"
            }}
            centered
          >
            {accountBtn}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

// const mapDispatchToProps = dispatch => ({
//   getCurrentUserProfile: () => {
//     dispatch(getCurrentUserProfile());
//   }
// });

export default connect(
  mapStateToProps,
  null
)(withRouter(Landing));
