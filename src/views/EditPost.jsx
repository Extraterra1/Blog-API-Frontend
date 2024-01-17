import { useAuthUser } from 'react-auth-kit';
import { useLocation, Navigate } from 'react-router-dom';

import Header from '../components/Header';
import PostForm from '../components/PostForm';

const EditPost = () => {
  const user = useAuthUser();
  const { state } = useLocation();
  const post = state ? state.post : null;

  return (
    <>
      {user().role === 'user' ? <Navigate to="/user" /> : null}
      {!post ? <Navigate to="/user" /> : null}
      <Header />
      <main>
        <PostForm post={post} />
      </main>
    </>
  );
};

export default EditPost;
