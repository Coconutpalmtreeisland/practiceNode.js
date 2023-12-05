import React from 'react'
import { Link } from 'react-router-dom'

const Heading = () => {
    return (
        <div>
            <h1>Hello React</h1>
            <Link to="/">Home</Link>
            <Link to="/upload">upload</Link>
            <Link to="/list">List</Link>
        </div>
    )
}

export default Heading
