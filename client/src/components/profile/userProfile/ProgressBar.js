import React, { Component } from "react";
import styled from "styled-components";

import isEmpty from "../../../toolKit/isEmpty";

import "./SkillSection.css";

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "0",
      percentage: "0"
    };
  }

  componentDidMount = async () => {
    await setTimeout(
      function() {
        this.setState({
          percentage: this.props.percentage
        });
      }.bind(this),
      500
    );
  };

  render() {
    const percentage = Number(this.state.percentage);
    let text = this.state.text;
    console.log(text);

    // const TextAfter = styled.div`
    //   margin-left: 10%;
    //   &:after {
    //     content: " AAA";
    //   }
    // `;

    // let text = (
    //   <TextAfter>
    //     {/* <span
    //       className="text skills-progress-bar"
    //       style={{ marginLeft: `${percentage}%` }}
    //     > */}
    //     {isEmpty(percentage) ? "0" : percentage}%{/* </span> */}
    //   </TextAfter>
    // );

    return (
      <div>
        <span
          className="text"
          style={{ marginLeft: `${percentage}%`, display: "inlineBlock" }}
          //   style={{ left: `${percentage}` }}
        >
          {isEmpty(percentage) ? "0" : percentage}%
        </span>

        <span>
          {/* {text} */}
          <div className="bar skills-progress-bar">
            <div
              className="percentage-filter"
              style={{
                width: `${percentage}%`
              }}
            />
          </div>
        </span>
      </div>
    );
  }
}

export default ProgressBar;
