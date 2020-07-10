import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap'

class AppNavbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
    this.myRef = React.createRef(null)
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    return (
      <div>
        <Navbar
          nodeRef={this.myRef}
          color="dark"
          dark
          expand="sm"
          className="mb-5"
        >
          <Container>
            <NavbarBrand href="/">Shoppe Bag</NavbarBrand>

            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">Nowhere</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default AppNavbar
