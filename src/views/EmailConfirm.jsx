import React, { Component } from "react";
import NavigationBar from "../components/NavigationBar";
// import Footer from '../Components/Footer'
import EmailComponent from "../components/Authentication/emailconfirm";
// import Breadcrumb from '../Components/Breadcrumb'

class Email extends Component {
  render() {
    return (
      <div className="Signin-container">
        <div className="blur-bg">
          <NavigationBar dark/>
          {/* <Breadcrumb
            PageArr={[
              { name: 'דף הבית', url: '/' },
              { name: 'התחברות', url: '/Email' },
            ]}
          /> */}
          <EmailComponent />

          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}
export default Email;
