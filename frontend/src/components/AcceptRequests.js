import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';

export class AcceptRequests extends Component {
    constructor(props) {
        super(props)

        this.onChangeRequestID = this.onChangeRequestID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.onChangeSlot1 = this.onChangeSlot1.bind(this);
        this.onChangeSlot2 = this.onChangeSlot2.bind(this);
        this.onChangeSlot3 = this.onChangeSlot3.bind(this);
        this.onChangeSlot4 = this.onChangeSlot4.bind(this);
        this.onChangeSlot5 = this.onChangeSlot5.bind(this);
        this.onSubmitReplacements = this.onSubmitReplacements.bind(this);

        this.state = {
            request_id: '',
            message: '',
            slot_1: [],
            slot_2: [],
            slot_3: [],
            slot_4: [],
            slot_5: [],
            no_rep_1: false,
            no_rep_2: false,
            no_rep_3: false,
            no_rep_4: false,
            no_rep_5: false,
            rep_1: '',
            rep_2: '',
            rep_3: '',
            rep_4: '',
            rep_5: '',
            slots: [],
            day: ''
        }
    }

    onChangeRequestID(e) {
        this.setState({
            request_id: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const request = {
            request_id: this.state.request_id
        }
        
        axios.post('http://localhost:3001/acceptRequest', request, {headers: {authorisation: localStorage.getItem('jwtToken')}})
            .then(response => {
                console.log(response.data);
                if (response.data.slots) {
                    this.setState({
                        slots: response.data.slots
                    })
                }
                if (response.data.day) {
                    this.setState({
                        day: response.data.day
                    })
                }
                if (response.data.message) {
                    this.setState({
                        message: response.data.message
                    })
                }
                let dummy = ['None']
                if (response.data['1'] && response.data['1'].length > 0) {
                    this.setState({
                        slot_1: dummy.concat(response.data['1']),
                        no_rep_1: true
                    })
                }
                if (response.data['2'] && response.data['2'].length > 0) {
                    this.setState({
                        slot_2: dummy.concat(response.data['2']),
                        no_rep_2: true
                    })
                }
                if (response.data['3'] && response.data['3'].length > 0) {
                    this.setState({
                        slot_3: dummy.concat(response.data['3']),
                        no_rep_3: true
                    })
                }
                if (response.data['4'] && response.data['4'].length > 0) {
                    this.setState({
                        slot_4: dummy.concat(response.data['4']),
                        no_rep_4: true
                    })
                }
                if (response.data['5'] && response.data['5'].length > 0) {
                    this.setState({
                        slot_5: dummy.concat(response.data['5']),
                        no_rep_5: true
                    })
                }
            }, error => {
                console.log(error);
            })

        console.log(this.state);
        this.setState({
            request_id: '',
            comment: ''
        })
    }

    onChangeSlot1(e) {
        this.setState({
            rep_1: e.target.value
        })
    }

    onChangeSlot2(e) {
        this.setState({
            rep_2: e.target.value
        })
    }

    onChangeSlot3(e) {
        this.setState({
            rep_3: e.target.value
        })
    }

    onChangeSlot4(e) {
        this.setState({
            rep_4: e.target.value
        })
    }

    onChangeSlot5(e) {
        this.setState({
            rep_5: e.target.value
        })
    }

    onSubmitReplacements(e) {
        e.preventDefault();

        const assign_rep_slots = {
            rep_1: this.state.rep_1,
            rep_2: this.state.rep_2,
            rep_3: this.state.rep_3,
            rep_4: this.state.rep_4,
            rep_5: this.state.rep_5,
            slots: this.state.slots,
            day: this.state.day
        }

        console.log(assign_rep_slots);
        axios.post('http://localhost:3001/handleAnnualRequest', assign_rep_slots, {headers: {authorisation: localStorage.getItem('jwtToken')}})
            .then(response => {
                console.log(response.data);
                if (response.data.message) {
                    this.setState({
                        message: response.data.message
                    })
                }
            }, error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className='form-loc'>
                <h3>Accept Request</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Request ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeRequestID} value={this.state.request_id} placeholder="Enter request ID" />
                        <small className="form-text text-muted">e.g. 5fe299f7eb2ac02b2f431bfb (You can view all request IDs by clicking on the Requests sidebar menu item)</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div>
                    <br />
                    <h6>{this.state.message}</h6>
                </div>
                <br />
                <div>
                    <h4 className={(this.state.no_rep_1 || this.state.no_rep_2 || this.state.no_rep_3 || this.state.no_rep_4 || this.state.no_rep_5) ? "" : "d-none"}>Pick Replacements:</h4>
                    <p className={(this.state.no_rep_1 || this.state.no_rep_2 || this.state.no_rep_3 || this.state.no_rep_4 || this.state.no_rep_5) ? "text-muted" : "d-none"}>Slots that were not displayed do not exist in the sender's schedule.</p>
                    <form className={(this.state.no_rep_1 || this.state.no_rep_2 || this.state.no_rep_3 || this.state.no_rep_4 || this.state.no_rep_5) ? "" : "d-none"} onSubmit={this.onSubmitReplacements}>
                        <div className="form-group">
                            <div className={this.state.no_rep_1 ? "" : "d-none"}>
                                <label>Slot 1 Replacement</label>
                                <select ref='userInput' className="form-control" onChange={this.onChangeSlot1}>
                                    {this.state.slot_1.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>{item}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className={this.state.no_rep_2 ? "" : "d-none"}>
                                <label>Slot 2 Replacement</label>
                                <select ref='userInput' className="form-control" onChange={this.onChangeSlot2}>
                                    {this.state.slot_2.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>{item}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className={this.state.no_rep_3 ? "" : "d-none"}>
                                <label>Slot 3 Replacement</label>
                                <select ref='userInput' className="form-control" onChange={this.onChangeSlot3}>
                                    {this.state.slot_3.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>{item}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className={this.state.no_rep_4 ? "" : "d-none"}>
                                <label>Slot 4 Replacement</label>
                                <select ref='userInput' className="form-control" onChange={this.onChangeSlot4}>
                                    {this.state.slot_4.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>{item}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className={this.state.no_rep_5 ? "" : "d-none"}>
                                <label>Slot 5 Replacement</label>
                                <select ref='userInput' className="form-control" onChange={this.onChangeSlot5}>
                                    {this.state.slot_5.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>{item}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit Replacements</button>
                    </form>
                </div>
            </div >
        )
    }
}

export default AcceptRequests