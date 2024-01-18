import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { useAuthHeader } from 'react-auth-kit';
import { toast } from 'react-hot-toast';

const CreatePostBtn = styled.button`
  font-size: 2rem;
  background-color: var(--success);
  border: 1px solid var(--light);
`;

const DeletePostBtn = styled(CreatePostBtn)`
  background-color: var(--danger);
`;
const CancelBtn = styled(CreatePostBtn)`
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

Modal.setAppElement('#root');

const StyledModal = ({ isOpen, closeModal, item, refetchPosts }) => {
  const authHeader = useAuthHeader();

  const [, executeDelete] = useAxios(
    { url: `${import.meta.env.VITE_API_URL}/posts/${item.id}`, method: 'DELETE', headers: { Authorization: authHeader() } },
    { manual: true }
  );

  const deletePost = async () => {
    try {
      await toast.promise(
        executeDelete(),
        {
          loading: 'Deleting',
          success: 'Post Deleted',
          error: 'Something went wrong'
        },
        {
          style: {
            marginTop: '3rem',
            fontSize: '1.5rem'
          },
          success: {
            duration: 3000
          },
          error: {
            duration: 5000
          },
          id: 'deleteAttempt'
        }
      );
      await refetchPosts();
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles}>
      <ModalContainer>
        <h1>Are you sure you want to delete "{item.title}?"</h1>
        <div className="actions">
          <DeletePostBtn onClick={deletePost}>Delete</DeletePostBtn>
          <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
        </div>
      </ModalContainer>
    </Modal>
  );
};

StyledModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  item: PropTypes.object,
  refetchPosts: PropTypes.func
};

export default StyledModal;
