import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

/**
 * @author
 * @function Signin
 **/

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth); //bất cứ khi nào state auth của redux store có thành phần bên trong thay đổi thì component Signin lại thực thi lại.
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)} //thuộc tính onChange quy định 1 callback có biến e là biến sự kiện, e.target.value là giá trị trong form.
              />

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)} //thuộc tính onChange đưa ra 1 callback có biến e là biến sự kiện, e.target.value là giá trị trong form.
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
