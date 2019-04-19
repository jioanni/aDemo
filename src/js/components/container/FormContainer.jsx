import React, { Component } from "react";
import Input from "../presentational/Input.jsx";
import RadioInput from "../presentational/Radio.jsx";
import Result from "../presentational/Result.jsx"
import Document from "../presentational/Document.jsx"
import OutOfWallet from "./OutOfWallet.jsx"
import axios from "axios";
import Alloy from '../../../../iovation.js'



class FormContainer extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      lastName: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      dob: "",
      ssn: "",
      phone: "",
      email: "",
      document: false,
      status: null,
      response: "approve",
      blackbox: null,
      oow: null,
      eval: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

  }

  componentDidMount(){
    const alloy = new Alloy({
      services: {
        iovation: true,
      }
    });
    this.setState({blackbox: alloy.data})
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleCheckboxChange(){
    if(this.state.questions === false){
      this.setState({questions: true})
    } else {
      this.setState({questions : false})
    }
  }

  handleClick() {
    axios.post('/api', this.state)
    .then(response => {
      if(response.data.questions){
        this.setState({
                       oow: response.data.questions,
                       eval: response.data.eval_token
                      })
      }
       if (response.data === "Approved"){
            this.setState({status : "Approved"})
        } else if (response.data === "Denied"){
            this.setState({status : "Denied"})
        } else if (response.data === "Manual Review"){
            this.setState({status : "Manual Review"})
        }
    }).catch(err => (err))
  }

  handleRadioChange(event) {
    this.setState({
      response: event.target.value
    });
  }

  render() {
    const { name, lastName, address, address2, city, state, zip, dob, ssn, phone, email, oow, status } = this.state;
    
    if(status){
      return( <Result response = {this.state.status} />)
    } else if(oow){
      return( <OutOfWallet questions = {this.state.oow} eval = {this.state.eval} /> )
    } else if(this.state.response === "document"){
      return( <Document /> )
    }else {
      return( 
      <div>
        <form id="article-form">
          <Input
            text="First Name"
            label="name"
            type="text"
            id="name"
            value={name}
            handleChange={this.handleChange}
          />
          <Input
            text="Last Name"
            label="lastName"
            type="text"
            id="lastName"
            value={lastName}
            handleChange={this.handleChange}
          />
          <Input
            text="Street Address"
            label="address1"
            type="text"
            id="address"
            value={address}
            handleChange={this.handleChange}
          />
          <Input
            text="Suite/Apt. Number"
            label="address2"
            type="text"
            id="address2"
            value={address2}
            handleChange={this.handleChange}
          />
          <Input
            text="City"
            label="city"
            type="text"
            id="city"
            value={city}
            handleChange={this.handleChange}
          />
          <Input
            text="State"
            label="state"
            type="text"
            id="state"
            value={state}
            handleChange={this.handleChange}
          />
          <Input
            text="ZIP Code"
            label="zip"
            type="text"
            id="zip"
            value={zip}
            handleChange={this.handleChange}
          />
          <Input
            text="DOB"
            label="dob"
            type="text"
            id="dob"
            value={dob}
            handleChange={this.handleChange}
          />
          <Input
            text="SSN"
            label="ssn"
            type="text"
            id="ssn"
            value={ssn}
            handleChange={this.handleChange}
          />
          <Input
            text="Email Address"
            label="email"
            type="text"
            id="email"
            value={email}
            handleChange={this.handleChange}
          />
          <Input
            text="Phone Number"
            label="phone"
            type="text"
            id="phone"
            value={phone}
            handleChange={this.handleChange}
          />
        </form>
        <button onClick={this.handleClick}>Submit</button>
        
        <div id="radio-menu">
          <RadioInput
              text="Approved"
              label="approve"
              type="radio"
              id="approve"
              value="approve"
              handleChange={this.handleRadioChange}
              checked={this.state.response === "approve"}
          />
          <RadioInput
              text="Decline"
              label="decline"
              type="radio"
              id="decline"
              value="denied"
              handleChange={this.handleRadioChange}
              checked={this.state.response === "denied"}
          />
          <RadioInput
              text="Manual Review"
              label="manual"
              type="radio"
              id="manual"
              value="manual"
              handleChange={this.handleRadioChange}
              checked={this.state.response === "manual"}
          />
          <RadioInput
            text="OOW Questions"
            label="questions"
            type="radio"
            id="questions" 
            value="questions"
            handleChange={this.handleRadioChange}
            checked={this.state.response === "questions"}/>
          <RadioInput
            text="Document Upload"
            label="document"
            type="radio"
            id="document" 
            value="document"
            handleChange={this.handleRadioChange}
            checked={this.state.response === "document"}/>
        </div>
        </div>
      );
    }
  }
}


export default FormContainer;