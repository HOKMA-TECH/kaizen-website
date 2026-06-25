"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import { slugify } from "@/lib/slugify";
import { TYPE_OPTIONS } from "@/lib/realProperties";

export type PropertyFormValues = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  status: string;
  publication_status: string;
  price: string;
  rent_price: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  parking_spaces: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  features: string;
  featured: boolean;
  images: string[]; // URLs já existentes (edição)
};

export const EMPTY_FORM: PropertyFormValues = {
  title: "",
  slug: "",
  description: "",
  type: "apartamento",
  status: "venda",
  publication_status: "published",
  price: "",
  rent_price: "",
  area: "",
  bedrooms: "",
  bathrooms: "",
  parking_spaces: "",
  address: "",
  neighborhood: "",
  city: "Rio de Janeiro",
  state: "RJ",
  features: "",
  featured: false,
  images: [],
};

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 10 * 1024 * 1024;

function extOf(file: File): string {
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  return "jpg";
}

const field =
  "w-full rounded-xl border border-line bg-night px-4 py-3 text-ink placeholder:text-faint outline-none transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-600/15";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-faint";

export default function AdminPropertyForm({
  mode,
  initial,
}: {
  mode: "create" | "edit";
  initial: PropertyFormValues;
}) {
  const router = useRouter();
  const [form, setForm] = useState<PropertyFormValues>(initial);
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof PropertyFormValues>(k: K, v: PropertyFormValues[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onTitle = (v: string) => {
    // auto-slug enquanto o slug não foi editado manualmente
    setForm((f) => ({
      ...f,
      title: v,
      slug: !f.slug || f.slug === slugify(f.title) ? slugify(v) : f.slug,
    }));
  };

  const onPickFiles = (list: FileList | null) => {
    if (!list) return;
    const picked: File[] = [];
    for (const file of Array.from(list)) {
      if (!ACCEPTED.includes(file.type)) {
        setError(`Formato não suportado: ${file.name}. Use JPG, PNG ou WEBP.`);
        return;
      }
      if (file.size > MAX_BYTES) {
        setError(`Imagem acima de 10MB: ${file.name}.`);
        return;
      }
      picked.push(file);
    }
    setError(null);
    setFiles((prev) => [...prev, ...picked]);
  };

  const removeExisting = (url: string) => set("images", form.images.filter((u) => u !== url));
  const removeNew = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.title.trim()) return setError("Informe o título.");
    if (!form.slug.trim()) return setError("Informe o slug.");
    if (form.images.length === 0 && files.length === 0)
      return setError("Adicione ao menos 1 imagem.");

    setBusy(true);
    const supabase = createClient();

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user?.id) {
        setBusy(false);
        return setError("Sessão expirada. Entre novamente.");
      }

      // upload das novas imagens
      const uploaded: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path = `properties/${user.id}/${form.slug}-${Date.now()}-${i}.${extOf(file)}`;
        const { error: upErr } = await supabase.storage
          .from("property-images")
          .upload(path, file, { upsert: false, contentType: file.type, cacheControl: "3600" });
        if (upErr) throw new Error(`Falha no upload (${file.name}): ${upErr.message}`);
        const {
          data: { publicUrl },
        } = supabase.storage.from("property-images").getPublicUrl(path);
        uploaded.push(publicUrl);
      }

      const images = [...form.images, ...uploaded];
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        description: form.description || null,
        type: form.type,
        status: form.status,
        publication_status: form.publication_status,
        active: form.publication_status !== "archived",
        price: form.price ? parseFloat(form.price) : null,
        rent_price: form.rent_price ? parseFloat(form.rent_price) : null,
        area: form.area ? parseFloat(form.area) : null,
        bedrooms: form.bedrooms ? parseInt(form.bedrooms) : null,
        bathrooms: form.bathrooms ? parseInt(form.bathrooms) : null,
        parking_spaces: form.parking_spaces ? parseInt(form.parking_spaces) : null,
        address: form.address || null,
        neighborhood: form.neighborhood || null,
        city: form.city || null,
        state: form.state || null,
        featured: form.featured,
        features: form.features
          ? form.features.split(",").map((f) => f.trim()).filter(Boolean)
          : [],
        images,
        cover_image_url: images[0] ?? null,
      };

      if (mode === "create") {
        const { error: insErr } = await supabase.from("properties").insert(payload).select("id");
        if (insErr) throw new Error(insErr.message);
      } else {
        const { error: updErr } = await supabase
          .from("properties")
          .update(payload)
          .eq("id", form.id as string)
          .select("id");
        if (updErr) throw new Error(updErr.message);
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar.");
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-8">
      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {/* básico */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls}>Título *</label>
          <input className={field} value={form.title} onChange={(e) => onTitle(e.target.value)} required />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>Slug (URL) *</label>
          <input className={field} value={form.slug} onChange={(e) => set("slug", slugify(e.target.value))} required />
        </div>

        <div>
          <label className={labelCls}>Tipo</label>
          <select className={field} value={form.type} onChange={(e) => set("type", e.target.value)}>
            {TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Finalidade</label>
          <select className={field} value={form.status} onChange={(e) => set("status", e.target.value)}>
            <option value="venda">Venda</option>
            <option value="aluguel">Aluguel</option>
            <option value="venda_aluguel">Venda e aluguel</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Preço (venda) R$</label>
          <input type="number" step="0.01" className={field} value={form.price} onChange={(e) => set("price", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Preço (aluguel/mês) R$</label>
          <input type="number" step="0.01" className={field} value={form.rent_price} onChange={(e) => set("rent_price", e.target.value)} />
        </div>
      </div>

      {/* specs */}
      <div className="grid gap-5 sm:grid-cols-4">
        <div>
          <label className={labelCls}>Quartos</label>
          <input type="number" className={field} value={form.bedrooms} onChange={(e) => set("bedrooms", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Banheiros</label>
          <input type="number" className={field} value={form.bathrooms} onChange={(e) => set("bathrooms", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Vagas</label>
          <input type="number" className={field} value={form.parking_spaces} onChange={(e) => set("parking_spaces", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Área (m²)</label>
          <input type="number" step="0.01" className={field} value={form.area} onChange={(e) => set("area", e.target.value)} />
        </div>
      </div>

      {/* localização */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls}>Endereço</label>
          <input className={field} value={form.address} onChange={(e) => set("address", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Bairro</label>
          <input className={field} value={form.neighborhood} onChange={(e) => set("neighborhood", e.target.value)} />
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-3">
          <div>
            <label className={labelCls}>Cidade</label>
            <input className={field} value={form.city} onChange={(e) => set("city", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>UF</label>
            <input className={field} value={form.state} onChange={(e) => set("state", e.target.value)} />
          </div>
        </div>
      </div>

      {/* descrição + diferenciais */}
      <div>
        <label className={labelCls}>Descrição</label>
        <textarea rows={5} className={`${field} resize-y`} value={form.description} onChange={(e) => set("description", e.target.value)} />
      </div>
      <div>
        <label className={labelCls}>Diferenciais (separe por vírgula)</label>
        <input className={field} value={form.features} onChange={(e) => set("features", e.target.value)} placeholder="Piscina, Portaria 24h, Varanda gourmet" />
      </div>

      {/* imagens */}
      <div>
        <label className={labelCls}>Imagens (JPG/PNG/WEBP, até 10MB) — a 1ª é a capa</label>
        <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(e) => onPickFiles(e.target.files)} className="block w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-500" />
        {(form.images.length > 0 || files.length > 0) && (
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {form.images.map((url) => (
              <div key={url} className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button type="button" onClick={() => removeExisting(url)} className="absolute right-1 top-1 rounded-full bg-night/80 px-2 py-0.5 text-xs text-white">✕</button>
              </div>
            ))}
            {files.map((f, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-blue-500/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={URL.createObjectURL(f)} alt="" className="h-full w-full object-cover" />
                <button type="button" onClick={() => removeNew(i)} className="absolute right-1 top-1 rounded-full bg-night/80 px-2 py-0.5 text-xs text-white">✕</button>
                <span className="absolute bottom-1 left-1 rounded bg-blue-600 px-1.5 text-[10px] font-semibold text-white">novo</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* publicação */}
      <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-line bg-panel/60 p-5">
        <div>
          <label className={labelCls}>Status</label>
          <select className={field} value={form.publication_status} onChange={(e) => set("publication_status", e.target.value)}>
            <option value="published">Publicado (visível no site)</option>
            <option value="draft">Rascunho (oculto)</option>
            <option value="archived">Arquivado</option>
          </select>
        </div>
        <label className="flex cursor-pointer items-center gap-3 pt-5">
          <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="h-5 w-5 rounded border-line bg-night accent-blue-600" />
          <span className="text-sm text-body">Destaque na home</span>
        </label>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={busy} className="btn btn-primary justify-center disabled:opacity-60">
          {busy ? "Salvando..." : mode === "create" ? "Cadastrar imóvel" : "Salvar alterações"}
        </button>
        <button type="button" onClick={() => router.push("/admin")} className="btn btn-outline">
          Cancelar
        </button>
      </div>
    </form>
  );
}
