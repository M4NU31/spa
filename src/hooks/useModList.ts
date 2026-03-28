"use client";

import { useState, useEffect } from "react";

export type Mod = {
  id: string;
  name: string;
  url: string;
};

type State = {
  mods: Mod[];
  loading: boolean;
  error: string | null;
};

async function fetchMods(bmId: string): Promise<Mod[]> {
  const res = await fetch(`https://api.battlemetrics.com/servers/${bmId}`);
  if (!res.ok) throw new Error(`BattleMetrics ${res.status}`);
  const json = await res.json();
  const details: Record<string, unknown> = json?.data?.attributes?.details ?? {};

  // BattleMetrics returns parallel arrays: modIds, modNames, modLinks
  const ids: unknown[]   = Array.isArray(details.modIds)    ? details.modIds   as unknown[]  : [];
  const names: unknown[] = Array.isArray(details.modNames)  ? details.modNames as unknown[]  : [];
  const links: unknown[] = Array.isArray(details.modLinks)  ? details.modLinks as unknown[]  : [];

  if (ids.length === 0) throw new Error("No mods found in server details");

  return ids.map((id, i) => ({
    id:   String(id),
    name: String(names[i] ?? `Mod ${id}`),
    url:  String(links[i] ?? `https://www.curseforge.com/ark-survival-ascended`),
  }));
}

export function useModList(bmId: string) {
  const [state, setState] = useState<State>({ mods: [], loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    fetchMods(bmId)
      .then((mods) => { if (!cancelled) setState({ mods, loading: false, error: null }); })
      .catch((e)   => { if (!cancelled) setState({ mods: [], loading: false, error: String(e) }); });
    return () => { cancelled = true; };
  }, [bmId]);

  return state;
}
