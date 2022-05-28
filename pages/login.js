import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const login = () => {
  const { data: session } = useSession();
  //  if (session) {
  //    return (
  //
  //    );
  //  }
  console.log(session);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <h2>Login page with Github</h2>
      {!session && (
        // eslint-disable-next-line @next/next/no-html-link-for-pages
        <a
          href="/api/auth/signin/github"
          className="flex items-center justify-center my-4 font-bold h-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
          onClick={(e) => {
            e.preventDefault();
            signIn("github");
          }}
        >
          Login
        </a>
      )}
      {session && <button onClick={() => signOut()}>logout</button>}
      {/* {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <div className="flex flex-col ">
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>{" "}
          <div className="flex mx-auto justify-center gap-7 items-center min-h-screen">
            <div className=" rounded-full mt-9 ">
              <img
                src={session?.user?.image}
                alt="image"
                height="280"
                width="280"
              />
            </div>
            <h2 className="font-serif text-2xl ">{session?.user?.name}</h2>
            <h3 className="font-mono text-xl ">{session?.user?.email}</h3>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default login;
