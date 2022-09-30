import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { urlQueryParamToString } from "../../../utils/string";

const RankingsPage = () => {
  const router = useRouter();
  const topicId = urlQueryParamToString(router.query.id);

  return (
    <Layout title="Rankings">
      <p className="text-lg">Welcome to the Rankings Page</p>
    </Layout>
  );
};

export default RankingsPage;
