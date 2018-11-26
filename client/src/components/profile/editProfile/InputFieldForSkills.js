import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Button,
  Form,
  Container,
  Grid,
  Header,
  Icon,
  TextArea
} from "semantic-ui-react";

import {
  createProfile,
  getCurrentUserProfile
} from "../../../actions/profileActions";

class InputFieldForSkills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skillName: "",
      percentage: "",
      errors: {}
    };
  }

  //   componentDidMount = () => {
  //     document.title = "Edit Profile Page";
  //     this.props.getCurrentUserProfile();
  //   };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Form.Field>
          <Header as="h4" style={{ marginBottom: 0 }}>
            <Form.Input
              name="skillName"
              value={this.state.skillName}
              type="text"
              onChange={this.onChange}
            />
          </Header>
        </Form.Field>
      </div>
    );
  }
}

InputFieldForSkills.propTypes = {
  skills: PropTypes.array.isRequired
};

// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors,
//   profile: state.profile
// });

// const mapDispatchToProps = dispatch => ({
//   getCurrentUserProfile: () => {
//     dispatch(getCurrentUserProfile());
//   },
//   createProfile: (profileData, history) => {
//     dispatch(createProfile(profileData, history));
//   }
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouter(InputFieldForSkills));

export default InputFieldForSkills;
