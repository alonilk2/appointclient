import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./index.css";

export default function NavigationBar(props) {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <a href="#features" style={props?.dark && {color: 'black'}}>המוצר שלנו</a>
          <a href="#pricing" style={props?.dark && {color: 'black'}}>מחירים</a>
          <a href="/" ><h1 href="#home" className="main-title" style={props?.dark && {color: 'black'}}>Torgate</h1></a>

          <a href="#memes" style={props?.dark && {color: 'black'}}>
            מי אנחנו
          </a>
          <a href="#memes" style={props?.dark && {color: 'black'}}>
            יצירת קשר
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
