import { MainLayout } from "@/projects/get6/components/MainLayout";
import { SeasonList } from "@/projects/get6/components/SeasonList";
import { axios } from "@/projects/get6/utils/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SeasonsPage() {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/get6/season/all");
        setDatas(response.data.result.reverse());
      } catch (error: any) {
        toast.error(error.response.data.message ?? "Unknown error!");
      }
    })();
  }, []);
  return (
    <MainLayout>
      <SeasonList seasons={datas} />
    </MainLayout>
  );
}
