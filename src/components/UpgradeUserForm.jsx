import { Formik, Form, useField } from 'formik';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const UpgradeUserForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          key: ''
        }}
        validationSchema={Yup.object({
          key: Yup.string().required('Required')
        })}
        // onSubmit={handleSubmit}
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
