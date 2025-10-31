import { MainLayout } from "@/projects/get6/components/MainLayout";
import { SeasonCreateForm } from "@/projects/get6/components/SeasonCreateForm";
import { axios } from "@/projects/get6/utils/axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function SeasonCreatePage() {
  const router = useRouter();
  return (
    <MainLayout>
      <SeasonCreateForm
        onSubmit={async (data) => {
          try {
            const response = await axios.post("/get6/season/create", {
              ...data,
            });
            toast.success(response.data.message ?? "Success!");
            router.back();
          } catch (error: any) {
            toast.error(error.data.message ?? "Unknown error!");
          }
        }}
        onCancel={() => {
          router.back();
        }}
      />
    </MainLayout>
  );
}
