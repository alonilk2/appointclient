import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./index.css";

export default function NavigationBar() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav.Link href="#features">המוצר שלנו</Nav.Link>
          <Nav.Link href="#pricing">מחירים</Nav.Link>
          <h1 href="#home" className="main-title">APPoint</h1>

          <Nav.Link eventKey={2} href="#memes">
            מי אנחנו
          </Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            יצירת קשר
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
