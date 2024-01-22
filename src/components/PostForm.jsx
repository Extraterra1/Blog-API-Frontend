import styled from 'styled-components';
import { Formik, Form, useField } from 'formik';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import * as Yup from 'yup';
import useAxios from 'axios-hooks';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import he from 'he';

const PostForm = ({ post }) => {
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const navigate = useNavigate();

  const [, submitPost] = useAxios({ method: 'POST', headers: { Authorization: authHeader() } }, { manual: true });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (!post) {
        const response = await toast.promise(
          submitPost({
            data: { title: values.title, content: values.content, author: user().id, imgUrl: values.imgUrl },
            url: `${import.meta.env.VITE_API_URL}/posts/create`
          }),
          {
            loading: 'Submitting Post...',
            success: 'Post Created! Redirecting...',
            error: 'Something went wrong'
          },
          toastOptions
        );
        setSubmitting(false);
        return navigate(`/posts/${response.data.newPost._id}`);
      }

      await toast.promise(
        submitPost({
          data: { title: values.title, content: values.content, author: user().id, imgUrl: values.imgUrl },
          url: `${import.meta.env.VITE_API_URL}/posts/${post._id}`,
          method: 'PATCH'
        }),
        {
          loading: 'Editing Post...',
          success: 'Post Edited! Redirecting...',
          error: 'Something went wrong'
        },
        toastOptions
      );
      setSubmitting(false);
      navigate(`/posts/${post._id}`);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          title: post ? he.decode(post.title) : '',
          imgUrl: post ? post.imgUrl : '',
          content: ''
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Required'),
          imgUrl: Yup.string().required('Required').matches(imgRegex, 'Please enter a valid image URL'),
          content: Yup.string().required('Required').min(30, 'Post body must be at least 30 characters long.')
        })}
        onSubmit={handleSubmit}
      >
        <FormWrapper>
          <Form style={formCSS}>
            <Title>{post ? 'Edit Post' : 'Create Post'}</Title>
            <Input label="Title" name="title" type="text" placeholder="Post Title" />
            <Input label="Image URL" name="imgUrl" type="text" placeholder="http://images.com/img.jpg" />
            <TextEditor content={post ? post.content : null} name="content" />
            <SubmitButton type="submit">Submit</SubmitButton>
          </Form>
        </FormWrapper>
      </Formik>
    </>
  );
};

PostForm.propTypes = {
  post: PropTypes.object
};

export default PostForm;

const Input = ({ label, ...props }) => {
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
Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string
};

const TextEditor = ({ content, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const handleEditorChange = (content, editor) => {
    helpers.setValue(content);
  };

  return (
    <>
      <FormGroup>
        <Editor
          {...props}
          apiKey="2aaj0ah7mdeeesd67rg16c6jbgqqeogypmpm52umpfi98r0d"
          value={field.value}
          onInit={(evt, editor) => (content ? editor.setContent(he.decode(content)) : null)}
          init={{
            height: 500,
            menubar: false,
            toolbar:
              'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}'
          }}
          onEditorChange={handleEditorChange}
        />
        {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
      </FormGroup>
    </>
  );
};

TextEditor.propTypes = {
  content: PropTypes.string
};

const formCSS = {
  padding: '5rem',
  backgroundColor: 'var(--light)',
  border: '1px solid var(--dark)',
  borderRadius: '.5rem',
  display: 'flex',
  flexDirection: 'column',
  minWidth: '70%'
};

const FormWrapper = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
  background-color: #3e3e3e;
  padding: 3rem;
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
`;

const SubmitButton = styled.button`
  font-size: 1.5rem;
  align-self: center;
  margin-top: 2rem;
  background-color: var(--success);
`;

const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const imgRegex =
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

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
