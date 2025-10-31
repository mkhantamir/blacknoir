import { MainLayout } from "@/projects/get6/components/MainLayout";
import { TeamCreateForm } from "@/projects/get6/components/TeamCreateForm";
import { axios } from "@/projects/get6/utils/axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function TeamCreatePage() {
  const router = useRouter();
  return (
    <MainLayout>
      <TeamCreateForm
        onSubmit={async (data) => {
          try {
            const response = await axios.post("/get6/team/create", data);
            toast.success(response.data.message ?? "Success!");
            router.back();
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
