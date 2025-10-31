import { MainLayout } from "@/projects/get6/components/MainLayout";
import { MatchDetail } from "@/projects/get6/components/MatchDetail";
import { axios } from "@/projects/get6/utils/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MatchDetailPage() {
  const [data, setDatas] = useState<any>(null);
  const [event, setEvent] = useState<any>(null);
  const [server, setServer] = useState<any>(null);
  const params = useParams();
  useEffect(() => {
    if (params && params.id) {
      (async () => {
        try {
          const response = await axios.get(`/get6/match/${params.id}/get`);
          setDatas(response.data.result);
          const response3 = await axios.get(
            `/rcon/server/${response.data.result.server_id}/get`
          );
          setServer(response3.data.result);
          const response2 = await axios.get(
            `/get6/event/roundend/${params.id}`
          );
          setEvent(response2.data.result);
        } catch (error: any) {
          toast.error(error.response.data?.message ?? "Unknown error!");
        }
      })();
    }
  }, [params]);
  useEffect(() => {
    const ws = new WebSocket(
      "ws://homelander-production.up.railway.app/get6/event/socket/ws"
    );
    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.id) {
        const response2 = await axios.get(`/get6/event/${data.id}`);
        setEvent(response2.data.result);
      }
    };

    ws.onopen = () => console.log("Connected");
    ws.onerror = (error) => console.error("WebSocket error:", error);
  }, []);
  return (
    <MainLayout>
      {data ? (
        <MatchDetail
          match={data}
          event={event}
          server={server}
          onEndMatch={async () => {
            try {
              const response = await axios.post(
                `/get6/action/${params.id}/endmatch`
              );
              toast.success(response.data.message ?? "Success!");
            } catch (error: any) {
              toast.error(error.response.data.message ?? "Unknown error!");
            }
          }}
          onForcePause={async () => {
            try {
              const response = await axios.post(
                `/get6/action/${params.id}/forcepause`
              );
              toast.success(response.data.message ?? "Success!");
            } catch (error: any) {
              toast.error(error.response.data.message ?? "Unknown error!");
            }
          }}
          onForceStart={async () => {
            try {
              const response = await axios.post(
                `/get6/action/${params.id}/forcestart`
              );
              toast.success(response.data.message ?? "Success!");
            } catch (error: any) {
              toast.error(error.response.data.message ?? "Unknown error!");
            }
          }}
          onForceUnpause={async () => {
            try {
              const response = await axios.post(
                `/get6/action/${params.id}/forceunpause`
              );
              toast.success(response.data.message ?? "Success!");
            } catch (error: any) {
              toast.error(error.response.data.message ?? "Unknown error!");
            }
          }}
          onLoadJson={async () => {
            try {
              const response = await axios.get(
                `/get6/action/${params.id}/load`
              );
              toast.success(response.data.message ?? "Success!");
            } catch (error: any) {
              toast.error(error.response.data.message ?? "Unknown error!");
            }
          }}
        />
      ) : null}
    </MainLayout>
  );
}
