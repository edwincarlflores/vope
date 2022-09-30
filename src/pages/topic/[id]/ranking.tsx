import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { trpc } from "../../../utils/trpc";
import { urlQueryParamToString } from "../../../utils/string";

interface ItemCardProps {
  name: string;
}

const RankingPage = () => {
  const router = useRouter();
  const topicId = urlQueryParamToString(router.query.id);

  const {
    data: topic,
    isError,
    isLoading,
  } = trpc.topics.topic.useQuery({ id: topicId }, { enabled: !!topicId });

  return (
    <Layout
      title={topic?.title}
      error={!topic?.id || isError}
      errorMessage="Invalid Topic ID"
      loading={isLoading}
    >
      <>
        <p className="pb-4 text-xl">Ranking</p>
        {topic?.items.map(({ id, name }) => (
          <ItemCard key={id} name={name} />
        ))}
        <div className="mt-4 pt-0">
          <button className="relative w-full rounded-full bg-purple-300 py-2 px-4 font-bold text-white hover:bg-purple-500">
            Vote
          </button>
        </div>
      </>
    </Layout>
  );
};

const ItemCard = ({ name }: ItemCardProps) => {
  return (
    <section className="flex w-full min-w-[300px] flex-col justify-center rounded border-2 border-gray-500 p-2.5 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-xl text-gray-700">{name}</h2>
    </section>
  );
};

export default RankingPage;
