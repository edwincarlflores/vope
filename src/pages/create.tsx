import { useRef } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";

const CreatePage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.topics.create.useMutation({
    onSuccess: (data) => {
      client.topics.all.invalidate();
      router.push(`/create/${data.id}`);
    },
  });
  return (
    <Layout title="Creaste a Topic">
      <input
        ref={inputRef}
        type="text"
        disabled={isLoading}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            mutate({
              title: event.currentTarget.value,
              ownerToken: "devtoken",
            });
          }
        }}
        placeholder="Topic title"
        className="relative w-full rounded border-2 border-gray-500 bg-white px-3 py-3 text-sm text-slate-600 placeholder-slate-400 shadow outline-none focus:outline-none focus:ring"
      />
    </Layout>
  );
};

export default CreatePage;
