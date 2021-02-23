import React from "react";
import secureAxios from "./secureAxios";
import {Button , ButtonToolbar, Table} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import Form from './Form'
import './App.css'




export default class App extends React.Component {
   
    constructor(props){
        super(props);
        this.state = {
            modalShow : false,
            fetchData: [],           
        }
    }

    addUser = (obj) => {
         secureAxios.post("/posts", obj).then((response) => {
           console.log(response);
           var temp = response.data;
            this.setState({
                fetchData : [...this.state.fetchData,{...temp,id:Math.random()}] 
            })

        //    this.setState({
        //      fetchData : [...this.state.fetchData, {id:response.data.id,name: response.data.name,email:response.data.email,address={street:response.data.address.street,suite:response.data.address.suite,city:response.data.address.city,zipcode:response.data.address.zipcode,geo={lat:response.data.address.geo.lat,lng:response.data.address.geo.lng}}}]
        //    })
           console.log(this.state.fetchData);
         });
      };

    componentDidMount() {
        secureAxios
          .get("/users")
          .then((response) => {
            console.log(response.data);
           this.setState({fetchData : response.data})
           console.log(typeof(response.data));
          })
          .catch((error) => {
            console.log("Some error", error);
          });
      }

    setModalShow = (value) =>{
        this.setState({modalShow : value})
    }

    deletItem = (id) =>{

        secureAxios.get('/posts/1')
        .then((response) => {
          this.setState({
            fetchData : this.state.fetchData.filter(item => item.id !== id)
          })
        }).catch((error) => {
          console.log("Some error", error);
        });

       
    }
  
   
    render(){
        return(
            <div className="App">
                <h1> Digikull Students </h1>
                <h2><strong>Hello Users</strong></h2>
                <button id = "button1"  onClick={() => this.setModalShow(true)}>
                Add New User
                </button>        
                <Form
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}               
                addData={this.addUser}
                />

               
                {this.state.fetchData.map((item, index) => {
                            return (
                                <div className="list" key={index} >

                                    <Table striped bordered hover variant="dark">
                                     
                                      <tbody>
                                        <tr>
                                          <td>Student Name</td>
                                          <td>{item.name}</td>                                         
                                        </tr>
                                        <tr>
                                          <td>Email Id</td>
                                          <td>{item.email}</td>
                                        </tr>
                                        <tr>
                                          <td>Address</td>
                                          <td>Steet - {item.address.street}, Suite - {item.address.suite},
                                        City -  {item.address.city}, ZipCode - {item.address.zipcode} , Latitude - {item.address.geo.lat}, 
                                        Longitude -  {item.address.geo.lng}</td>
                                        </tr>
                                        <tr>
                                          <td>Phone No</td>
                                          <td>{item.phone}</td>
                                        </tr>
                                        <tr>
                                          <td>Website</td>
                                          <td>{item.website}</td>
                                        </tr>
                                        <tr>
                                          <td>Company Name</td>
                                          <td>{item.company.name}</td>
                                        </tr>
                                        <tr>
                                          <td>Company CatchPhrase</td>
                                          <td>{item.company.catchPhrase}</td>
                                        </tr>
                                        
                                      </tbody>
                                    </Table>
                                  
                                    {/* <p> Student's name: <strong>{item.name}</strong> </p>
                                    <p> Email ID: <strong>{item.email}</strong> </p>
                                    <p> Address : <strong> Steet - {item.address.street}, Suite - {item.address.suite},
                                        City -  {item.address.city}, ZipCode - {item.address.zipcode} , Latitude - {item.address.geo.lat}, 
                                        Longitude -  {item.address.geo.lng}</strong></p>
                                    <p> Phone No: <strong>{item.phone}</strong></p>
                                    <p> Website: <strong>{item.website}</strong></p>
                                    <p><strong>Company Details</strong></p>
                                    <p> Company Name: <strong>{item.company.name}</strong></p>
                                    <p> Company CatchPhrase: <strong>{item.company.catchPhrase}</strong></p>*/}

                                    <Button variant = "danger" onClick={()=>this.deletItem(item.id)} >Delete This Item</Button>
                                    
                                </div>
                            )
                        })}
            </div>

        )
    }
  
    
  }
  
 