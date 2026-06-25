"use client";

import Link from "next/link";
import AdminPropertyForm, { EMPTY_FORM } from "@/components/admin/AdminPropertyForm";

export default function NovoImovel() {
  return (
    <main className="min-h-screen bg-night px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <Link href="/admin" className="text-sm text-muted transition-colors hover:text-ink">
          ← Voltar ao painel
        </Link>
        <h1 className="font-display mt-4 text-3xl font-bold text-ink sm:text-4xl">Novo imóvel</h1>
        <p className="mt-1 text-sm text-muted">Preencha os dados e publique. Afeta o site real.</p>

        <div className="mt-10">
          <AdminPropertyForm mode="create" initial={EMPTY_FORM} />
        </div>
      </div>
    </main>
  );
}
