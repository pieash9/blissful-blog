import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/comment/CommentSection";
import PostCard from "../components/card/PostCard";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState();
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/post/getPosts?slug=${postSlug}`
        );
        if (!res.data) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.data) {
          setPost(res.data.posts[0]);
          setError(false);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      (async function () {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/post/getPosts?limit=3`
        );

        if (res.data) {
          setRecentPosts(res.data.posts);
        }
      })();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  if (error) return <div>Something went wrong.</div>;
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:max-w-4xl">
        {post && post.title}
      </h1>
      <Link
        className="self-center mt-5"
        to={`/search?category=${post && post.category}`}
      >
        <Button color="gray" size="md" pill>
          {post && post.category}
        </Button>
      </Link>
      <img
        className="mt-10 p-3 max-h-[37.5rem] rounded w-full object-cover"
        src={post && post.image}
        alt={post && post.title}
      />
      <div className="flex justify-between p-3 border-b border-slate-400 mx-auto w-full max-w-2xl text-xs lg:text-sm">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      <CommentSection postId={post._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5 font-semibold">Recent Articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
};

export default PostPage;
