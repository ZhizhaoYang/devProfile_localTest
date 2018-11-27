import React from "react";

import { Form, Header } from "semantic-ui-react";

const InputFieldForEdit = ({
  name,
  value,
  label,
  placeholder,
  type,
  onChange,
  error
}) => {
  return (
    <Form.Field>
      <Header as="h4" style={{ marginBottom: 0 }}>
        <Form.Input
          name={name}
          value={value}
          label={label}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
        />
      </Header>
      {error ? <p style={{ color: "red", fontSize: 12 }}>* {error}</p> : null}
    </Form.Field>
  );
};

InputFieldForEdit.defaultProps = {
  type: "text"
};

export default InputFieldForEdit;
