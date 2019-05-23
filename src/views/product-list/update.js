import React, { Component } from "react";
import axios from "axios";
import {
  FormGroup,
  FormLabel,
  Button,
  FormControl,
  Row
} from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const BASE_URL = "http://192.168.2.107:8080/";

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      thumbnail: "",
      otherImg: "",
      imageUpdated: false,
      imagePreviewUrl: ""
    };
  }

  componentDidMount = async () => {
    try {
      const response = await axios.get(
        "http://192.168.2.107:8080/getItem/" + this.props.match.params.id
      );
      console.log(response);

      this.setState({
        name: response.data.result.name,
        price: response.data.result.price,
        thumbnail: response.data.result.thumbnail
      });
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

  onSubmit = async e => {
    e.preventDefault();

    try {
      const { name, Price, thumbnail, imageUpdated } = this.state;

      const data = {
        name,
        Price,
        thumbnail,
        imageUpdated
      };
      //   console.log(file);
      console.log("file***********");
      console.log(data);
      const body = new FormData();
      for (const i in data) {
        if (data.hasOwnProperty(i)) {
          const element = data[i];
          body.append(i, element);
        }
      }
      console.log(this.props.match.params._id);
      const result = await axios.post(
        "http://192.168.2.107:8080/editItem/" + this.props.match.params.id,
        body
      );
      console.log(result.obj);
      Swal.fire({
        type: "success",
        title: "Success",
        text: "Product updated Successfully !"
      });
      // toast.success("product updated !");
      this.props.history.push("/product-list");
    } catch (error) {
      console.log(error);
      console.log(error.result.data.message);
      toast.error(
        `${(error.result && error.result.data && error.result.data.message) ||
          "Unknown error"}`
      );
    }
  };

  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
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
  render() {
    let { imagePreviewUrl, thumbnail } = this.state;
    let $imagePreview = (
      <img src={BASE_URL + this.state.thumbnail} width="150px" height="150px" />
    );
    if (imagePreviewUrl) {
      $imagePreview = (
        <img src={imagePreviewUrl} width="150px" height="150px" />
      );
    }
    return (
      <div style={{ marginTop: 10 }} align="left" className="animate">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
          integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
          crossorigin="anonymous"
        />
        <Row className="login_formSignin__27WMl">
          <h3 align="center">Update Product</h3>
          <form onSubmit={this.onSubmit} noValidate>
            <FormGroup align="center">
              <div className="imgPreview">{$imagePreview}</div>
            </FormGroup>
            <FormGroup>
              <FormLabel>
                <i class="fab fa-product-hunt top" />
                Name
              </FormLabel>
              <FormControl
                type="text"
                placeholder="product Title"
                name="name"
                value={this.state.name}
                onChange={this.onInputChange}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>
                <i class="fas fa-tag top" />
                Price
              </FormLabel>
              <FormControl
                type="text"
                placeholder="product Price"
                name="price"
                value={this.state.price}
                onChange={this.onInputChange}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>
                <i class="far fa-file-image top" />
                Image
              </FormLabel>
              <FormControl
                type="file"
                placeholder="product Image"
                name="thumbnail"
                onChange={this.onChangefile}
              />
            </FormGroup>
            <br />
            <Button
              variant="dark"
              type="submit"
              className="btn btn-dark btn-block"
            >
              Update Product
            </Button>
            <Button
              className="btn btn-dark btn-block"
              variant="dark"
              onClick={() => {
                this.props.history.push("/product-list");
              }}
            >
              Cancel
            </Button>
            <br />
          </form>
        </Row>
      </div>
    );
  }
}
export default Update;
