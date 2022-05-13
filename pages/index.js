import { useState } from "react";
import pantek from "../pages/api/pantek.json";

export default function Home({ posts: initialPosts }) {
  const [start, setStart] = useState(5);
  const [posts, setPost] = useState(initialPosts);

  async function loadMore() {
    const req = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=5`
    );
    const newPosts = await req.json();
    setPost([...posts, ...newPosts]);
    setStart(start + 5);
  }

  console.log(pantek);
  return (
    <div className="flex flex-col items-center justify-start bg-gray-100 min-h-screen p-20">
      <div className="w-8/12 mx-auto space-y-8 text-center">
        {posts.map(({ id, title, body }) => (
          <article className="p-8 bg-white text-left" key={id}>
            <a
              href="#"
              className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >
              {title}
            </a>
            <p className="mt-2 text-gray-500">{body}</p>
          </article>
        ))}

        <button
          className="border-2 px-4 py-2 rounded hover:bg-white hover:border-transparent"
          onClick={loadMore}
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const req = await fetch("pantek.json");
  const posts = await req.json();

  return {
    props: {
      posts,
    },
  };
}
