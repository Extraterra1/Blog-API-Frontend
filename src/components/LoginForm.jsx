import { Formik, Form, useField } from 'formik';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useAxios from 'axios-hooks';
import * as Yup from 'yup';

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
  flexDirection: 'column'
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

const handleSubmit = (values, { setSubmitting }) => {
  alert(JSON.stringify(values));
  setSubmitting(false);
};

const LoginForm = () => {
  return (
    <>
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
          </Form>
        </FormWrapper>
      </Formik>
    </>
  );
};

export default LoginForm;
