"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import AdminPropertyForm, { type PropertyFormValues } from "@/components/admin/AdminPropertyForm";

const toStr = (v: unknown) => (v == null ? "" : String(v));

export default function EditarImovel() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [values, setValues] = useState<PropertyFormValues | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data } = await supabase.from("properties").select("*").eq("id", id).maybeSingle();
      if (!data) {
        setNotFound(true);
        return;
      }
      setValues({
        id: data.id,
        title: data.title ?? "",
        slug: data.slug ?? "",
        description: data.description ?? "",
        type: data.type ?? "apartamento",
        status: data.status ?? "venda",
        publication_status: data.publication_status ?? "published",
        price: toStr(data.price),
        rent_price: toStr(data.rent_price),
        area: toStr(data.area),
        bedrooms: toStr(data.bedrooms),
        bathrooms: toStr(data.bathrooms),
        parking_spaces: toStr(data.parking_spaces),
        address: data.address ?? "",
        neighborhood: data.neighborhood ?? "",
        city: data.city ?? "Rio de Janeiro",
        state: data.state ?? "RJ",
        features: Array.isArray(data.features) ? data.features.join(", ") : "",
        featured: Boolean(data.featured),
        images: Array.isArray(data.images) ? data.images : [],
      });
    })();
  }, [id]);

  return (
    <main className="min-h-screen bg-night px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <Link href="/admin" className="text-sm text-muted transition-colors hover:text-ink">
          ← Voltar ao painel
        </Link>
        <h1 className="font-display mt-4 text-3xl font-bold text-ink sm:text-4xl">Editar imóvel</h1>

        <div className="mt-10">
          {notFound ? (
            <p className="text-muted">Imóvel não encontrado.</p>
          ) : !values ? (
            <p className="text-muted">Carregando...</p>
          ) : (
            <AdminPropertyForm mode="edit" initial={values} />
          )}
        </div>
      </div>
    </main>
  );
}
