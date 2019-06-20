import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"



const Result = ({response, entity}) => {

    const clickHandler = () => {
        const payload = {token : entity}
        console.log(payload)
        axios.post('/api/reviews', payload)
        .then(response => console.log(response.data))
    }

    const homeClickHandler = () => {
        window.location.reload.bind(window.location)
    }

    if (response === "Approved") {
        return <div>
                    <text>Your application has been approved!</text>
                    <br></br>
                    <button onClick = {homeClickHandler}>Home</button>
               </div>
    } else if (response === "Denied") {
        return <div>
                    <text>Your application has been denied!</text>
                    <Link to="/">Home</Link>
               </div>
    } else if (response === "Manual Review"){
        return <div>
                    <text>Your application has been submitted for Manual Review!</text>
                    <br></br>
                    <button onClick = {clickHandler}>Check Status</button>
               </div>
    }
}

export default Result;