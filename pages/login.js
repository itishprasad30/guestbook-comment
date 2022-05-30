import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Layout from "./components/layout";

const login = () => {
  const { data: session } = useSession();
  //  if (session) {
  //    return (
  //
  //    );
  //  }
  console.log(session);
  return (
    <Layout>
      <div>
        <h2>Login page with Github</h2>
        {!session && (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a
            href="/api/auth/signin/github"
            className="flex items-center justify-center  font-bold h-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
            onClick={(e) => {
              e.preventDefault();
              signIn("github");
            }}
          >
            Login
          </a>
        )}

        {session && <button onClick={() => signOut()}>logout</button>}
      </div>
    </Layout>
  );
};

export default login;
