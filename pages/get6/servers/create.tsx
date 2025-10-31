import { MainLayout } from "@/projects/get6/components/MainLayout";
import { ServerCreateForm } from "@/projects/get6/components/ServerCreateForm";
import { axios } from "@/projects/get6/utils/axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function ServerCreatePage() {
  const router = useRouter();
  return (
    <MainLayout>
      <ServerCreateForm
        onSubmit={async (data) => {
          try {
            const response = await axios.post("/rcon/server/create", {
              ...data,
              port: parseInt(data.port + ""),
              status: "maintenance",
            });
            toast.success(response.data.message ?? "Success!");
          } catch (error: any) {
            toast.error(error.response.data.message ?? "Unknown error!");
          }
        }}
        onCancel={() => {
          router.back();
        }}
      />
    </MainLayout>
  );
}
