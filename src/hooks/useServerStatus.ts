"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export type ServerStatus = {
  label: string;
  name: string;
  map: string;
  players: number;
  maxPlayers: number;
  online: boolean;
  loading: boolean;
  error: boolean;
};

type RawStatus = Omit<ServerStatus, "label">;

const DEFAULT: RawStatus = {
  name: "",
  map: "",
  players: 0,
  maxPlayers: 0,
  online: false,
  loading: true,
  error: false,
};

async function fetchByIp(ip: string): Promise<RawStatus> {
  const url = `https://api.battlemetrics.com/servers?filter[game]=arksa&filter[search]=${ip}&fields[server]=name,players,maxPlayers,status,details&page[size]=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`BM ${res.status}`);
  const json = await res.json();
  const server = json?.data?.[0];
  if (!server) throw new Error("not found");
  const attr = server.attributes;
  return {
    name: attr.name ?? "",
    map: attr.details?.map ?? "",
    players: attr.players ?? 0,
    maxPlayers: attr.maxPlayers ?? 0,
    online: attr.status === "online",
    loading: false,
    error: false,
  };
}

async function fetchById(id: string): Promise<RawStatus> {
  const url = `https://api.battlemetrics.com/servers/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`BM ${res.status}`);
  const json = await res.json();
  const attr = json?.data?.attributes;
  if (!attr) throw new Error("no attr");
  return {
    name: attr.name ?? "",
    map: attr.details?.map ?? "",
    players: attr.players ?? 0,
    maxPlayers: attr.maxPlayers ?? 0,
    online: attr.status === "online",
    loading: false,
    error: false,
  };
}

type ServerConfig = { ip?: string; bmId?: string; label: string; rotative?: boolean };

export function useServerStatus(servers: ServerConfig[], refreshMs = 120_000) {
  const [statuses, setStatuses] = useState<ServerStatus[]>(
    servers.map((s) => ({ ...DEFAULT, label: s.label }))
  );

  // Track the last known map for rotative servers to detect map changes
  const prevMapsRef = useRef<Record<string, string>>({});

  const refresh = useCallback(async () => {
    const results = await Promise.all(
      servers.map(async (server) => {
        try {
          const raw = server.bmId
            ? await fetchById(server.bmId)
            : await fetchByIp(server.ip!);
          return { ...raw, label: server.label };
        } catch {
          return { ...DEFAULT, label: server.label, loading: false, error: true, online: false };
        }
      })
    );

    // Check if any rotative server changed its map
    let mapChanged = false;
    results.forEach((r) => {
      const config = servers.find((s) => s.label === r.label);
      if (config?.rotative && r.map && prevMapsRef.current[r.label]) {
        if (prevMapsRef.current[r.label] !== r.map) {
          mapChanged = true;
        }
      }
      if (r.map) prevMapsRef.current[r.label] = r.map;
    });

    setStatuses(results);

    // If the rotative map changed, schedule an extra refresh in 10s
    // to let BM propagate updated player counts for the new map
    if (mapChanged) {
      setTimeout(() => refresh(), 10_000);
    }
  }, [servers]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, refreshMs);
    return () => clearInterval(interval);
  }, [refresh, refreshMs]);

  return statuses;
}
