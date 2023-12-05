import React from 'react'
import { Link } from 'react-router-dom'

const Heading = () => {
    return (
        <div>
            <div>Hello React</div>
            <Link to="/">Home</Link>
            <Link to="/upload">upload</Link>
            <Link to="/list">list</Link>
        </div>
    )
}

export default Heading