"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import { TYPE_LABELS, STATUS_LABELS, formatPrice, type RealProperty } from "@/lib/realProperties";

type Row = RealProperty & { publication_status: string };

const PUB_BADGE: Record<string, string> = {
  published: "bg-green-500/15 text-green-300 ring-1 ring-green-500/30",
  draft: "bg-white/10 text-muted ring-1 ring-line",
  archived: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30",
};
const PUB_LABEL: Record<string, string> = {
  published: "Publicado",
  draft: "Rascunho",
  archived: "Arquivado",
};

export default function AdminHome() {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("properties")
      .select(
        "id, slug, title, type, status, price, rent_price, area, bedrooms, bathrooms, parking_spaces, neighborhood, city, state, images, cover_image_url, featured, created_at, publication_status"
      )
      .order("created_at", { ascending: false });
    setRows((data ?? []) as Row[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const signOut = async () => {
    await createClient().auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const onDelete = async (row: Row) => {
    if (!confirm(`Excluir "${row.title}"? Esta ação afeta o site real e não pode ser desfeita.`)) return;
    setDeleting(row.id);
    const { error } = await createClient().from("properties").delete().eq("id", row.id);
    setDeleting(null);
    if (error) {
      alert("Erro ao excluir: " + error.message);
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== row.id));
  };

  return (
    <main className="min-h-screen bg-night px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="chapter-tag">Painel</p>
            <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">Imóveis</h1>
            <p className="mt-1 text-sm text-muted">
              Atenção: alterações aqui afetam o site real (mesmo banco da produção).
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/imoveis" className="text-sm text-muted transition-colors hover:text-ink">
              Ver site
            </Link>
            <Link
              href="/admin/perfil"
              aria-label="Editar perfil"
              title="Editar perfil"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-blue-500 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current stroke-[1.6]" aria-hidden>
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H2a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 3.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H8a1.65 1.65 0 0 0 1-1.51V2a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V8a1.65 1.65 0 0 0 1.51 1H22a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </Link>
            <button onClick={signOut} className="text-sm text-muted transition-colors hover:text-ink">
              Sair
            </button>
            <Link href="/admin/novo" className="btn btn-primary !py-2.5 text-sm">
              + Novo imóvel
            </Link>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-line">
          {loading ? (
            <div className="p-10 text-center text-muted">Carregando...</div>
          ) : rows.length === 0 ? (
            <div className="p-10 text-center text-muted">Nenhum imóvel cadastrado ainda.</div>
          ) : (
            <ul className="divide-y divide-line">
              {rows.map((r) => {
                const cover = r.cover_image_url || r.images?.[0] || null;
                return (
                  <li key={r.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                    <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-panel">
                      {cover && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cover} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${PUB_BADGE[r.publication_status] ?? PUB_BADGE.draft}`}>
                          {PUB_LABEL[r.publication_status] ?? r.publication_status}
                        </span>
                        {r.featured && (
                          <span className="rounded-full bg-blue-600/20 px-2.5 py-0.5 text-[11px] font-semibold text-blue-300 ring-1 ring-blue-600/40">
                            Destaque
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1 truncate font-semibold text-ink">{r.title}</h3>
                      <p className="truncate text-sm text-muted">
                        {TYPE_LABELS[r.type]} · {STATUS_LABELS[r.status]} ·{" "}
                        {[r.neighborhood, r.city].filter(Boolean).join(", ")} · {formatPrice(r)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Link href={`/admin/${r.id}/editar`} className="btn btn-outline !px-4 !py-2 text-sm">
                        Editar
                      </Link>
                      <button
                        onClick={() => onDelete(r)}
                        disabled={deleting === r.id}
                        className="rounded-full border border-red-500/40 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                      >
                        {deleting === r.id ? "..." : "Excluir"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
