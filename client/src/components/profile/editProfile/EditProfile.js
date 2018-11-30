import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import uuid from "uuid";

import {
  Button,
  Form,
  Container,
  Grid,
  Header,
  Icon,
  TextArea,
  Input
} from "semantic-ui-react";

import {
  createProfile,
  getCurrentUserProfile,
  addNewSkill
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
      newSkills: [],
      errors: {}
    };
  }

  componentDidMount = () => {
    document.title = "Edit Profile Page";
    this.props.getCurrentUserProfile(this.props.auth.user.id);
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

      userProfile.jobStatus = !isEmpty(userProfile.jobStatus)
        ? userProfile.jobStatus
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

  // normal onChange function
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

  addNewSkill = () => {
    const skill = {
      id: this.state.skills.length,
      skillName: "",
      percentage: ""
    };

    // add a bland new line in newSkills state's array
    // Note: can use this setState format in onChangSkills event function,
    //       yes, we get a better implementation now, go to fix it one day
    // this.setState({ newSkills: [...this.state.newSkills, skill] }); (old)
    this.setState({ skills: [...this.state.skills, skill] });
  };

  deleteNewSkill = () => {
    // ---------- old codes --------------
    // const skills = this.state.newSkills;
    // skills.splice(0, 1);

    // this.setState({ newSkills: skills });
    // ------------------------------------

    const skills = this.state.skills;
    const lastID = skills.length - 1;
    skills.splice(lastID, 1);
    this.setState({ skills: skills });
  };

  onChangeNewSkills = e => {
    const name = e.target.name;
    // const value = e.target.value;
    // const newSkillsArr =

    if (name === "SkillName") {
      this.setState({ newSkills: [...this.state.newSkills] });
    }
  };

  // onChange function for changing skills section's input value
  onChangeSkills = (e, id) => {
    const newName = e.target.name;
    const newValue = e.target.value;
    const index = id.content;
    const newSkillsArr = this.state.skills;

    // Note: in semantic react, id.content attribute can hold things,
    //       we can use it to hold more complicate data next time
    newSkillsArr.forEach(skill => {
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
    // -------------------- skills logic section ------------------------
    // Should be abstacted as a component, should be fixed in the future,
    // have no time today
    const { skills } = this.state;

    let skillsComponent;
    let skillItems;
    let newLines;

    // if (!isEmpty(skills)) {
    skillItems = skills.map(newSkill => {
      let id = newSkill.id;

      return (
        <div key={newSkill.id}>
          <Grid.Column width={16}>
            <Form.Group>
              <Form.Input
                name="skillName"
                value={this.state.skills[id].skillName}
                type="text"
                onChange={this.onChangeSkills}
                content={id}
                label="Skill Name:"
                size="small"
                control={Input}
              />

              <Form.Input
                name="percentage"
                value={this.state.skills[id].percentage}
                type="number"
                onChange={this.onChangeSkills}
                content={id}
                label="Percentage:"
                size="small"
                control={Input}
              />
            </Form.Group>
          </Grid.Column>
        </div>
      );
    });

    newLines = this.state.newSkills.map(line => {
      // let id = uuid();
      // let newLineID = this.state.skills.length;
      // console.log(newLineID);
      return (
        <div key={uuid()}>
          <Form.Input
            name="SkillName"
            value={line.skillName}
            type="text"
            label="Skill Name:"
            onChange={this.onChangeNewSkills}
            // content={newLineID}
            size="small"
            control={Input}
          />

          <Form.Input
            name="Percentage"
            value={line.percentage}
            type="text"
            label="Percentage"
            onChange={this.onChangeNewSkills}
            // content={newLineID}
            size="small"
            control={Input}
          />
        </div>
      );
    });

    skillsComponent = (
      <section>
        <Container>
          <Grid>
            <Grid.Row centered columns={1} style={{ paddingBottom: 0 }}>
              <Grid.Column>
                <Header
                  style={{
                    marginTop: 30,
                    marginBottom: 20,
                    textAlign: "center"
                  }}
                >
                  Skill Section
                </Header>
              </Grid.Column>

              <Grid.Column
                computer={6}
                tablet={9}
                mobile={11}
                style={{ marginBottom: 0 }}
              >
                {skillItems}
                {newLines}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row centered columns={1} style={{ paddingTop: 0 }}>
              <Grid.Column computer={6} tablet={9} mobile={11}>
                <Button
                  circular
                  type="button"
                  onClick={this.addNewSkill}
                  color="red"
                  size="small"
                  style={{ width: 77, marginRight: 12 }}
                >
                  + Line
                </Button>

                <Button
                  circular
                  type="button"
                  onClick={this.deleteNewSkill}
                  color="red"
                  size="small"
                  style={{ width: 77 }}
                >
                  - Line
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
    );
    // }
    // ----------------------------------------------------------

    return (
      <Form onSubmit={this.onSubmit}>
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

            <Grid.Row centered textAlign="center">
              <Grid.Column width={10}>
                <p style={{ textAlign: "right" }}>
                  *{" "}
                  <span style={{ color: "red" }}>
                    represents required fields
                  </span>
                </p>
                <InputFieldForEdit
                  name="profileUserName"
                  value={this.state.profileUserName}
                  label="* Your Name:"
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

                <Form.Field
                  name="bio"
                  value={this.state.bio}
                  control={TextArea}
                  label="Bio:"
                  placeholder="Tell us more about you..."
                  onChange={this.onChange}
                  error={this.state.errors.bio}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row centered>
              <Grid.Column textAlign="center">
                <Header as="h4" style={{ marginBottom: 0 }}>
                  {skillsComponent}
                  {/* {isEmpty(skillsComponent) ? null : skillsComponent} */}
                </Header>
              </Grid.Column>
            </Grid.Row>
            {/* <Form.Field>
                  <Checkbox label="I agree to the Terms and Conditions" />
                </Form.Field> */}

            <Grid.Row centered>
              <Grid.Column
                textAlign="center"
                computer={10}
                tablet={9}
                mobile={11}
              >
                <Button
                  type="submit"
                  color="teal"
                  fluid
                  style={{ marginTop: 40 }}
                >
                  Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  getCurrentUserProfile: userID => {
    dispatch(getCurrentUserProfile(userID));
  },
  createProfile: (profileData, history) => {
    dispatch(createProfile(profileData, history));
  },
  addNewSkill: () => {
    dispatch(addNewSkill());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
