import React, { Component } from "react";
import NavigationBar from "../components/NavigationBar";
// import Footer from '../Components/Footer'
import SigninComponent from "../components/Authentication/signin";
// import Breadcrumb from '../Components/Breadcrumb'

class Signin extends Component {
  render() {
    return (
      <div className="signin-container">
        <div className="blur-bg">
          <NavigationBar dark/>
          {/* <Breadcrumb
            PageArr={[
              { name: 'דף הבית', url: '/' },
              { name: 'התחברות', url: '/signin' },
            ]}
          /> */}
          <SigninComponent />

          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}
export default Signin;
