import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Menu, Grid, Container, Icon } from "semantic-ui-react";

import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  constructor(props) {
    super(props);

    const defaultActiveItem = "home";
    this.state = { activeItem: defaultActiveItem };
  }

  // Handle mouse click on navbat items
  handleItemClick = (e, { name, linkto }) => {
    e.preventDefault();
    this.setState({ activeItem: name });

    this.props.history.push(linkto);
  };

  // Handle Logout Button for Navbar
  onLogoutClick = (e, { name, linkto }) => {
    e.preventDefault();

    // set effect when click on navbar
    this.setState({ activeItem: name });

    // logout => empty auth.user & auth.isValidToLogin = false
    this.props.logoutUser();

    // clear the profile reducer after logout
    this.props.clearCurrentProfile();

    // redirect to home page
    this.props.history.push(linkto);
  };

  render() {
    const { activeItem } = this.state;

    const { isValidToLogin } = this.props.auth;

    const menuItemStyle = {
      color: "white",
      marginRight: "10px"
    };

    const menuBackgroundStyle = {
      backgroundColor: "#616774",
      height: 40,
      paddingTop: "2rem"
      // marginBottom: "1px"
    };

    const guestNav = (
      <Menu.Menu position="right">
        <Menu.Item
          as="a"
          name="login"
          active={activeItem === "login"}
          onClick={this.handleItemClick}
          style={menuItemStyle}
          linkto="/login"
        >
          Login
        </Menu.Item>
        <Menu.Item
          name="signUp"
          link={true}
          active={activeItem === "signUp"}
          onClick={this.handleItemClick}
          style={menuItemStyle}
          linkto="/register"
        >
          Sign Up
        </Menu.Item>
      </Menu.Menu>
    );

    const validUserLink = (
      <Menu.Menu position="right">
        <Menu.Item
          as="a"
          name="logout"
          active={activeItem === "logout"}
          onClick={this.onLogoutClick}
          style={menuItemStyle}
          linkto="/"
        >
          Logout
        </Menu.Item>
      </Menu.Menu>
    );

    return (
      <div className="navBar">
        <Grid style={{ marginBottom: "0px" }}>
          <Grid.Row style={{ margin: 0, paddingBottom: 0 }}>
            <Grid.Column>
              <Menu
                pointing
                secondary
                color="blue"
                position="left"
                style={menuBackgroundStyle}
              >
                <Container>
                  <Menu.Item
                    as="a"
                    name="about"
                    active={activeItem === "about"}
                    onClick={this.handleItemClick}
                    style={menuItemStyle}
                    linkto="/about"
                  >
                    <Icon name="coffee" style={{ marginRight: "1.5em" }} />{" "}
                    About
                  </Menu.Item>

                  <Menu.Item
                    name="home"
                    link={true}
                    active={activeItem === "home"}
                    onClick={this.handleItemClick}
                    style={menuItemStyle}
                    linkto="/"
                  >
                    Home
                  </Menu.Item>

                  <Menu.Item
                    name="dashboard"
                    link={true}
                    active={activeItem === "dashboard"}
                    onClick={this.handleItemClick}
                    style={menuItemStyle}
                    linkto="/dashboard"
                  >
                    Dashboard
                  </Menu.Item>

                  <Menu.Item
                    name="profilesList"
                    link={true}
                    active={activeItem === "profilesList"}
                    onClick={this.handleItemClick}
                    style={menuItemStyle}
                    linkto="/profilesList"
                  >
                    Developers
                  </Menu.Item>
                </Container>

                {isValidToLogin ? validUserLink : guestNav}
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToprops = dispatch => ({
  logoutUser: () => {
    dispatch(logoutUser());
  },

  clearCurrentProfile: () => {
    dispatch(clearCurrentProfile());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToprops
)(withRouter(Navbar));
