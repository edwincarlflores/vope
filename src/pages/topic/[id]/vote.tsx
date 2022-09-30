import { useRouter } from "next/router";
import SwipeCard from "react-tinder-card";
import Layout from "../../../components/Layout";
import { trpc } from "../../../utils/trpc";
import { urlQueryParamToString } from "../../../utils/string";

interface ItemCardProps {
  name: string;
}

const onSwipe = (direction: string, item: string) => {
  // TODO: Add action here to track the direction of the last swiped card
  console.log("removing:", item);
  console.log("direction:", direction);
};

const onCardLeftScreen = (item: string) => {
  // TODO: Add action here to add swiped items to the list of votes to be processes
  console.log("onCardLeftScreen:", item);
};

const VotePage = () => {
  const router = useRouter();
  const topicId = urlQueryParamToString(router.query.id);

  // TODO: Shuffle the topic items rendered in the screem
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
        <div className="h-[480px] w-[90vw] max-w-[360px]">
          {topic?.items.map(({ id, name }) => (
            <ItemCard key={id} name={name} />
          ))}
        </div>
      </>
    </Layout>
  );
};

const ItemCard = ({ name }: ItemCardProps) => {
  return (
    <SwipeCard
      className="absolute"
      onSwipe={(direction) => onSwipe(direction, name)}
      onCardLeftScreen={() => onCardLeftScreen(name)}
      preventSwipe={["up", "down"]}
    >
      <div className="relative flex h-[480px] w-[80vw] max-w-[360px] items-center justify-center rounded-[20px] bg-white bg-cover bg-center shadow-lg">
        <h3 className="text-xl text-black">{name}</h3>
      </div>
    </SwipeCard>
  );
};

export default VotePage;
