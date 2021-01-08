import 'bootstrap/dist/css/bootstrap.min.css'
import { Login, Sign , MyProfile} from '../components'
import { Link } from 'react-router-dom'
function allstaff() {
  return (
    <div className="App">
      <div className="jss100">
      <div className="jss101">
        
        </div>
        <Login/>
      <Sign />
    <MyProfile />
        </div>
    </div>
  );
}

export default allstaff;
