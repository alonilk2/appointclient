import { Navigate, useSearchParams } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";

function OAuth2RedirectHandler(props) {
  const [searchParams] = useSearchParams();
  let token = searchParams.get("token");
  let error = searchParams.get("error");

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    return (
      <Navigate
        to={{
          pathname: "/dashboard",
          state: { from: props.location },
        }}
      />
    );
  } else {
    return (
      <Navigate
        to={{
          pathname: "/authorization/login",
          state: {
            from: props.location,
            error: error,
          },
        }}
      />
    );
  }
}

export default OAuth2RedirectHandler;
