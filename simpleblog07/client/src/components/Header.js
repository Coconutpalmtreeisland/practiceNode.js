import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/list">list</Nav.Link>
                        <Nav.Link href="/upload">upload</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/Home">Action</NavDropdown.Item>
                            <NavDropdown.Item href="/list">list</NavDropdown.Item>
                            <NavDropdown.Item href="/upload">upload</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header