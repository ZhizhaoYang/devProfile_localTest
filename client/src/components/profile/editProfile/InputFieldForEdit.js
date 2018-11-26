import React, { Component } from "react";

import { Form, Header, TextArea } from "semantic-ui-react";

const InputFieldForEdit = ({
  name,
  value,
  label,
  placeholder,
  type,
  onChange,
  error
}) => {
  //   let result;

  //   {
  //     error
  //       ? (result = (
  //           <Form.Field>
  //             <Header as="h4" style={{ marginBottom: 0 }}>
  //               <Form.Input
  //                 name={name}
  //                 value={value}
  //                 label={label}
  //                 placeholder={placeholder}
  //                 type={type}
  //                 onChange={onChange}
  //               />
  //             </Header>
  //             <p style={{ color: "red", fontSize: 12 }}>* {error}</p>
  //           </Form.Field>
  //         ))
  //       : (result = (
  //           <Form.Field>
  //             <Header as="h5">
  //               <Form.Input
  //                 name={name}
  //                 value={value}
  //                 label={label}
  //                 placeholder={placeholder}
  //                 type={type}
  //                 onChange={onChange}
  //               />
  //             </Header>
  //           </Form.Field>
  //         ));
  //   }

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
