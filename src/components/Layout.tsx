import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

type ErrorTypes = "default" | "not-found";

interface LayoutProps {
  children?: ReactNode;
  error?: boolean;
  errorType?: ErrorTypes;
  errorMessage?: string;
  loading?: boolean;
  title?: string;
}

type ContentProps = Pick<
  LayoutProps,
  "children" | "error" | "errorType" | "errorMessage" | "loading"
>;

const Layout = ({
  children,
  title,
  error,
  errorType,
  errorMessage,
  loading = false,
}: LayoutProps) => {
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
        {title && <p className="mb-6 text-3xl text-gray-700">{title}</p>}
        <div className="font-mono">
          <Content
            error={error}
            errorType={errorType}
            errorMessage={errorMessage}
            loading={loading}
          >
            {children}
          </Content>
        </div>
      </main>
    </>
  );
};

const Content = ({
  children,
  error,
  errorType,
  errorMessage,
  loading,
}: ContentProps) => {
  if (error && !loading) {
    // TODO: Create an Error component and call it here
    return (
      <p className="text-lg">
        {errorMessage ? errorMessage : "Something went wrong."}
      </p>
    );
  }

  if (loading) {
    // TODO: Create a Loader component and call it here
    return <p className="text-lg text-gray-400">Loading...</p>;
  }

  return <>{children}</>;
};

export default Layout;
