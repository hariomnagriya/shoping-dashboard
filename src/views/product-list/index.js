import React, { Component } from "react";
import axios from "axios";
import { Table, Button, OverlayTrigger, Tooltip, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import TableRow from "./TableRow.js";
import { Link } from "react-router-dom";
import { MDBBtn, MDBIcon, Input } from "mdbreact";
import { async } from "q";
//import "./productlist.css";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      name: "",
      price: "",
      thumbnail: "",
      otherImg: "",
      namep: ""
    };
  }
  componentDidMount = async () => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   this.props.history.push("/login");
    // }

    this.getData();
  };
  getData = async () => {
    try {
      const res = await axios.get("http://192.168.2.107:8080/getProduct");
      console.log(res.data.result);
      console.log("result");
      const result = res.data.result;
      this.setState({ product: result });
      console.log(result);
      if (!result) {
        console.log("error");
      }
    } catch (error) {
      toast.error(
        `${(error.res && error.res.data && error.res.data.message[0].msg) ||
          "Unknown error"}`
      );
    }
  };
  onDelete = async productId => {
    const result = await axios.delete(
      "http://192.168.2.107:8080/deleteItem/" + productId
    );
    if (result) {
      console.log("product Deleted");
    }
    this.getData();
  };
  onSearch = async () => {
    const { namep } = this.state;
    const data = { namep };
    const result = await axios.post(
      "http://192.168.2.107:8080/searchProduct",
      data
    );
    console.log("result");

    console.log(result);
  };
  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };
  render() {
    const { product, namep } = this.state;
    return (
      <div className="f" style={{ padding: "0" }}>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
          integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
          crossorigin="anonymous"
        />
        <form onSubmit={this.onSearch}>
          <Input
            placeholder="Search for..."
            value={this.state.namep}
            name="namep"
            onChange={this.onInputChange}
            type="text"
          />
          <Button value="search" type="submit" />
        </form>

        {product.length ? (
          <>
            {/* <Row style={{ margin: "0 auto" }}> */}
            <h2 align="left" className="M">
              {" "}
              Product List
            </h2>

            <div>
              {" "}
              <Link to={"/add-product"}>
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={<Tooltip id="tooltip-top">Add new product.</Tooltip>}
                >
                  <MDBBtn
                    rounded
                    size="lg"
                    color="info"
                    style={{
                      float: "right"
                      //   top: "10px",
                      //   // bottom: "20px",
                      //   padding: "4px",
                      //   left: "900px"
                    }}
                  >
                    <i class="fas fa-plus top" />
                    Add Product
                  </MDBBtn>
                </OverlayTrigger>
              </Link>
            </div>
            <Table
              striped
              bordered
              hover
              variant="dark"
              className="table animate css-serial"
            >
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Image</th>
                  <th text-align="center">name</th>
                  <th>Price</th>
                  {/* <th>Selling Price</th> */}

                  <th colSpan="3">Action</th>
                </tr>
              </thead>
              <tbody>
                {product && product.length
                  ? product.map(product => {
                      return (
                        <TableRow
                          obj={product}
                          key={product._id}
                          onDelete={this.onDelete}
                        />
                      );
                    })
                  : null}
              </tbody>
            </Table>
            {/* </Row> */}
          </>
        ) : (
          <>
            <form onSubmit={this.onSearch}>
              <Input
                placeholder="Search for..."
                value={this.state.query}
                name="query"
                onChange={this.onInputChange}
                type="text"
              />
              <Button value="search" type="submit" />
            </form>
            <h2 align="center" className="M">
              {" "}
              Product List
            </h2>

            <Table
              striped
              bordered
              hover
              variant="dark"
              className="animate css-serial"
            >
              <thead>
                <tr>
                  <th text-align="center">S.No.</th>
                  <th text-align="center">Image</th>
                  <th text-align="center">name</th>
                  <th text-align="center">Price</th>
                  {/* <th text-align="center">Selling Price</th> */}

                  <th
                    // text-align="center"
                    colSpan="3"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {product && product.length
                  ? product.map(product => {
                      return (
                        <TableRow
                          obj={product}
                          key={product._id}
                          onDelete={this.onDelete}
                        />
                      );
                    })
                  : null}
              </tbody>
            </Table>
            <div style={{ margin: "0 auto" }}>
              <MDBIcon icon="ban" className="icons bans e" align="center" />
              <h5 text align="center" padding-left="40px">
                Currently there are no Product details added.
              </h5>
              <p text align="center" padding-left="40px">
                {" "}
                Please click below button to add new.!
              </p>
              <Link to={"/add-product"}>
                {" "}
                <div>
                  <OverlayTrigger
                    key="top"
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip-top">Add new product.</Tooltip>
                    }
                  >
                    <Link to={"/add-product"}>
                      <Button className="flax-center">
                        {" "}
                        <i class="fas fa-plus top" />
                        Add New
                      </Button>
                    </Link>
                  </OverlayTrigger>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default ProductList;
