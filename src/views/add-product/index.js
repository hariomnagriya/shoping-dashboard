import React, { Component } from "react";
import axios from "axios";
import {
  FormGroup,
  FormLabel,
  Button,
  FormControl,
  Container,
  Row
} from "react-bootstrap";
import Validator, { ValidationTypes } from "js-object-validation";
import { toast } from "react-toastify";
import { MDBBtn } from "mdbreact";
//import ToggleDisplay from "react-toggle-display";
const BASE_URL = "http://192.168.2.107:8080/";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      errors: {},
      show: false,
      category: "",
      imageUpdated: false,
      imagePreviewUrl: "",
      thumbnail: ""
    };
  }

  componentDidMount = async () => {};

  onSubmit = async e => {
    e.preventDefault();
    try {
      const { name, price, thumbnail } = this.state;

      const obj = {
        name,
        price
      };
      const validations = {
        name: {
          [ValidationTypes.REQUIRED]: true
        },
        price: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.NUMERIC]: true
        },
        thumbnail: {
          [ValidationTypes.REQUIRED]: true
        }
      };
      const messages = {
        name: {
          [ValidationTypes.REQUIRED]:
            "Please Give the description of the product."
        },
        price: {
          [ValidationTypes.REQUIRED]: "Please Enter the price of product.",
          [ValidationTypes.NUMERIC]: "Must be a number."
        },
        thumbnail: {
          [ValidationTypes.REQUIRED]:
            "Please Enter the Selling price of product."
        }
      };
      const { isValid, errors } = Validator(obj, validations, messages);
      console.log(errors);
      console.log(isValid);
      if (!isValid) {
        this.setState({
          errors
        });
        return;
      }
      const data = {
        name,
        price,
        thumbnail
      };
      const body = new FormData();
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const element = data[i];
          body.append(i, element);
        }
      }
      const response = await axios.post(
        " http://192.168.2.107:8080/addProduct",
        body
      );
      toast.info("product added successfully!");
      this.props.history.push("/product-list");
    } catch (error) {
      console.log(error);
      toast.error(
        `${(error.response &&
          error.response.data &&
          error.response.data.message) ||
          "Unknown error"}`
      );
    }
  };
  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: null
      }
    });
  };
  onChangefile = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({
      thumbnail: e.target.files[0] ? e.target.files[0] : null,
      imageUpdated: true
    });
    reader.onloadend = () => {
      this.setState({
        thumbnail: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  };
  handleClick = e => {
    this.setState({
      show: !this.state.show
    });
  };
  render() {
    const { errors, category } = this.state;
    console.log(errors);
    const {
      name: nameError,
      price: priceError,
      thumbnail: thumbnailError
    } = errors;
    let { imagePreviewUrl, thumbnail } = this.state;
    let $imagePreview = (
      <img
        src={BASE_URL + this.state.thumbnail}
        width="150px"
        height="150px"
        alt="no image selected"
      />
    );
    if (imagePreviewUrl) {
      $imagePreview = (
        <img src={imagePreviewUrl} width="150px" height="150px" />
      );
    }
    return (
      <>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
          integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
          crossorigin="anonymous"
        />
        <Row className="login_formSignin__27WMl">
          <Container>
            <h3 align="center">Add Product</h3>
            {/* <FormGroup>
              <FormLabel>Category</FormLabel>
              <FormControl
                readOnly
                value={category}
                className="bg auth-box c"
              />
            </FormGroup> */}
            <form onSubmit={this.onSubmit} noValidate>
              <FormGroup>
                <FormLabel>
                  <i class="fab fa-product-hunt top" />
                  Name <span className="required">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  placeholder="product name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onInputChange}
                />
                {nameError ? <p className="text-danger">{nameError}</p> : null}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  <i class="fas fa-tag top" />
                  Price <span className="required">*</span>
                </FormLabel>
                <FormControl
                  type="number"
                  placeholder="product Price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onInputChange}
                />

                {priceError ? (
                  <p className="text-danger">{priceError}</p>
                ) : null}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  <i class="far fa-file-image top" />
                  Image <span className="required">*</span>
                </FormLabel>
                <FormControl
                  type="file"
                  placeholder="product Image"
                  name="thumbnail"
                  onChange={this.onChangefile}
                  className="auth-box c"
                />
                {thumbnailError ? (
                  <p className="text-danger">{thumbnailError}</p>
                ) : null}
              </FormGroup>
              <FormGroup align="center">
                <div className="imgPreview">{$imagePreview}</div>
              </FormGroup>
              <br />
              <div>
                <Button
                  variant="outline-success"
                  type="submit"
                  // onClick={this.notify()}
                  className="animate"
                >
                  <i class="fas fa-plus top" />
                  Add Product
                </Button>
              </div>
              <br />
            </form>
          </Container>
        </Row>
      </>
    );
  }
}
export default AddProduct;
