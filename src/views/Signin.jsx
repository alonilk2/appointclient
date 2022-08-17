import NavigationBar from "../components/NavigationBar";
import SigninComponent from "../components/Authentication/signin";
import Breadcrumb from "../components/Breadcrumb";

export default function Signin() {
  return (
    <div className="signin-container">
      <div className="blur-bg">
        <NavigationBar dark />
        <Breadcrumb
          pageArr={[
            { name: "דף הבית", url: "/" },
            { name: "התחברות", url: "/signin" },
          ]}
        />
        <SigninComponent />
      </div>
    </div>
  );
}
