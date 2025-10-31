import { MainLayout } from "@/projects/get6/components/MainLayout";
import { ServerList } from "@/projects/get6/components/ServerList";
import { axios } from "@/projects/get6/utils/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ServersPage() {
  const [servers, setServers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/rcon/server/all");
        setServers(response.data.result.reverse());
      } catch (error: any) {
        toast.error(error.response.data.message ?? "Unknown error!");
      }
    })();
  }, []);
  return (
    <MainLayout>
      <ServerList servers={servers} />
    </MainLayout>
  );
}
