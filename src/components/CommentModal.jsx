import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { useAuthHeader } from 'react-auth-kit';

const CommentModal = ({ isOpen, closeModal, comment, setComments }) => {};

CommentModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  comment: PropTypes.object,
  setComments: PropTypes.array
};

export default CommentModal;
