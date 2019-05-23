import React, { Component } from "react";
import { FormLabel, FormGroup, FormControl, Container } from "react-bootstrap";
const BASE_URL = "http://192.168.2.107:8080/";

class TableRow3 extends Component {
  render() {
    // console.log("hello");
    return (
      <Container className="animate">
        <FormGroup>
          <FormLabel>Name</FormLabel>
          <FormControl readOnly value={this.props.obj.name} className="c" />
        </FormGroup>
        <FormGroup>
          <FormLabel>price</FormLabel>
          <FormControl readOnly value={this.props.obj.price} className="c" />
        </FormGroup>
        {/* <FormGroup>
          <FormLabel>Price</FormLabel>
          <FormControl
            readOnly
            value={this.props.obj.thumbnail}
            className="c"
          />
        </FormGroup> */}
        <FormLabel>product Image</FormLabel>
        <FormGroup align="center">
          <br />
          <img
            alt="No Image Found"
            src={BASE_URL + this.props.obj.thumbnail}
            width="150px"
            height="150px"
          />
        </FormGroup>
        <FormLabel>product Image</FormLabel>
        <FormGroup align="center">
          <br />
          <img
            alt="No Image Found"
            src={BASE_URL + this.props.obj.otherImg.Array}
            width="150px"
            height="150px"
          />
        </FormGroup>
      </Container>
    );
  }
}
export default TableRow3;
