import { Formik, Form, useField } from 'formik';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import useAxios from 'axios-hooks';
import { useAuthUser, useAuthHeader, useSignIn } from 'react-auth-kit';
import toast from 'react-hot-toast';

const UpgradeUserForm = () => {
  const user = useAuthUser();
  const authHeader = useAuthHeader();
  const signIn = useSignIn();

  const [, executeUpgrade] = useAxios(
    { url: `${import.meta.env.VITE_API_URL}/users/${user().id}/upgrade`, method: 'PATCH', headers: { Authorization: authHeader() } },
    { manual: true }
  );

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await toast.promise(executeUpgrade({ data: { key: values.key } }), {
        success: 'You are now an Author!',
        loading: 'Upgrading...',
        error: 'Something went wrong'
      });
      signIn({
        token: res.data.token,
        tokenType: 'Bearer',
        authState: res.data.user,
        expiresIn: 60
      });
      setSubmitting(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          key: ''
        }}
        validationSchema={Yup.object({
          key: Yup.string().equals(['supersecret'], 'Wrong Key!')
        })}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        <FormWrapper>
          <Form>
            <Input label="Upgrade User" name="key" type="text" placeholder="Enter the super secret upgrade key" />

            <SubmitButton type="submit">Upgrade</SubmitButton>
          </Form>
        </FormWrapper>
      </Formik>
    </>
  );
};

export default UpgradeUserForm;

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <FormGroup>
        <label htmlFor={props.id || props.name}>{label}</label>
        <div className="input">
          <input {...field} {...props} />
          {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
        </div>
      </FormGroup>
    </>
  );
};
Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string
};

const FormWrapper = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  font-family: 'Oswald';
  letter-spacing: 1px;
  align-items: start !important;

  @media (max-width: 450px) {
    & .input {
      display: flex;
      flex-direction: column;
    }
  }

  & label {
    font-size: 1.7rem;
  }

  & input {
    background-color: #fff;
    padding: 1rem 2rem;
    border: 1px solid var(--dark);
    border-radius: 1rem;
    color: var(--dark);
    font-family: 'Oswald';
    font-weight: 300;
    min-width: 30rem;
    font-size: 1.8rem;
  }
`;

const SubmitButton = styled.button`
  font-size: 1.5rem;
  align-self: center;

  background-color: var(--success);
  border: 1px solid var(--light);

  @media (max-width: 450px) {
    width: 100%;
  }
`;

const ErrorMessage = styled.div`
  color: var(--danger);
  font-size: 1.2rem;
  font-weight: 500;
  background-color: var(--light);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
`;
