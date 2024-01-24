/* eslint-disable react/prop-types */
import axios from "axios";
import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/comment/create`,
        { content: comment, postId, userId: currentUser._id },
        { withCredentials: true }
      );
      if (res.data) {
        setComment("");
        setCommentError(null);
        setComments([res.data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/comment/getPostComments/${postId}`,
          { content: comment, postId, userId: currentUser._id },
          { withCredentials: true }
        );
        if (res.data) {
          setComments(res.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, []);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await axios.put(
        `${import.meta.env.VITE_URL}/comment/likeComment/${commentId}`,
        {},
        { withCredentials: true }
      );
      if (res.data) {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: res.data.likes,
                  numberOfLikes: res.data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await axios.delete(
        `${import.meta.env.VITE_URL}/comment/deleteComment/${commentId}`,
        { withCredentials: true }
      );
      if (res.data) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-300 text-xs lg:text-sm my-5">
          <p className="">Signed in as:</p>
          <img
            className="size-5 rounded-full shadow-md object-cover"
            src={currentUser.profilePicture}
            alt="user"
          />
          <Link
            className="text-xs text-cyan-500 hover:underline"
            to={`/dashboard?tab=profile`}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex gap-1 text-sm text-teal-500 my-5">
          You must be signed to comment.{" "}
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            value={comment}
            maxLength={200}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-sm dark:text-gray-300">
              {200 - comment.length} characters remaining
            </p>
            <Button type="submit" outline gradientDuoTone="purpleToBlue">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert className="mt-4" color="failure">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comment yet.</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-px px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment?._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CommentSection;
