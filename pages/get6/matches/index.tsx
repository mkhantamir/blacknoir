import { MainLayout } from "@/projects/get6/components/MainLayout";
import { MatchList } from "@/projects/get6/components/MatchList";
import { axios } from "@/projects/get6/utils/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MatchesPage() {
  const [datas, setDatas] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/get6/match/all");
        setDatas(response.data.result.reverse());
        setCount(2);
      } catch (error: any) {
        toast.error(error.response.data.message ?? "Unknown error!");
      }
    })();
  }, []);
  useEffect(() => {
    if (count === 2) {
      (async () => {
        const copy: any = [];
        await Promise.all(
          datas.map(async (data: any) => {
            const response = await axios.get(
              `/rcon/server/${data.server_id}/get`
            );
            copy.push({ ...data, server: response.data.result });
          })
        );
        setDatas(copy);
      })();
    }
  }, [count]);
  return (
    <MainLayout>
      <MatchList matches={datas} />
    </MainLayout>
  );
}
