import { Hr, Btn, Input, Link, Title } from 'components/uiKit/UiKIt';
import LoginGoogle from './LoginGoogle';
import { useEffect, useState } from 'react';
import loginService from 'services/authServices/signUpService';
import { EmailValidation, PasswordValidation } from 'services/Valitations';
import Alerter from 'services/alertService/Alerter';

const SignUp = (props) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [btnClass, setBtnClass] = useState('');
  useEffect(() => {
    if (name.length > 0 && username.length > 0 && email.length > 0 && password.length > 0 && rePassword === password) setBtnClass('');
    else setBtnClass('disable');
  }, [name, username, email, password, rePassword]);

  const [check, setCheck] = useState('');
  useEffect(() => {
    if (rePassword === password) setCheck('');
    else setCheck('input__error');
  }, [password, rePassword]);

  const onLoginHandler = async () => {
    if (PasswordValidation(password) && EmailValidation(email)) {
      const result = await loginService(name, username, email, password);
      console.log(result);
      if (result) {
        // const client = new SMTPClient({
        //   user: 'nehoraiprojects@gmail.com',
        //   password: 'lzyvkhfmeiqfmldw',
        //   host: 'smtp.gmail.com',
        //   ssl: true,
        // });
        // client.send({
        //   from: 'nehoraiprojects@gmail.com',
        //   to: result.email,
        //   subject: 'Verify your email in FakeLook',
        // });
        // window.location.href = '/sign-in';
        if (result.state) props.setIndex(0);
        Alerter(result.msg);
      } else Alerter(result.msg);
    }
  };

  return (
    <form className="login__container">
      <Title className="login__title">Sign Up</Title>
      <Input
        validation={true}
        type="name"
        onChange={(value) => {
          setName(value);
        }}
      >
        Full Name...
      </Input>
      <Input
        validation={true}
        type="name"
        onChange={(value) => {
          setUsername(value);
        }}
      >
        Username...
      </Input>
      <Input
        validation={true}
        type="email"
        onChange={(value) => {
          setEmail(value);
        }}
      >
        Email...
      </Input>
      <Input
        validation={true}
        strength={true}
        type="password"
        onChange={(value) => {
          setPassword(value);
        }}
      >
        Password...
      </Input>
      <Input
        validation={true}
        className={check}
        type="password"
        onChange={(value) => {
          setRePassword(value);
        }}
      >
        Confirm Password...
      </Input>
      <Btn type="submit" onClick={onLoginHandler} className={btnClass}>
        Sign up
      </Btn>
      <Link onClick={() => props.setIndex(0)}>Already have an account - sign in</Link>
      <Hr />
      <LoginGoogle />
    </form>
  );
};

export default SignUp;
