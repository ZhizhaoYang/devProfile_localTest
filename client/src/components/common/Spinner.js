import React from "react";

import loadingPizza from "../../img/loadingPizza.gif";

export default () => {
  return (
    <div>
      <img
        src={loadingPizza}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="loading"
      />
    </div>
  );
};
