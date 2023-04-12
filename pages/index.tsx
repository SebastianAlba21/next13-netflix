import { NextPageContext } from "next";
import { signOut, getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  return (
    <div className="grid place-content-center gap-5 mt-64">
      <h1 className="text-4xl">Netflix clone</h1>
      <button
        className="h-10 w-[100px] bg-slate-500 rounded-full"
        onClick={() => signOut()}
      >
        Logout!
      </button>
    </div>
  );
}
