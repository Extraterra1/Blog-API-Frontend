import styled from 'styled-components';
import { Formik, Form, useField } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const CommentsBox = () => {
  return (
    <>
      <Formik
        initialValues={{
          content: ''
        }}
        validationSchema={Yup.object({
          content: Yup.string().required('Required')
        })}
        // onSubmit={handleSubmit}
      >
        <Form>
          <TextArea id="content" label="Leave your comment" name="content" type="text" placeholder="Tell us what you think" />
          <SubmitButton type="submit">Publish</SubmitButton>
        </Form>
      </Formik>
    </>
  );
};

export default CommentsBox;

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <FormGroup>
        <label htmlFor={props.id || props.name}>{label}</label>
        <Wrapper>
          <CircleLetter>A</CircleLetter>
          <textarea {...field} {...props} />
        </Wrapper>
        {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
      </FormGroup>
    </>
  );
};
TextArea.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string
};

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin: 1rem 0 !important;

  & textarea {
    flex-grow: 1;
  }
`;

const CircleLetter = styled.span`
  display: grid;
  place-items: center;
  aspect-ratio: 1/1;
  font-size: 5rem;
  border-radius: 50%;
  background-color: var(--dark);
  min-width: 3ch;
  color: var(--light);

  font-family: Arial;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  font-family: 'Oswald';
  letter-spacing: 1px;
  gap: 0.5rem;

  & label {
    font-size: 1.7rem;
  }

  & input,
  & textarea {
    background-color: #fff;
    padding: 1rem 2rem;
    border: 1px solid var(--dark);
    border-radius: 0.25rem;
    color: var(--dark);
    font-family: 'Oswald';
    font-weight: 300;
    min-width: 30rem;
  }

  & > .tox {
    border: 1px solid var(--dark);
    border-radius: 0.25rem;
    color: var(--dark);
    overflow: hidden;
  }
`;

const ErrorMessage = styled.div`
  color: var(--danger);
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
`;

const SubmitButton = styled.button`
  font-size: 1.5rem;
  align-self: center;
  background-color: var(--success);
`;
