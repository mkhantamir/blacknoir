import { MainLayout } from "@/projects/get6/components/MainLayout";
import { MatchCreateForm } from "@/projects/get6/components/MatchCreateForm";
import { axios } from "@/projects/get6/utils/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MatchCreatePage() {
  const [teams, setTeams] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [servers, setServers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/get6/season/all");
        setSeasons(response.data.result.reverse());
        const response2 = await axios.get("/get6/team/all");
        setTeams(response2.data.result.reverse());
        const response3 = await axios.get("/rcon/server/all");
        setServers(response3.data.result.reverse());
      } catch (error: any) {
        toast.error(error.response.data?.message ?? "Unknown error!");
      }
    })();
  }, []);
  return (
    <MainLayout>
      <MatchCreateForm
        teams={teams}
        servers={servers}
        seasons={seasons}
        onSubmit={async (data) => {
          console.log(data);
          try {
            const response = await axios.post("/get6/match/create", {
              ...data,
              cvars: [],
            });
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
