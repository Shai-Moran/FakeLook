import {
  Container,
  Hr,
  Btn,
  Input,
  Link,
  Title,
  IconBtn
} from '../uiKit/UiKIt';
import { BsFacebook, BsGoogle } from 'react-icons/bs';
import LoginGoogle from './LoginGoogle';
import { useState } from 'react';
import loginService from '../../services/loginService';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLoginHandler = async () => {
    loginService(username, password);
  };

  return (
    <section className="login__page">
      <Container className="login__container">
        <Title className="login__title">Sign In</Title>
        <Input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        >
          Username...
        </Input>
        <Input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        >
          Password...
        </Input>
        <Btn onClick={onLoginHandler}>Login</Btn>
        <div className="login__links">
          <Link to="#">Forgot password?</Link>
          <Link to="#">Create Account</Link>
        </div>
        <Hr />
        {/* <IconBtn icon={BsFacebook} className="blue">
          Login with Facebook
        </IconBtn> */}
        <LoginGoogle />
      </Container>
    </section>
  );
};

export default Login;
