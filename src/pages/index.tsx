import { useRouter } from "next/router";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: topics, isLoading } = trpc.topics.all.useQuery();

  return (
    <Layout title="Topics" loading={isLoading}>
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
          <button
            className="relative w-full rounded-full bg-purple-300 py-2 px-4 font-bold text-white hover:bg-purple-500"
            onClick={() => router.push("/create")}
          >
            Create a Topic
          </button>
        </div>
      </>
    </Layout>
  );
};

type TopicCardProps = {
  id: string;
  title: string;
  date: string;
};

const TopicCard = ({ id, title, date }: TopicCardProps) => {
  const router = useRouter();

  return (
    <section
      onClick={() => router.push(`/topic/${id}/rankings`)}
      className="flex cursor-pointer flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105"
    >
      <h2 className="text-lg text-gray-700">{title}</h2>
      <p className="text-sm text-gray-600">{date}</p>
    </section>
  );
};

export default Home;
