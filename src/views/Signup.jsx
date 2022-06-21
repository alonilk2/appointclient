import React, { Component } from "react";
import NavigationBar from "../components/NavigationBar";
// import Footer from '../Components/Footer'
import SignupComponent from "../components/Authentication/signup";
// import Breadcrumb from '../Components/Breadcrumb'

class Signup extends Component {
  render() {
    return (
      <div className="Signup-container">
        <div className="blur-bg">
          <NavigationBar dark/>
          {/* <Breadcrumb
            PageArr={[
              { name: 'דף הבית', url: '/' },
              { name: 'התחברות', url: '/Signup' },
            ]}
          /> */}
          <SignupComponent />

          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}
export default Signup;
