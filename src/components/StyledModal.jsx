import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { useAuthHeader } from 'react-auth-kit';
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
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

const StyledModal = ({ isOpen, closeModal, item }) => {
  const [{ data }, deletePost] = useAxios(
    { url: `https://project-blog-api.fly.dev/api/posts/${item.id}`, method: 'DELETE', headers: { Authorization: `sds` } },
    { manual: true }
  );
  const authHeader = useAuthHeader();
  console.log(authHeader());

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles}>
      <ModalContainer>
        <h1>Are you sure you want to delete "{item.title}?"</h1>
        <div className="actions">
          <DeletePostBtn>Delete</DeletePostBtn>
          <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
        </div>
      </ModalContainer>
    </Modal>
  );
};

StyledModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  item: PropTypes.object
};

export default StyledModal;
