import React from "react"
import { Link } from "react-router-dom"


const Result = ({response}) => {
    if (response === "Approved") {
        return <div><text>Your application has been approved!</text>
        {/*<Link to = "/"><button>Home</button></Link>*/}
        <button>Home</button> 
        </div>
    } else if (response === "Denied") {
        return <div><text>Your application has been denied!</text>
        {/*<Link to = "/"><button>Home</button></Link>*/}
        </div>
    } {/*else if (response === "")*/}

    
}

export default Result;