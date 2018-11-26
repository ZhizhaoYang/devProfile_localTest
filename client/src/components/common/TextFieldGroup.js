import React from "react";
import { Form } from "semantic-ui-react";
import propTypes from "prop-types";
import classnames from "classnames";

const TextFieldGroup = ({
  name,
  value,
  label,
  placeholder,
  type,
  style,
  required,
  onChange,
  icon,
  iconPosition,
  properties,
  error
}) => {
  return (
    <div>
      {required ? (
        <Form.Field style={style} required>
          <label>{label}</label>
          {/* Here className attribute is sourced from Bootscript */}
          <input
            className={classnames("form-control", {
              "is-invalid": error
            })}
            name={name}
            value={value}
            placeholder={placeholder}
            type={type}
            onChange={onChange}
          />
          {/* Here className attribute is sourced from Bootscript */}
          {error && <div className="invalid-feedback">{error}</div>}
        </Form.Field>
      ) : (
        <Form.Field style={style} required>
          <label>{label}</label>
          <input
            name={name}
            value={value}
            placeholder={placeholder}
            type={type}
            onChange={onChange}
          />
        </Form.Field>
      )}
      {properties}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  label: propTypes.string,
  error: propTypes.string,
  type: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  icon: propTypes.string,
  iconPosition: propTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
