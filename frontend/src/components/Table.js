import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      droplets: [],
      pageCount: 0,
    }
  }
  
  componentDidMount() {
    this.reload();
  }

  reload = ()=>{
    const urlParams = new URLSearchParams(this.props.location.search);
    const page  = urlParams.get('page') || 1;
    const limit = urlParams.get('limit') || 10;

    axios.get(`http://localhost:8080/api/posts?page=${page}&limit=${limit}`)
    .then((res)=>{
      this.setState({ 'droplets': res.data.posts, pageCount: res.data.pageCount })
    })
    .catch(error => {
        console.log("#error", error)
    })
  }

  componentWillReceiveProps(nextProps) {
    const urlParams = new URLSearchParams(this.props.location.search);
    const page  = urlParams.get('page') || 1;
    const nextUrlParams = new URLSearchParams(nextProps.location.search);
    const nextPage  = nextUrlParams.get('page') || 1;
    if(page != nextPage) {
      this.reload();
    }
  }

  getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  handlePageChange= (type)=>{
    const urlParams = new URLSearchParams(this.props.location.search);
    const limit = urlParams.get('limit') || 10;
    let page  = urlParams.get('page') || 1;
    if (type == 'next' && page < this.state.pageCount ) {
      page = parseInt(page) +1
    } else if(type == 'prev' && page > 1) {
      page = parseInt(page) -1
    }
    const url = `/table?page=${page}&limit=${limit}`;
    this.props.history.replace(url);
  }

  render() {
    const { droplets } = this.state;

    return (
      <div className="container">
        <div className="mb-1 mt-1 d-flex flex-row-reverse">
          <Link to="/" className="btn btn-primary ml-1">Back</Link>
          <button className="btn btn-primary" onClick={this.reload}>Reload</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th> S.N. </th> 
              <th>Id</th>
              <th>Post ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            { (droplets && droplets.length > 0) ? droplets.map( (droplet, index) => {
              return (
                <tr key={ index }>
                  <td>{ index+1 }</td>
                  <td>{ droplet.id }</td>
                  <td>{ droplet.postId }</td>
                  <td>{ droplet.name}</td>
                  <td>{ droplet.email }</td>
                  <td>{ droplet.body }</td>
                </tr>
              )
            }) : <tr><td colSpan="5">Loading...</td></tr> }
          </tbody>
        </table>
        <button onClick={()=>this.handlePageChange('prev')}>Prev</button>
        <button onClick={()=>this.handlePageChange('next')}>Next</button>
      </div>
    );
  }
}

export default Table