import React from 'react';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

// import { DataGrid } from '@material-ui/data-grid';
   
class Notification extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        requests: [],
        message:''
    }

    
 this.handleChange=this.handleChange.bind(this)

  }

  componentDidMount(){
    axios.get('http://localhost:3001/academicMember/notifications',{headers:{authorisation:localStorage.getItem('jwtToken')}})
          .then(response => {
              console.log(response.data.requests)
              if (response.data.requests) {
                  this.setState({
                    requests: response.data.requests,
                    message:response.data.error
                  })
              }
              if (!response.data) {

                  this.setState({
                      requests: [response.data.requests],
                      message:response.data.error

                  })
              }
          
              console.log(this.state.requests)

            }, error => {
              console.log(error);
          });
        }
handleChange(reqid){ 
  console.log(reqid)
  axios.post('http://localhost:3001/academicMember/setNotificationSeen',{id:reqid},{headers:{authorisation:localStorage.getItem('jwtToken')}})
.then(response => {
   console.log(response)
}, error => {
    console.log(error);
});
}
  render() {
      
    return (
        
        <div className='table-loc'>
            <h3>Notifications</h3>
                <table className='table-hover'>
                    <thead>
                        <tr>
                        <th>Seen</th>
                        <th>Request ID</th>
                            <th>Sending Staff ID</th>
                            <th>Receiving Staff ID</th>
                            <th>Type</th>
                            <th>Request Date</th>
                            <th>Date Sent</th>
                            <th>Status </th>
                            <th>Date Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.requests.map((item, index) => {
                            return (
                                <tr key={index}>
                               <td> <input type="checkbox" 
            checked={item['seen']} 
            onChange={()=> this.handleChange(item['_id'])}/></td>
                                    <td>{item['_id']}</td>
                                    <td>{item['sending_staff']}</td>
                                    <td>{item['receiving_staff']}</td>
                                    <td>{item['request_type']}</td>
                                    <td>{item['request_date']}</td>
                                    <td>{item['date_sent']}</td>
                                    <td>{item['status']}</td>
                                    <td>{item['date_modified']}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
        </div>
    )
}
}
 
export default Notification;

/*
import React from 'react';
import '../style/Notify.css';

function Notifications() {
  return (
    <div className='notification'>
      <h1>Notification</h1>
      <a href="#" class="notification">
  <span>Inbox</span>
  <span class="badge">3</span>
</a>

    </div>
  );
}

export default Notifications;
*/

