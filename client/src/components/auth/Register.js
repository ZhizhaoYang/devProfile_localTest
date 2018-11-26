import React, { Component } from "react";
import {
  Container,
  Button,
  Form,
  Header,
  Segment,
  Grid,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import propTypes from "prop-types";

import { setCurrentUser, registerNewUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
  }

  onChange = e => {
    // set state from user's input change
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.confirmPassword
    };

    // this.props.setCurrentUser(newUser, this.props.history);

    this.props.registerNewUser(newUser, this.props.history);
    // console.log(this.props.auth);
  };

  componentDidMount() {
    document.title = "Register Page";
  }

  // In the states obj, errors is empty initially, when user input an invalid
  // content to the form, registernewUser action will dispatch the new errors
  // to the errors reducer which is on the state tree(Redux).
  // It means a new state including a errors prop will re-render to this page,
  // the below method re-set "this.state.errors" to have some new children.
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    const containerStyle = {
      minHeight: "800px",
      marginTop: "14px"
    };

    const formStyle = {
      marginTop: "50px",
      marginBottom: "50px"
    };

    const headerStyle = {
      fontSize: "40px",
      paddingTop: "10px",
      paddingBottom: "0px",
      marginTop: "10px"
    };

    const formItemStyle = {
      paddingLeft: "25px",
      paddingRight: "25px",
      paddingTop: "10px",
      paddingBottom: "10px"
    };

    return (
      <div className="register">
        <Container style={containerStyle}>
          <Grid
            style={{ position: "relative", height: "100%" }}
            verticalAlign="middle"
            stretched
          >
            <Grid.Row centered>
              <Grid.Column computer={10} tablet={12} mobile={15}>
                <Form size="massive" style={formStyle} onSubmit={this.onSubmit}>
                  <Segment piled>
                    <Header
                      className="header"
                      textAlign="center"
                      style={headerStyle}
                    >
                      <Icon name="signup" />
                      Sign Up
                    </Header>
                    <Header
                      sub
                      style={{ textAlign: "center", marginTop: "0px" }}
                    >
                      Create your developer profile account
                    </Header>

                    <TextFieldGroup
                      name="name"
                      value={this.state.name}
                      label="Name"
                      placeholder="Enter your name"
                      style={formItemStyle}
                      type="text"
                      required
                      onChange={this.onChange}
                      icon="lock"
                      iconPosition="left"
                      error={errors.name}
                    />

                    <TextFieldGroup
                      name="email"
                      value={this.state.email}
                      label="Email Address"
                      placeholder="Enter your email address"
                      style={formItemStyle}
                      type="email"
                      required
                      onChange={this.onChange}
                      error={errors.email}
                    />

                    <TextFieldGroup
                      name="password"
                      value={this.state.password}
                      label="Password"
                      placeholder="Enter a new password"
                      style={formItemStyle}
                      type="password"
                      required
                      onChange={this.onChange}
                      error={errors.password}
                    />

                    <TextFieldGroup
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      style={formItemStyle}
                      type="password"
                      required
                      onChange={this.onChange}
                      error={errors.password2}
                    />

                    {/* <Form.Field style={formItemStyle}>
                      <Checkbox label="I agree to the Terms and Conditions" />
                    </Form.Field> */}
                    <Button
                      type="submit"
                      fluid
                      color="teal"
                      style={{ marginTop: "20px", marginBottom: "5px" }}
                    >
                      Submit
                    </Button>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: currentUser => {
    dispatch(setCurrentUser(currentUser));
  },
  registerNewUser: (newUser, history) => {
    dispatch(registerNewUser(newUser, history));
  }
});

Register.propTypes = {
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
  registerNewUser: propTypes.func.isRequired,
  setCurrentUser: propTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
