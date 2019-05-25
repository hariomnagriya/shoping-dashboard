import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Form } from 'reactstrap';
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Image } from 'react-bootstrap';
import Swal from "sweetalert2";
const BASE_URL = "http://192.168.2.107:8080/";

class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category: "",
      status: "",
      isOpen: false,
      disabled: true,
      enable: false,
      imageUpdated: false
    };
  }
  componentDidMount = async () => {
    //  const { user } = this.state;
    const response = await axios.get("http://192.168.2.107:8080/getCategory/" + this.props.match.params.id)//console.log(res.data.result);
    // console.log("result  :-", this.props.match.params.id);
    // const result = res.data.result1[0];
    // this.setState({ user: result });
    // console.log("users :-", result)
    this.setState({
      category: response.data.result1[0].category,
      status: response.data.result1[0].status,
    });
    if (!response) {
      console.log("error");
    }
  }

  onSubmit = async e => {
    e.preventDefault();

    const { category,  status } = this.state;

    const data = {
       status,
      category,
      
    };
    // const body = new FormData();
    // for (const i in data) {
    //   if (data.hasOwnProperty(i)) {
    //     const element = data[i];
    //     body.append(i, element);
    //   }
    // }

    const result = await axios.post(
      "http://192.168.2.107:8080/editCategory/" + this.props.match.params.id, data
    );
    if (result) {
      Swal.fire({
        type: "success",
        title: "Success",
        text: "Changes save!"
      });
      this.props.history.push("/cat-list");
      console.log(result);
    }
  };

  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };
//   onChangefile = e => {
//     let reader = new FileReader();
//     let file = e.target.files[0];
//     this.setState({
//       file: e.target.files[0] ? e.target.files[0] : null,
//       imageUpdated: true
//     });
//     reader.onloadend = () => {
//       this.setState({
//         file: file,
//         imagePreviewUrl: reader.result
//       });
//     };

//     reader.readAsDataURL(file);
//   };
  handleClose = e => {
    this.setState({ show: false });
  };
  handleOpen = e => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleShow = e => {
    this.setState({ show: true });
  };
  isEnable = e => {
    this.setState({ disabled: !this.state.disabled, enable: true });
  };

  render() {
    // let { imagePreviewUrl, file } = this.state;
    // let $imagePreview = (
    //   <Image src={BASE_URL + this.state.file} width="150px" height="160" align="center" roundedCircle />
    // );
    // if (imagePreviewUrl) {
    //   $imagePreview = (
    //     <Image src={imagePreviewUrl} width="150px" height="160" align="center" roundedCircle />
    //   );
    // }
    // const { user } = this.state;
    if (this.state.disabled === true) {

      return (

        <div className="animated fadeIn">
          <Row>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <strong><i className="icon-info pr-1"></i>Category id: {this.props.match.params.id}</strong>
                  <Link onClick={this.isEnable} align="right">
                    <i class="fas fa-user-edit top" style={{ paddingLeft: 110 }} />
                    Edit
</Link>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <Table responsive striped hover>
                      <tbody>
                        {/* <tr align="center">
                          <th scope="row" colSpan="2">{$imagePreview}</th>
                        </tr> */}
                        <tr>
                          <th scope="row">Name</th>
                          <th scope="row"><input type="text" name="category" value={this.state.category} disabled={this.state.disabled} onChange={this.onInputChange} /></th>
                        </tr>
                        {/* <tr>
                          <th scope="row">Email</th>
                          <th scope="row"><input type="text" name="email" value={this.state.email} disabled={this.state.disabled} onChange={this.onInputChange} /></th>
                        </tr>
                        <tr>
                          <th scope="row">Mobile</th>
                          <th scope="row"><input type="text" name="mobile_no" value={this.state.mobile_no} disabled={this.state.disabled} onChange={this.onInputChange} /></th>
                        </tr>
                        <tr>
                          <th scope="row">Gender</th>
                          <th scope="row"><input type="text" name="gender" value={this.state.gender} disabled={this.state.disabled} onChange={this.onInputChange} /></th>
                        </tr> */}
                        <tr>
                          <th scope="row">Status</th>
                          <th scope="row">
                            <select name="status" value={this.state.status} disabled={this.state.disabled} onChange={this.onInputChange}>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="Pending">Pending</option>
                              <option value="Banned">Banned</option>
                            </select></th>
                    </tr>
                          {/* <tr>
                            <th scope="row">File</th>
                            <th scope="row"><input type="file" name="file" disabled={this.state.disabled} onChange={this.onChangefile} /></th>
                          </tr> */}
                          <tr>
                            <th scope="row" colSpan="2">
                              <Button
                                variant="primary"
                                type="submit"
                                align="center"
                                disabled={this.state.disabled}
                                style={{ width: "100px", padding: "5px" }}
                              >
                                <i class="fas fa-save top" />
                                Save
</Button></th>
                          </tr>
                  </tbody>
                </Table>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

          )
          }
          if(this.state.disabled===false)
    {
      return (
        <div className="animated fadeIn">
            <Row>
              <Col lg={6}>
                <Card>
                  <CardHeader>
                    <strong><i className="icon-info pr-1"></i>Category id: {this.props.match.params.id}</strong>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <Table responsive striped hover>
                        <tbody>
                          {/* <tr align="center">
                            <th scope="row" colSpan="2">{$imagePreview}</th>
                          </tr> */}
                          <tr>
                            <th scope="row">Name</th>
                            <th scope="row"><input type="text" name="category" value={this.state.category} disabled={this.state.disabled} onChange={this.onInputChange} /></th>
                          </tr>
                          {/* <tr>
                            <th scope="row">Email</th>
                            <th scope="row"><input type="text" name="email" value={this.state.email} disabled={this.state.disabled} onChange={this.onInputChange} /></th>
                          </tr>
                          <tr>
                            <th scope="row">Mobile</th>
                            <th scope="row"><input type="text" name="mobile_no" value={this.state.mobile_no} disabled={this.state.disabled} onChange={this.onInputChange} /></th>
                          </tr>
                          <tr>
                            <th scope="row">Gender</th>
                            <th scope="row"><input type="text" name="gender" value={this.state.gender} disabled={this.state.disabled} onChange={this.onInputChange} /></th>
                          </tr> */}
                          <tr>
                            <th scope="row">Status</th>
                            <th scope="row">
                            <select name="status" value={this.state.status} disabled={this.state.disabled} onChange={this.onInputChange}>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="Pending">Pending</option>
                              <option value="Banned">Banned</option>
                            </select></th>
                          </tr>
                          {/* <tr>
                            <th scope="row">File</th>
                            <th scope="row"><input type="file" name="file" disabled={this.state.disabled} onChange={this.onChangefile} /></th>
                          </tr> */}
                          <tr>
                            <th scope="row" colSpan="2">
                              <Button
                                variant="primary"
                                type="submit"
                                align="center"
                                disabled={this.state.disabled}
                                style={{ width: "100px", padding: "5px" }}
                              >
                                <i class="fas fa-save top" />
                                Save
</Button></th>
                          </tr>
                        </tbody>
                      </Table>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>

          )
        }
      }
    }
    
    export default Category;
