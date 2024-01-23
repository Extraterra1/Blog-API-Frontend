const Comments = ({ comments }) => {
  return comments.map((el) => {
    return <div key={el._id}>{el.content}</div>;
  });
};

export default Comments;
