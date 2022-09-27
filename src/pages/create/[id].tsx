import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { trpc } from "../../utils/trpc";

const CreateItemsPage = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  if (!id || typeof id !== "string") {
    return (
      <Layout title="Error">
        <div>Invalid ID</div>
      </Layout>
    );
  }

  const { data, isLoading } = trpc.topics.topic.useQuery({ id });

  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout title="Add Items">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  );
};

export default CreateItemsPage;
