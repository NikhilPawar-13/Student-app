import React from "react";
import secureAxios from "./secureAxios";
import {Button , ButtonToolbar} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import Form from './Form'



export default class App extends React.Component {
   // const [modalShow, setModalShow] = React.useState(false);
    constructor(props){
        super(props);
        this.state = {
            modalShow : false,
            fetchData: []
        }
    }

    addUser = (obj) => {
         secureAxios.post("/posts", obj).then((response) => {
           console.log(response);
            this.setState({
                fetchData : [...this.state.fetchData,response.data]
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

    }
  
    editItem = (id) => {
  
    }
    render(){
        return(
            <>
                <h1> Digikull Students </h1>
                <h2>Hello Users</h2>
                <Button variant="primary" onClick={() => this.setModalShow(true)}>
                Add User
                </Button>        
                <Form
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                addData={this.addUser}
                />

                <br></br>
                {this.state.fetchData.map((item, index) => {
                            return (
                                <div key={index} >
                                    <p> Student's name: <strong>{item.name}</strong> </p>
                                    <p> Email ID: <strong>{item.email}</strong> </p>
                                    <p> Address : <strong> Steet - {item.address.street}, Suite - {item.address.suite},
                                        City -  {item.address.city}, ZipCode - {item.address.zipcode} , Latitude - {item.address.geo.lat}, 
                                        Longitude -  {item.address.geo.lng}</strong></p>
                                    <p> Phone No: <strong>{item.phone}</strong></p>
                                    <p> Website: <strong>{item.website}</strong></p>
                                    <p><strong>Company Details</strong></p>
                                    <p> Company Name: <strong>{item.company.name}</strong></p>
                                    <p> Company CatchPhrase: <strong>{item.company.catchPhrase}</strong></p>

                                    <Button variant = "danger" onClick={()=>this.deletItem(item.id)} >Delete This Item</Button>
                                    
                                    <Button variant = "secondary" onClick={()=>this.editItem(item.id)}>Edit This Item</Button>
                                </div>
                            )
                        })}
            </>

        )
    }
  
    
  }
  
 