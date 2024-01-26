import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { useAuthHeader } from 'react-auth-kit';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import he from 'he';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';

Modal.setAppElement('#root');

const CommentModal = ({ isOpen, closeModal, comment, setComments }) => {
  const authHeader = useAuthHeader();
  const [{ loading }, updateComment] = useAxios(
    {
      url: `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
      headers: { Authorization: authHeader() }
    },
    { manual: true }
  );

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await updateComment({ data: { content: values.content }, method: 'PATCH' });
      setComments((comments) => {
        return comments.map((e) => (e._id === res.data.updatedComment._id ? res.data.updatedComment : e));
      });
      toast.success('Comment Saved');
      setSubmitting(false);
      closeModal();
    } catch (err) {
      toast.error('Something went wrong');
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await updateComment({ method: 'DELETE' });
      setComments((comments) => {
        return comments.filter((e) => e._id !== res.data.deletedComment._id);
      });
      toast.success('Comment Deleted');
      closeModal();
    } catch (err) {
      toast.error('Something went wrong');
      console.log(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles}>
      <ModalContainer>
        <Formik
          initialValues={{
            content: comment.content ? he.decode(comment.content) : ''
          }}
          validationSchema={Yup.object({
            content: Yup.string().required('Required')
          })}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          <Form>
            <TextArea id="content" label="Edit Comment" name="content" type="text" placeholder="Tell us what you think" />
            <div className="actions">
              <CreateBtn type="submit">{loading ? <BeatLoader color="var(--light)" size={10} loading={loading} /> : 'Save'}</CreateBtn>
              <DeleteBtn type="button" onClick={handleDelete}>
                Delete
              </DeleteBtn>
              <CancelBtn type="button" onClick={closeModal}>
                Cancel
              </CancelBtn>
            </div>
            {/* <SubmitButton type="submit">{loading ? <BeatLoader color="var(--light)" size={10} loading={loading} /> : 'Publish'}</SubmitButton> */}
          </Form>
        </Formik>
      </ModalContainer>
    </Modal>
  );
};

CommentModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  comment: PropTypes.object,
  setComments: PropTypes.func
};

export default CommentModal;

const CreateBtn = styled.button`
  font-size: 2rem;
  background-color: var(--success);
  border: 1px solid var(--light);
`;

const DeleteBtn = styled(CreateBtn)`
  background-color: var(--danger);
`;
const CancelBtn = styled(CreateBtn)`
  background-color: var(--info);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
  & h1 {
    font-weight: 400;
  }
  & .actions {
    margin: 0 auto;
    margin-top: 5rem;
    display: flex;
    gap: 5rem;

    @media (max-width: 450px) {
      display: grid;
      grid-template-columns: 1fr 1fr;

      & button:nth-child(3) {
        grid-column: span 2;
      }
    }
  }
`;

const modalStyles = {
  overlay: {
    // opacity: '0.15'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)'
  }
};

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <FormGroup>
        <label htmlFor={props.id || props.name}>{label}</label>
        <Wrapper>
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
