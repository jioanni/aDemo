import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"



const Result = ({response, entity}) => {
    
    const clickHandler = () => {
        const payload = {token : entity}
        axios.post('/api/reviews', payload);
    }

    if (response === "Approved") {
        return <div>
                    <text>Your application has been approved!</text>

                    <Link to="/"><button>Home</button></Link>
               </div>
    } else if (response === "Denied") {
        return <div>
                    <text>Your application has been denied!</text>

               </div>
    } else if (response === "Manual Review"){
        return <div>
                    <text>Your application has been submitted for Manual Review!</text>
                    <button onClick = {clickHandler()}>Check Status</button>
               </div>
    }

    
}

export default Result;