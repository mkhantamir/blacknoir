import { MainLayout } from "@/projects/get6/components/MainLayout";
import { TeamList } from "@/projects/get6/components/TeamList";
import { axios } from "@/projects/get6/utils/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TeamsPage() {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/get6/team/all");
        setDatas(response.data.result.reverse());
      } catch (error: any) {
        toast.error(error.response.data.message ?? "Unknown error!");
      }
    })();
  }, []);
  return (
    <MainLayout>
      <TeamList teams={datas} />
    </MainLayout>
  );
}
