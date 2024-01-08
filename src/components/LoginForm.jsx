import { Formik, Form, useField } from 'formik';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormWrapper = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
  background-color: #dfe0e1;
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
        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
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
        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
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
  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values));
          setSubmitting(false);
        }}
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
