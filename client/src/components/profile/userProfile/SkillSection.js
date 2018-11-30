import React, { Component } from "react";
import propTypes from "prop-types";
import uuid from "uuid";

import { Grid, Header, Container, Divider } from "semantic-ui-react";

import "./SkillSection.css";

import ProgressBar from "./ProgressBar";

class SkillSection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let skills;
    if (this.props.skills) {
      skills = this.props.skills.map(skill => {
        let percentage = skill.percentage;
        let skillName = skill.skillName;

        return (
          <Grid.Row key={uuid()} columns={2}>
            <Grid.Column width={3} textAlign="right" style={{ paddingTop: 10 }}>
              {skillName}
            </Grid.Column>

            <Grid.Column
              width={13}
              style={{ padding: 0, maxWidth: "65%", height: "30px" }}
            >
              <ProgressBar skillName={skillName} percentage={percentage} />
            </Grid.Column>
          </Grid.Row>
        );
      });
    }

    return (
      <div className="skill-section">
        <Container
          as="div"
          className="skill-section-container"
          style={{ padding: 0 }}
        >
          <Grid
            as="div"
            className="skill-section-content"
            style={{ margin: "0 8% 0 8%" }}
            centered
          >
            <Grid.Row centered style={{ marginTop: 35 }}>
              <Grid.Column textAlign="center">
                <Header as="h1" style={{ wordSpacing: "23px" }}>
                  Skill Set
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Divider />

            <Grid.Row columns={2}>
              <Grid.Column className="skillsLeft" width={6}>
                <Header as="h2" textAlign="center">
                  Tools
                </Header>
              </Grid.Column>

              <Grid.Column className="skillsRight" width={10}>
                <Grid>{skills}</Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

SkillSection.propTypes = {
  skills: propTypes.array.isRequired
};

export default SkillSection;
