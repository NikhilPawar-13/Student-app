import React from 'react';
import ReactDOM from 'react-dom';
import {Modal , Button} from 'react-bootstrap'
import './index.css';
import { render } from '@testing-library/react';




export default class Form extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name : '',
            email : '',
            phoneNo : '',
            street :'Not mentioned',
            suite :'Not mentioned',
            city :'SomeWhere On Earth',
            zipcode :0,
            lat:'Not mentioned',
            lng:'Not mentioned',
            cName:'Not mentioned',
            cPhrase:'Not mentioned',
            website:'Not mentioned'
        }
    }

    handleChange = (event) =>{
        if([event.target.name] == 'phoneNo'){
            if(event.target.validity.valid){
                this.setState({
                    [event.target.name] : event.target.value
                })
            }else {
                alert("Phone no is not a valid no")
                this.setState({phone : ''})
            }
        }else if([event.target.name] == 'lat' || [event.target.name] == 'lng'){
                if(event.target.validity.valid) {
                    this.setState({
                        [event.target.name] : event.target.value
                    })
                }else {
                    alert("Enter correct lat and lng")
                    this.setState({ [event.target.name]: 'Not mentioned'})}
                    
        }else {
            this.setState({
                [event.target.name] : event.target.value
            })
        }
        
    }

    addStudent = (onHide,addUser) =>{
        console.log(this.state.name);
        console.log(this.state.email);
        console.log(this.state.phoneNo);

        const lat = this.state.lat;
        const lng = this.state.lng;
        
        if(this.state.name === "" || this.state.email === "" || this.state.phoneNo === ''){
            alert("Please enter required Field")
            return;
        }
        else {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if(pattern.test(this.state.email)){
                        if(lat == "Not mentioned" && lng == "Not mentioned"){
                            let obj = {name: this.state.name,email:this.state.email,address:{street:this.state.street,suite:this.state.suite,
                            city:this.state.city,zipcode:this.state.zipcode,geo:{lat:this.state.lat,lng:this.state.lng}},phone:this.state.phoneNo,website:this.state.website,company:{name:this.state.cName,catchPhrase:this.state.cPhrase}}
                                
                            onHide();
                            addUser(obj);
                        }else {
                            if(lat <= 90 && lat >= -90 && lng <= 180 && lng >= -180){
                                let obj = {name: this.state.name,email:this.state.email,address:{street:this.state.street,suite:this.state.suite,
                                city:this.state.city,zipcode:this.state.zipcode,geo:{lat:this.state.lat,lng:this.state.lng}},phone:this.state.phoneNo,website:this.state.website,company:{name:this.state.cName,catchPhrase:this.state.cPhrase}}
                                
                                onHide();
                                addUser(obj);
                            }else {
                                alert("Enter valid lat and lng range of lat(-90 to 90) and lng(-180 to 180)");
                                return;
                        }

                       
                    }
            }
            else {
                alert("Please enter valid Email")
                return;
            }
            
            this.setState({name : ''})
            this.setState({phoneNo : ''})
            this.setState({email : ""})
            this.setState({lat : "Not mentioned"})
            this.setState({lng : 'Not mentioned'})
            this.setState({street : 'Not mentioned'})
            this.setState({suite : 'Not mentioned'})
            this.setState({city: 'SomeWhere On Earth'})
            this.setState({zipcode : 'Not mentioned'})
            this.setState({cName :'Not mentioned'})
            this.setState({cPhrase: "Not mentioned"})
            this.setState({website:"Not mentioned"}) 
        }

    
    }

    render(){
                return (
                    <>
                        <Modal
                            {...this.props}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add Student 
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <h4>Enter Information *</h4>
                            <input type = "text"  name="name" placeholder="Enter Name" onChange ={this.handleChange }></input> <span> </span>
                            <input type = "email" name='email' placeholder="Enter email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" onChange ={this.handleChange}></input><span> </span>
                            <input type = "text"  name="phoneNo" placeholder="Enter PhoneNo" pattern="[0-9-]*" value = {this.state.phoneNo} onChange ={this.handleChange}></input>
                            <h4><strong>Enter Address Details:- (optional)</strong></h4>
                            <label>Street:-</label><input type = "text" name="street" onChange ={this.handleChange}></input><span> </span>
                            <label>Suite:- </label><input type = "text" name="suite" onChange ={this.handleChange}></input><span> </span>
                            <label>City:- </label><input type = "text" name="city" onChange ={this.handleChange}></input><span> </span>
                            <br></br>
                            <label>Zipcode:- </label><input type = "text" name="zipcode" onChange ={this.handleChange}></input><span> </span>
                            <label>Lat:- </label><input type = "text" name="lat" pattern="[0-9.-]*" onChange ={this.handleChange}></input><span> </span>
                            <label>Lng:- </label><input type = "text" name="lng" pattern="[0-9.-]*" onChange ={this.handleChange}></input><span> </span>
                            <h4><strong>Enter Company Details:- (optional)</strong></h4>
                            <label>Comany Name:- </label><input type = "text" name="cName" onChange ={this.handleChange}></input><span> </span>
                            <label>Company CatchPhrase:- </label><input type = "text" name="Phrase" onChange ={this.handleChange}></input>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button onClick={this.props.onHide}>Close</Button>
                            <Button onClick={() => this.addStudent(this.props.onHide,this.props.addData)} >Submit</Button>
                            </Modal.Footer>
                        </Modal>

                    </>
                )
            }
          


}