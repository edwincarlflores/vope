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

  const { data: topic, isLoading: isLoadingTopic } = trpc.topics.topic.useQuery(
    { id: topicId },
    { enabled: !!topicId }
  );

  const { data: items, isLoading: itemsLoading } =
    trpc.items.itemsByTopicId.useQuery({ topicId }, { enabled: !!topic?.id });

  if (isLoadingTopic || itemsLoading) {
    return <Layout>Loading...</Layout>;
  }

  if (!topic?.id) {
    return (
      <Layout title="Error">
        <div>Invalid Topic ID</div>
      </Layout>
    );
  }

  return (
    <Layout title="Add Items">
      <>
        {items && items.length > 0 ? (
          items?.map(({ id, name }) => (
            <ItemCard key={id} id={id} name={name} />
          ))
        ) : (
          <p>No items yet</p>
        )}
        <div className="mt-4 pt-0">
          <ItemCreator topicId={topicId} />
        </div>
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

  return (
    <input
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
      placeholder="Item Name"
      className="relative w-full rounded border-2 border-gray-500 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-400 shadow outline-none focus:outline-none focus:ring"
    />
  );
};

const ItemCard = ({ id, name }: ItemCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
    </section>
  );
};

export default CreateItemsPage;
