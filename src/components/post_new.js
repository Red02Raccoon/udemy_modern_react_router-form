import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { createPost } from "../actions/index";

const InputField = props => {
  const {
    meta: { error, touched }
  } = props;
  const classDiv = `form-group ${touched && error ? "has-danger" : ""}`;
  return (
    <div className={classDiv}>
      {props.label ? <label>{props.label}</label> : null}
      {props.textarea ? (
        <textarea
          {...props.input}
          className={props.classInput}
          style={{ height: "100px" }}
        />
      ) : (
        <input
          {...props.input}
          className={props.classInput}
          type={props.type}
        />
      )}
      {touched && error ? (
        <div className="error-field text-help">{error}</div>
      ) : null}
    </div>
  );
};

class PostNew extends Component {
  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="title"
          label="Title"
          type="text"
          classInput="form-control"
          component={InputField}
        />
        <Field
          name="categories"
          label="Categories"
          type="text"
          classInput="form-control"
          component={InputField}
        />
        <Field
          name="content"
          label="Content for post"
          textarea={true}
          classInput="form-control"
          component={InputField}
        />
        <div className="form-btns">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/" className="btn btn-danger">
            Cancel
          </Link>
        </div>
      </form>
    );
  }
}

function validate(values) {
  let errors = {};

  if (!values.title) {
    errors.title = "Enter title for your post";
  }

  if (!values.categories) {
    errors.categories = "Enter categories for your post";
  }

  if (!values.content) {
    errors.content = "Enter some text for your post";
  }

  return errors;
}

export default reduxForm({
  form: "PostsNewForm",
  validate
})(
  connect(
    null,
    { createPost }
  )(PostNew)
);
