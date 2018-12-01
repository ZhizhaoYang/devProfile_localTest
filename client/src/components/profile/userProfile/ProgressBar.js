import React, { Component } from "react";
import propTypes from "prop-types";

import isEmpty from "../../../toolKit/isEmpty";

import "./SkillSection.css";

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: "0"
    };

    // this._isMounted = false;
  }

  componentWillMount = async () => {
    try {
      await setTimeout(
        function() {
          this.setState({
            percentage: this.props.percentage
          });
        }.bind(this),
        500
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const percentage = Number(this.state.percentage);

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

ProgressBar.propTypes = {
  percentage: propTypes.string
};

export default ProgressBar;
