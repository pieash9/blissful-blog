import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/card/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/post/getPosts?limit=9`,
          { withCredentials: true }
        );
        if (res.data) {
          setPosts(res.data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl lg:text-6xl font-bold">
          Welcome to BLISSFUL BLOG
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Discover a world of stories and insights on our blogging platform,
          where every post is a journey into unique perspectives. Join our
          community, share your thoughts, and explore a diverse tapestry of
          topics on our engaging blogging website.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all post
        </Link>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex-col gap-8 py-7">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-center mb-7">Recent Posts</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {posts &&
              posts.length > 0 &&
              posts.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
          <Link
            to="/search"
            className="text-lg text-teal-500 hover:underline text-center"
          >
            View all post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
