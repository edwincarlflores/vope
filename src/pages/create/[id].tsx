import { useRouter } from "next/router";
import { useRef } from "react";
import Layout from "../../components/Layout";
import { trpc } from "../../utils/trpc";

interface ItemCreatorProps {
  topicId: string;
}

interface ItemCardProps {
  id: string;
  name: string;
}

const CreateItemsPage = () => {
  const router = useRouter();
  const {
    query: { id: paramId },
  } = router;

  const topicId = !paramId || typeof paramId !== "string" ? "" : paramId;

  const {
    data: topic,
    isError,
    isLoading: isLoadingTopic,
  } = trpc.topics.topic.useQuery({ id: topicId }, { enabled: !!topicId });

  const { data: items } = trpc.items.itemsByTopicId.useQuery(
    { topicId },
    { enabled: !!topic?.id }
  );

  return (
    <Layout
      title={topic?.title}
      error={!topic?.id || isError}
      errorMessage="Invalid Topic ID"
      loading={isLoadingTopic}
    >
      <>
        {items?.map(({ id, name }) => (
          <ItemCard key={id} id={id} name={name} />
        ))}
        <ItemCreator topicId={topicId} />
      </>
    </Layout>
  );
};

const ItemCreator = ({ topicId }: ItemCreatorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.items.create.useMutation({
    onSuccess: () => {
      client.items.itemsByTopicId.invalidate({ topicId });
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });

  if (inputRef?.current) {
    inputRef.current.focus();
  }

  return (
    <input
      autoFocus
      ref={inputRef}
      type="text"
      disabled={isLoading}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          mutate({
            topicId,
            name: event.currentTarget.value,
          });
        }
      }}
      placeholder="Add item"
      className="relative w-full rounded border-2 border-gray-500 bg-white p-2.5 text-xl text-slate-600 placeholder-slate-400 shadow outline-none focus:outline-none focus:ring"
    />
  );
};

const ItemCard = ({ id, name }: ItemCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-2.5 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-xl text-gray-700">{name}</h2>
    </section>
  );
};

export default CreateItemsPage;
