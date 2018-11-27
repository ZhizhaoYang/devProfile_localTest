import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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

import isEmpty from "../../../toolKit/isEmpty";
import InputFieldForEdit from "./InputFieldForEdit";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileUserName: "",
      jobStatus: "",
      location: "",
      phone: "",
      bio: "",
      skills: [],
      errors: {}
    };
  }

  componentDidMount = () => {
    document.title = "Edit Profile Page";
    this.props.getCurrentUserProfile();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const userProfile = nextProps.profile.userProfile;

    if (nextProps.profile.userProfile) {
      // If profile field doesnt exist, make empty string
      userProfile.profileUserName = !isEmpty(userProfile.profileUserName)
        ? userProfile.profileUserName
        : "";

      userProfile.phone = !isEmpty(userProfile.phone) ? userProfile.phone : "";

      userProfile.location = !isEmpty(userProfile.location)
        ? userProfile.location
        : "";

      userProfile.skills = !isEmpty(userProfile.skills)
        ? userProfile.skills
        : [];

      userProfile.bio = !isEmpty(userProfile.bio) ? userProfile.bio : "";

      // Set component fields state
      this.setState({
        profileUserName: userProfile.profileUserName,
        jobStatus: userProfile.jobStatus,
        location: userProfile.location,
        phone: userProfile.phone,
        bio: userProfile.bio,
        skills: userProfile.skills
      });
    }
  }

  onChange = e => {
    // set state from user's input change
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();

    const profileData = {
      profileUserName: this.state.profileUserName,
      jobStatus: this.state.jobStatus,
      location: this.state.location,
      phone: this.state.phone,
      bio: this.state.bio,
      skills: this.state.skills,
      errors: {}
    };

    this.props.createProfile(profileData, this.props.history);
  };

  onChangeSkills = (e, id) => {
    const newName = e.target.name;
    const newValue = e.target.value;
    const index = id.content;
    const newSkillsArr = this.state.skills;

    newSkillsArr.map(skill => {
      if (skill.id === index) {
        if (newName === "skillName") {
          newSkillsArr[index].skillName = newValue;
        } else if (newName === "percentage") {
          newSkillsArr[index].percentage = newValue;
        }
      }
    });

    this.setState({ skills: newSkillsArr });
  };

  render() {
    const { skills } = this.state;

    let skillsComponent;
    if (!isEmpty(skills)) {
      skillsComponent = skills.map(newSkill => {
        let id = newSkill.id;
        return (
          <Form.Field key={newSkill.id} as="div">
            <Form.Input
              name="skillName"
              value={this.state.skills[id].skillName}
              type="text"
              onChange={this.onChangeSkills}
              content={id}
            />

            <Form.Input
              name="percentage"
              value={this.state.skills[id].percentage}
              type="number"
              onChange={this.onChangeSkills}
              content={id}
            />
          </Form.Field>
        );
      });
    }

    return (
      <Container className="EditProfile" as="div">
        <Grid style={{ marginTop: 20 }}>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1" textAlign="center">
                <Icon name="edit outline" />
                Edit Your Profile
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1} centered>
            <Grid.Column width={10}>
              <p style={{ textAlign: "right" }}>
                *{" "}
                <span style={{ color: "red" }}>represents required fields</span>
              </p>
              <Form onSubmit={this.onSubmit}>
                <InputFieldForEdit
                  name="profileUserName"
                  value={this.state.profileUserName}
                  label={`* Your Name:`}
                  placeholder="Enter your name"
                  type="text"
                  onChange={this.onChange}
                  error={this.state.errors.profileUserName}
                />

                <InputFieldForEdit
                  name="jobStatus"
                  value={this.state.jobStatus}
                  label="* Job Status:"
                  placeholder="Enter job status"
                  type="text"
                  onChange={this.onChange}
                  error={this.state.errors.jobStatus}
                />

                <InputFieldForEdit
                  name="location"
                  value={this.state.location}
                  label="Location:"
                  placeholder="Enter your location:"
                  type="text"
                  onChange={this.onChange}
                  error={this.state.errors.location}
                />

                <InputFieldForEdit
                  name="phone"
                  value={this.state.phone}
                  label="Phone Number:"
                  placeholder="Enter phone number:"
                  type="text"
                  onChange={this.onChange}
                  error={this.state.errors.phone}
                />

                <h4>Skills:</h4>

                <Form.Field>
                  <Header as="h4" style={{ marginBottom: 0 }}>
                    <Form.Group>
                      {isEmpty(skillsComponent) ? null : skillsComponent}
                    </Form.Group>
                    <Form.Button size="tiny" color="red">
                      + New Line
                    </Form.Button>
                  </Header>
                </Form.Field>

                <Form.Field
                  name="bio"
                  value={this.state.bio}
                  control={TextArea}
                  label="Bio"
                  placeholder="Tell us more about you..."
                  onChange={this.onChange}
                  error={this.state.errors.bio}
                />
                {/* <Form.Field>
                  <Checkbox label="I agree to the Terms and Conditions" />
                </Form.Field> */}
                <Button type="submit" color="teal">
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  getCurrentUserProfile: () => {
    dispatch(getCurrentUserProfile());
  },
  createProfile: (profileData, history) => {
    dispatch(createProfile(profileData, history));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
