import React, { Component } from 'react';
import axios from 'axios';
import '../style/table.css';

export class viewReceivedReplacementRequest extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            requests: []
        }

        axios.put('http://localhost:3001/academicMember/viewReceivedReplacementRequest',{} ,{headers:{authorisation:localStorage.getItem('jwtToken')}})
            .then(response => {
                console.log(response.data)
                if (response.data.requests.length > 0) {
                    this.setState({
                        requests: response.data.requests,
                        message: response.data.error


                    })
                }
                if (!response.data.requests.length) {
                    this.setState({
                        requests: [response.data.requests],
                        message: response.data.error
                    })
                }
            }, error => {
                console.log(error);
            });
    }  
     
    render() {
       
        return (
            <div className='table-loc'>
                <h3> Received Replacement Request:</h3>
                    <table className='table-hover'>
                        <thead>
                            <tr>
                            <th>Request ID</th>
                                <th>Sending Staff ID</th>
                                <th>Receiving Staff ID</th>
                                <th>Type</th>
                                <th>Request Date</th>
                                <th>Date Sent</th>
                                <th>Status </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.requests.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item['_id']}</td>
                                        <td>{item['sending_staff']}</td>
                                        <td>{item['receiving_staff']}</td>
                                        <td>{item['request_type']}</td>
                                        <td>{item['request_date']}</td>
                                        <td>{item['date_sent']}</td>
                                        <td>{item['status']}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div>
                    <br />
                    <h3>{this.state.message}</h3>
                </div>
            </div>
        )
    }
}

export default viewReceivedReplacementRequest


/*
import React from 'react';

function viewReceivedReplacementRequest() {
  return (
    <div className='viewReceivedReplacementRequest'>
      <h1>viewReceivedReplacementRequest</h1>
    </div>
  );
}

export default viewReceivedReplacementRequest;
*/