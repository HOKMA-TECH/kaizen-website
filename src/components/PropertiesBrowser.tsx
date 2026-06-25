"use client";

import { useMemo, useState } from "react";
import RealPropertyCard from "@/components/RealPropertyCard";
import {
  type RealProperty,
  type RealPropertyType,
  type RealPropertyStatus,
  TYPE_OPTIONS,
  STATUS_OPTIONS,
} from "@/lib/realProperties";

const selectCls =
  "min-h-11 w-full rounded-xl border border-line bg-night px-4 py-3 text-ink outline-none transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-600/15 sm:w-auto";

export default function PropertiesBrowser({ properties }: { properties: RealProperty[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<RealPropertyType | "">("");
  const [status, setStatus] = useState<RealPropertyStatus | "">("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return properties.filter((p) => {
      if (type && p.type !== type) return false;
      if (status) {
        const matchesStatus =
          p.status === status || p.status === "venda_aluguel";
        if (!matchesStatus) return false;
      }
      if (q) {
        const haystack = [p.title, p.neighborhood, p.city, p.state]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [properties, query, type, status]);

  const hasFilters = query || type || status;

  return (
    <div>
      {/* barra de busca + filtros */}
      <div className="sticky top-[72px] z-30 -mx-5 mb-10 border-y border-line bg-night/85 px-5 py-4 backdrop-blur-md sm:top-[80px] sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 fill-none stroke-faint stroke-2"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Buscar por título, bairro ou cidade..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-11 w-full rounded-xl border border-line bg-night py-3 pl-11 pr-4 text-ink placeholder:text-faint outline-none transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-600/15"
            />
          </div>

          <select
            value={type}
            onChange={(e) => setType(e.target.value as RealPropertyType | "")}
            className={selectCls}
            aria-label="Tipo de imóvel"
          >
            <option value="">Todos os tipos</option>
            {TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as RealPropertyStatus | "")}
            className={selectCls}
            aria-label="Finalidade"
          >
            <option value="">Venda e aluguel</option>
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={() => {
                setQuery("");
                setType("");
                setStatus("");
              }}
              className="min-h-11 shrink-0 rounded-xl px-4 text-sm font-medium text-blue-400 transition-colors hover:text-glow"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      <p className="mb-6 text-sm text-muted">
        {filtered.length}{" "}
        {filtered.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-line bg-panel/60 py-20 text-center">
          <p className="font-display text-xl font-semibold text-ink">Nenhum imóvel encontrado</p>
          <p className="mt-2 text-muted">
            {properties.length === 0
              ? "Em breve novos imóveis por aqui."
              : "Tente ajustar a busca ou os filtros."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <RealPropertyCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
