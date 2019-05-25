import React, { Component } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Validator, { ValidationTypes } from "js-object-validation";
import Swal from "sweetalert2";

import {
  Button,
  FormLabel,
  FormGroup,
  FormControl,
  Row,
  Col
} from "react-bootstrap";
class ForgotComponent extends Component {
  render() {
    const { email, isLoading, errors } = this.props;
    const { email: emailError } = this.props.errors;
    return (
      <div className="login_loginContainer__2JMrT">
        <form
          onSubmit={this.props.sendEmail}
          noValidate
          className="login_formSignin__27WMl"
        >
          <h2 align="center">Forgot Password</h2>
          <br />
          <ToastContainer />
          <div className="login_subhead__e1IaE">Forgot Password ?</div>
          <div>
            <div className="mb-100 input-group">
              <FormGroup>
                <FormControl
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={this.props.handleChange("email")}
                  className="a"
                />
                {emailError ? (
                  <p className=" text-danger">{emailError}</p>
                ) : null}
              </FormGroup>
            </div>
            <div>
              <Button type="submit" className="btn btn-dark btn-block ">
                {" "}
                {isLoading ? "please wait.." : "Submit"}
              </Button>
            </div>
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp;
          <div className="b">
            <Link to={"/login1"} align="center">
              <p> Sign in</p>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default ForgotComponent;