import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => { //khi này Component là giá trị của component được truyền vào
  return (
    <Route
      {...rest} //đây là phần props còn lại trong component PrivateRoute trừ prop component
      component={(props) => {
        const token = window.localStorage.getItem("token");
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={`/signin`} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
//PrivateRoute là Route riêng tư. Đối với đoạn code này khi có token thì Route mới được chạy.