import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Vope</title>
        <meta
          name="description"
          content="Vote nope or dope on different items under a specific topic then see the rankings per topic"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1
          onClick={() => router.push("/")}
          className="cursor-pointer text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]"
        >
          Vo<span className="text-purple-300">p</span>e
        </h1>
        {title && <p className="mb-6 text-2xl text-gray-700">{title}</p>}
        <div className="font-mono">{children}</div>
      </main>
    </>
  );
};

export default Layout;