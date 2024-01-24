import styled from 'styled-components';
import { Formik, Form, useField } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useAuthUser, useAuthHeader } from 'react-auth-kit';
import useAxios from 'axios-hooks';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const InsertCommentForm = ({ setComments }) => {
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const params = useParams();

  const [{ loading }, saveComment] = useAxios(
    {
      method: 'POST',
      headers: { Authorization: authHeader() },
      url: `${import.meta.env.VITE_API_URL}/comments/create`
    },
    { manual: true }
  );

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await toast.promise(
        saveComment({ data: { content: values.content, author: user().id, post: params.id } }),
        {
          loading: 'Publishing Comment...',
          success: 'Comment Published!',
          error: 'Something went wrong'
        },
        toastOptions
      );
      setComments((prevState) => [response.data.newComment, ...prevState]);

      setSubmitting(false);
      resetForm();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          content: ''
        }}
        validationSchema={Yup.object({
          content: Yup.string().required('Required')
        })}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form>
          <TextArea id="content" label="Leave your comment" name="content" type="text" placeholder="Tell us what you think" />
          <SubmitButton type="submit">{loading ? <BeatLoader color="var(--light)" size={10} loading={loading} /> : 'Publish'}</SubmitButton>
        </Form>
      </Formik>
    </>
  );
};

InsertCommentForm.propTypes = {
  setComments: PropTypes.func
};

export default InsertCommentForm;

const TextArea = ({ label, ...props }) => {
  const user = useAuthUser();

  const [field, meta] = useField(props);
  return (
    <>
      <FormGroup>
        <label htmlFor={props.id || props.name}>{label}</label>
        <Wrapper>
          <CircleLetter>{user().username.slice(0, 1).toUpperCase()}</CircleLetter>
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
  align-items: center;

  & textarea {
    flex-grow: 1;
    align-self: stretch;
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
    font-size: 1.5rem;
    resize: none;
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

const toastOptions = {
  style: {
    marginTop: '3rem',
    fontSize: '1.5rem'
  },
  success: {
    duration: 3000
  },
  error: {
    duration: 5000
  }
};
