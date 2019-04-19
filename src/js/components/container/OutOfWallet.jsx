/* eslint-disable react/jsx-key */
import React, { Component } from "react"
import RadioInput from "../presentational/Radio.jsx"
import Result from "../presentational/Result.jsx"
import axios from "axios"

class OutOfWallet extends Component {
    constructor() {
        super();

        this.state = {
            1 : "",
            2 : "",
            3 : "",
            4 : "",
            status : null
        };

        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleRadioChange(event) {
        this.setState({
          [event.target.id]: event.target.value
        });

      }

    handleClick() {
        axios.patch('/api', {...this.state, "eval": this.props.eval})
        .then(response => {
            if (response.data === "Approved"){
                this.setState({status : "Approved"})
            } else if (response.data === "Denied"){
                this.setState({status : "Denied"})
            } else if (response.data === "Manual Review"){
                this.setState({status : "Manual Review"})
            }
        })

    }


    render(){
        const questions = this.props.questions
        const status = this.state.status

        if(status){
            return( <Result response = {this.state.status} entity = {this.props.eval} />)
        } else {
            return(
                <div>
                {questions.map((question) => {
                    return (
                            <div>
                                {question.question} 
                                        
                                        {question.answers.map((answer) => {
                                            return(
                                                <div>
                                                    <RadioInput
                                                        text={answer.answer}
                                                        label={answer.id}
                                                        type="radio"
                                                        id={question.id}
                                                        value={answer.id}
                                                        handleChange={this.handleRadioChange}
                                                        checked={this.state[question.id] == answer.id}
                                                    />
                                                </div>
                                            )
                                    })}
                                </div>    
                            )
                        }
                    )}
                    <button onClick={this.handleClick}>Submit</button> 
                </div>
            )
        }
    }
}
        

export default OutOfWallet;