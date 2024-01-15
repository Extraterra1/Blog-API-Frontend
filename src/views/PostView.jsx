import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAxios from 'axios-hooks';

import Header from '../components/Header';

const validatePostId = (value) => {
  const regex = /^[a-fA-F0-9]{24}$/;

  if (value !== '' && typeof value === 'string') {
    const result = value.match(regex);
    return result?.length > 0;
  }
  return false;
};

const PostView = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [{ data, loading, error }, fetchPost] = useAxios({ url: `${import.meta.env.VITE_API_URL}/posts/${params.id}`, method: 'GET' }, { manual: false });
  console.log(data);

  useEffect(() => {
    if (!validatePostId(params.id)) return navigate('/');
  });

  return (
    <>
      <Header />
      <main />
    </>
  );
};

export default PostView;
