import { Formik, Form, useField } from 'formik';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useAxios from 'axios-hooks';
import { ClipLoader } from 'react-spinners';
import * as Yup from 'yup';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { Navigate } from 'react-router-dom';

const FormWrapper = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
  background-color: #3e3e3e;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  font-family: 'Oswald';
  letter-spacing: 1px;

  & label {
    font-size: 1.7rem;
  }

  & input {
    background-color: #fff;
    padding: 1rem 2rem;
    border: 1px solid var(--dark);
    border-radius: 0.25rem;
    color: var(--dark);
    font-family: 'Oswald';
    font-weight: 300;
    min-width: 30rem;
  }
`;

const SubmitButton = styled.button`
  font-size: 1.5rem;
  align-self: center;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  color: var(--danger);
  font-size: 1.2rem;
  font-weight: 500;
`;

const formCSS = {
  padding: '5rem',
  backgroundColor: 'var(--light)',
  border: '1px solid var(--dark)',
  borderRadius: '.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const UsernameInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <FormGroup>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input {...field} {...props} />
        {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
      </FormGroup>
    </>
  );
};
UsernameInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string
};

const PasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <FormGroup>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input {...field} {...props} />
        {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
      </FormGroup>
    </>
  );
};
PasswordInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string
};

const LoginForm = () => {
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const [{ data, loading, error }, executeLogin] = useAxios({ url: 'http://192.168.0.101:3000/api/login', method: 'POST' }, { manual: true });

  if (data) {
    signIn({
      auth: {
        token: data.token,
        type: 'Bearer'
      },
      userState: data.user
    });
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      executeLogin({ data: { username: values.username, password: values.password } });
      setSubmitting(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {isAuthenticated() && <Navigate to="/?logged" />}
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={Yup.object({
          username: Yup.string().required('Required'),
          password: Yup.string().required('Required')
        })}
        onSubmit={handleSubmit}
      >
        <FormWrapper>
          <Form style={formCSS}>
            <UsernameInput label="Username or Email" name="username" type="text" placeholder="johndoe@gmail.com" />
            <PasswordInput label="Password" name="password" type="password" />
            <SubmitButton type="submit">Log In</SubmitButton>
            <ClipLoader loading={loading} />
          </Form>
        </FormWrapper>
      </Formik>
    </>
  );
};

export default LoginForm;
