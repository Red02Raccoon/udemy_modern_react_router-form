import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class PostNew extends Component {
  render() {
    return <div>post new!</div>;
  }
}

export default reduxForm({
  form: ""
})(PostNew);
