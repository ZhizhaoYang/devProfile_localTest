import React, { Component } from "react";
import {
  Grid,
  Header,
  Segment,
  Form,
  Button,
  Icon,
  Message
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

import { loginUser } from "../../actions/authActions";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    // console.log("On submit");

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
    // this.props.history.push("/dashboard");
  };

  componentDidMount = () => {
    document.title = "Login Page";

    if (this.props.auth.isValidToLogin) {
      this.props.history.push("/");
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isValidToLogin === true) {
      nextProps.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <Grid
          container
          centered
          textAlign="center"
          style={{ minHeight: 580, position: "relative", paddingTop: 130 }}
        >
          {/* <Grid.Row> */}
          <Grid.Column style={{ maxWidth: 500 }}>
            <Segment piled style={{ minHeight: 250, marginBottom: 5 }}>
              <Header
                as="h2"
                color="teal"
                style={{ padding: "20px 0px 10px 0px" }}
              >
                <Icon name="coffee" size="large" /> Login to your account
              </Header>
              <Form error size="large" onSubmit={this.onSubmit}>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  onChange={this.onChange}
                  value={this.state.email}
                />
                {errors.email && (
                  <Message error content={errors.email} size="mini" floating />
                )}

                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  value={this.state.password}
                />
                {errors.password && (
                  <Message
                    error
                    content={errors.password}
                    size="mini"
                    floating
                  />
                )}
                <Button
                  type="submit"
                  fluid
                  color="teal"
                  style={{ marginTop: "20px", marginBottom: "5px" }}
                >
                  Submit
                </Button>
              </Form>
            </Segment>

            <Message
              style={{ textAlign: "center", marginTop: 10, marginBottom: 90 }}
            >
              New to us? <Link to="/register">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  loginUser: userData => {
    dispatch(loginUser(userData));
  }
});

Login.propTypes = {
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
  loginUser: propTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
