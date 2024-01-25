import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { useAuthHeader } from 'react-auth-kit';

Modal.setAppElement('#root');

const CommentModal = ({ isOpen, closeModal, comment, setComments }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles}>
      <ModalContainer>
        <h1>Edit Comment"</h1>
        <div className="actions">
          <CreateBtn onClick={closeModal}>Save</CreateBtn>
          <DeleteBtn onClick={() => console.log('xd')}>Delete</DeleteBtn>
          <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
        </div>
      </ModalContainer>
    </Modal>
  );
};

CommentModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  comment: PropTypes.object,
  setComments: PropTypes.array
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
