/* eslint-disable react/prop-types */
import axios from "axios";
import { Alert, Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);

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
      }
    } catch (error) {
      setCommentError(error.message);
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
    </div>
  );
};

export default CommentSection;
