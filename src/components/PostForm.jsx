import styled from 'styled-components';
import { useRef } from 'react';
import { Formik, Form, useField } from 'formik';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

const PostForm = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          title: '',
          imgUrl: '',
          content: ''
        }}
        onSubmit={handleSubmit}
      >
        <FormWrapper>
          <Form style={formCSS}>
            <Input label="Title" name="title" type="text" placeholder="Post Title" />
            <Input label="Image URL" name="imgUrl" type="text" placeholder="http://images.com/img.jpg" />
            <TextEditor name="content" />
            <SubmitButton type="submit">Submit</SubmitButton>
          </Form>
        </FormWrapper>
      </Formik>
    </>
  );
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

const TextEditor = ({ ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleEditorChange = (content, editor) => {
    helpers.setValue(content);
  };
  const editorRef = useRef(null);

  return (
    <>
      <FormGroup>
        <Editor
          {...props}
          apiKey="2aaj0ah7mdeeesd67rg16c6jbgqqeogypmpm52umpfi98r0d"
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={field.value}
          init={{
            height: 500,
            menubar: false,
            toolbar:
              'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
          onEditorChange={handleEditorChange}
        />
        {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
      </FormGroup>
    </>
  );
};
TextEditor.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  ref: PropTypes.any
};

const formCSS = {
  padding: '5rem',
  backgroundColor: 'var(--light)',
  border: '1px solid var(--dark)',
  borderRadius: '.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

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

const ErrorMessage = styled.div`
  color: var(--danger);
  font-size: 1.2rem;
  font-weight: 500;
`;

const SubmitButton = styled.button`
  font-size: 1.5rem;
  align-self: center;
  margin-top: 2rem;
`;
