import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { trpc } from "../../utils/trpc";

const CreateItemsPage = () => {
  const router = useRouter();
  const {
    query: { id: paramId },
  } = router;

  const id = !paramId || typeof paramId !== "string" ? "" : paramId;

  const { data, isLoading } = trpc.topics.topic.useQuery(
    { id },
    { enabled: !!id }
  );

  if (!id) {
    return (
      <Layout title="Error">
        <div>Invalid ID</div>
      </Layout>
    );
  }

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
