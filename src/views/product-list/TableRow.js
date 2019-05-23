import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBBtn } from "mdbreact";
import TableRow3 from "./view.js";
import Update from "./update.js";
import Swal from "sweetalert2";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

const BASE_URL = "http://192.168.2.107:8080/";
class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: "",
      isOpen: false
    };
  }

  componentDidMount = async () => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   this.props.history.push("/login");
    // }
    try {
      const response = await axios.get(
        "http://192.168.2.107:8080/getItem/" + this.props.obj._id
      );
      // console.log(response);
      //   console.log("response");
      //console.log(response.data.result);
      const result1 = response.data.result;

      this.setState({
        value: result1
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.message || "Unknown error"}`);
    }
  };

  onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.delete(
        "http://192.168.2.107:8080/deleteItem/" + this.props.obj._id
      );
      toast("product Deleted");
      const result = await axios.post("http://192.168.2.107:8080/getProduct");
      console.log("result");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  handleClose = e => {
    this.setState({ show: false });
  };

  handleShow = e => {
    this.setState({ show: true });
  };
  handleOpen = e => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    // console.log(this.props);
    const { value } = this.state;
    // console.log("value");
    // console.log(value);

    return (
      <tr>
        <td>{}</td>
        <td>
          <img
            src={BASE_URL + this.props.obj.thumbnail}
            width="150px"
            height="150px"
            alt={"logo"}
            onClick={this.handleOpen}
          />
          {this.state.isOpen && (
            <dialog
              className="dialog animate"
              style={{ position: "absolute" }}
              open
              onClick={this.handleOpen}
            >
              <img
                className="image1"
                src={BASE_URL + this.props.obj.thumbnail}
                onClick={this.handleOpen}
                alt="no image"
              />
            </dialog>
          )}
        </td>
        <td className="c">{this.props.obj.name}</td>
        <td>${this.props.obj.price.toFixed(2)}</td>

        <td>
          <Link to={"/gtitem/" + this.props.obj._id}>
            <OverlayTrigger
              key="top"
              placement="bottom"
              overlay={<Tooltip id="tooltip-top">Edit</Tooltip>}
            >
              <MDBBtn rounded size="lg" color="outline-warning">
                <i class="fas fa-pencil-alt top" />
              </MDBBtn>
            </OverlayTrigger>
          </Link>{" "}
          &nbsp; &nbsp;
          <OverlayTrigger
            key="top"
            placement="left"
            overlay={<Tooltip id="tooltip-top">Delete</Tooltip>}
          >
            <MDBBtn
              rounded
              size="lg"
              color="outline-danger"
              onClick={e =>
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
                }).then(result => {
                  if (result.value) {
                    Swal.fire(
                      "Deleted!",
                      "Your file has been deleted.",
                      "success"
                    ) && this.props.onDelete(this.props.obj._id);
                  }
                })
              }
              // onClick={e =>
              //   window.confirm("Are you sure you want to delete this item?") &&
              //   this.onSubmit(e)
              // }
            >
              <i class="fas fa-trash top" />
            </MDBBtn>
          </OverlayTrigger>
          &nbsp; &nbsp;
          <OverlayTrigger
            key="top"
            placement="top"
            overlay={<Tooltip id="tooltip-top">View</Tooltip>}
          >
            <MDBBtn
              rounded
              size="lg"
              color="outline-info"
              onClick={this.handleShow}
            >
              <i class="fas fa-eye top" />
            </MDBBtn>
          </OverlayTrigger>
          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            className="animate"
          >
            <Modal.Header closeButton>
              <Modal.Title>View</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>{<TableRow3 obj={value} key={value._id} />}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </td>
      </tr>
    );
  }
}
export default TableRow;
