import { useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: topics, isLoading } = trpc.topics.all.useQuery();

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
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Vo<span className="text-purple-300">p</span>e
        </h1>
        <p className="mb-6 text-2xl text-gray-700">Topics</p>
        <div className="font-mono">
          {isLoading ? (
            <p>Loading..</p>
          ) : (
            <>
              {topics?.map(({ id, title, createdAt }) => (
                <TopicCard
                  key={id}
                  id={id}
                  title={title}
                  date={createdAt.toDateString()}
                />
              ))}
              <div className="mt-4 pt-0">
                <TopicCreator />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;

type TopicCardProps = {
  id: string;
  title: string;
  date: string;
};

const TopicCard = ({ id, title, date }: TopicCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{title}</h2>
      <p className="text-sm text-gray-600">{date}</p>
    </section>
  );
};

const TopicCreator = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.topics.create.useMutation({
    onSuccess: () => {
      client.topics.all.invalidate();
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });

  return (
    <input
      ref={inputRef}
      type="text"
      disabled={isLoading}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          mutate({ title: event.currentTarget.value, ownerToken: "devtoken" });
        }
      }}
      placeholder="Topic title"
      className="relative w-full rounded border-2 border-gray-500 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-400 shadow outline-none focus:outline-none focus:ring"
    />
  );
};
