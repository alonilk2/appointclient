import React, { Component } from "react";
import NavigationBar from "../components/NavigationBar";
// import Footer from '../Components/Footer'
import DashboardComponent from "../components/Dashboard";
// import Breadcrumb from '../Components/Breadcrumb'

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard-container">
        <div className="blur-bg">
          <NavigationBar dark/>
          {/* <Breadcrumb
            PageArr={[
              { name: 'דף הבית', url: '/' },
              { name: 'התחברות', url: '/Dashboard' },
            ]}
          /> */}
          <DashboardComponent />

          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}
export default Dashboard;
