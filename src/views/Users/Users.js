import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Image, Button, FormControl, FormGroup, Form, Pagination } from 'react-bootstrap';
import Swal from 'sweetalert2'
import axios from "axios";
const BASE_URL = "http://192.168.2.107:8080/";
//import usersData from './UsersData'

class UserRow extends Component {
  //const user = props.user
  //const userLink = `/users/${user._id}`

  getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'danger ' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'secondary' :
            'primary'
  }
  onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        "http://192.168.2.107:8080/deleteUser/" + this.props.obj._id
      );
      this.props.history.push("/users");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log("indexxxx", this.props.index);
    console.log("skippppp", this.props.skip);

    return (

      <>
        {/* key={user._id.toString()} */}
        <tr >
          <th scope="row"><Link to={"/users/" + this.props.user._id}>{this.props.index + this.props.skip + 1}</Link></th>
          <th><Image src={BASE_URL + this.props.user.file} width="80px" height="80px" /></th>
          <td><Link to={"/users/" + this.props.user._id}>{this.props.user.name}</Link></td>
          <td>{this.props.user.email}</td>
          <td>{this.props.user.mobile_no}</td>
          <td>{this.props.user.gender}</td>
          <td><Link to={"/users/" + this.props.user._id}><Badge color={this.getBadge(this.props.user.status)}>{this.props.user.status}</Badge></Link></td>
          <td>{this.props.user.createTime}</td>
          <td>{this.props.user.lastLogin}</td>
          <td colSpan="2">
            <Link to={"/users/" + this.props.user._id}>
              <Button variant="outline-primary"><i class="fas fa-edit"></i></Button>
            </Link>&nbsp;&nbsp;
        <Button variant="outline-danger"
              onClick={e =>
                Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to delete this!",
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.value) {
                    Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    ) && this.props.onDelete(this.props.obj._id)
                  }
                })

              }
            ><i class="fas fa-trash-alt"></i></Button>
          </td>
        </tr>
      </>
    )
  }
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [], name: "", order: "", status: "", currentPage: 1,
      totalPageRec: 0,
      pageLimit: 1,
      skip: 0
    }
  }
  componentDidMount = async () => {
    this.getData();
  }

  getData = async () => {
    const { currentPage, pageLimit } = this.state;
    const skip = (currentPage - 1) * pageLimit;
    const limit = pageLimit;
    const obj = { skip, limit };
    const res = await axios.post("http://192.168.2.107:8080/showUser1");
    var count = res.data.result
    if (count % 2 != 0) {
      count = count + 1;
    }
    this.setState({ totalPageRec: count });
    const response = await axios.post("http://192.168.2.107:8080/getuser", obj);

    const result = response.data.result1;
    this.setState({ user: result, skip });
    if (!result) {
      console.log("error");
    }
  }
  onDelete = async productId => {

    try {
      const response = await axios.delete(
        "http://192.168.2.107:8080/deleteUser/" + productId)
    } catch (error) {
      console.log(error);
    }
    this.getData();
  }

  handlePageChange = (page, e) => {
    this.setState({
      currentPage: page
    });
  };

  getPaginator = () => {
    const { currentPage, totalPageRec, pageLimit } = this.state;
    let active = currentPage;
    let items = [];
    let totalPages = Math.floor(totalPageRec / pageLimit);
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active} onClick={() => this.onPageChange(number)}>
          {number}
        </Pagination.Item>
      );
    }

    const paginationBasic = (
      <div>
        <Pagination size="sm">{items}</Pagination>
      </div>
    );

    return paginationBasic;
  };

  onPageChange = async pageNumber => {
    console.log("Page number :-", pageNumber);
    this.setState({ currentPage: pageNumber }, this.getData);
    // console.log("pagination data: ", res);

  };




  onSubmit = async e => {
    e.preventDefault();
    this.setState({ user: "" });
    const { name, order, status } = this.state;

    const data = { name, order, status };

    const response = await axios.post(
      "http://192.168.2.107:8080/getUserByName", data
    );
    if (response) {
      this.setState({ name: "", order: "", status:"" });
      const result = response.data.result1;
      this.setState({ user: result });
    }
  };

  // onSearch = async e => {
  //   e.preventDefault();
  //   this.setState({ user: "" });
  //   const { order } = this.state;

  //   const data = { order };

  //   const response = await axios.post(
  //     "http://192.168.2.107:8080/getUserByOrder", data
  //   );
  //   if (response) {
  //     const result = response.data.result;
  //     this.setState({ user: result });
  //   }
  // };

  onInputChange = e => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };



  render() {

    const { user, name, order, currentPage, skip ,status} = this.state;
    console.log("userssss  ", user);

    // const userList = usersData.filter((user) => user.id < 10)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <FormGroup inline>
                  <Form onSubmit={this.onSubmit} inline>
                    <i className="fa fa-align-justify"></i>&nbsp;&nbsp;<Link onClick={this.getData} > Users List </Link>&nbsp;&nbsp;
                    <FormControl type="text" name="name" placeholder="search by name" value={name} onChange={this.onInputChange} className="mr-sm-2" />
                    &nbsp;
                    <FormControl as="select" name="order" value={order} onChange={this.onInputChange} className="mr-sm-2" >
                      <option value={null}>---Name---</option>
                      <option value="assending" >Order By Name A to Z</option>
                      <option value="desending" >Order By Name Z to A</option>
                    </FormControl>&nbsp;
                    <FormControl as="select" name="status" value={status} onChange={this.onInputChange} className="mr-sm-2" >
                      <option value={null}>---Status---</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                      <option value="Banned">Banned</option>
                    </FormControl>
                    &nbsp;
                    <Button
                      variant="outline-primary"
                      type="submit"
                    // style={{ width: "100px", padding: "5px" }}
                    >
                      <i class="fas fa-search"></i>
                      Search
                    </Button>
                    &nbsp;&nbsp;
                    <i class="fa fa-refresh" aria-hidden="true" onClick={this.getData}></i>

                  </Form>

                </FormGroup>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead >
                    <tr >
                      <th scope="col">S.No.</th>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Status</th>
                      <th scope="col">create Time</th>
                      <th scope="col">Last Login</th>
                      <th scope="col" colSpan="2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>

                    {user && user.length ? user.map((user, index) =>
                      <UserRow obj={user} key={user._id} user={user} index={index} skip={this.state.skip} onDelete={this.onDelete} />)
                      : null}


                  </tbody>
                </Table>
              </CardBody>
              <CardHeader>
                <div style={{ marginLeft: "40%", marginTop: "3%" }}>
                  {
                    this.getPaginator()
                  }
                </div>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
