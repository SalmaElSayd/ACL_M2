import React, { Component } from 'react';
import '../style/ViewStaff.css';
import axios from 'axios';

export class ViewCourseCoverage extends Component {
    constructor(props) {
        super(props)

        this.onChangeCourseID = this.onChangeCourseID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            course_id: '',
            coverage: 0
        }
    }

    onChangeCourseID(e) {
        this.setState({
            course_id: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const course = {
            course_id: this.state.course_id
        }

        axios.post('http://localhost:3001/viewCourseCoverage', course, {headers: {authorisation: localStorage.getItem('jwtToken')}})
            .then(response => {
                this.setState({
                    coverage: response.data
                })
            }, error => {
                console.log(error);
            });

    }

    render() {
        return (
            <div className='form-loc'>
                <h3>View Course Coverage By Course ID</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Course ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeCourseID} value={this.state.course_id} placeholder="Enter course ID" />
                        <small className="form-text text-muted">e.g. CSEN702</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div>
                    <br />
                    <h3>{this.state.course_id} Coverage In Percent: {this.state.coverage}</h3>
                </div>
            </div>
        )
    }
}

export default ViewCourseCoverage