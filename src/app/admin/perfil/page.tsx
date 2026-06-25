"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export default function PerfilPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email ?? "");
        setCurrentEmail(user.email ?? "");
        const meta = user.user_metadata ?? {};
        setName((meta.name as string) || (meta.full_name as string) || "");
      }
      setReady(true);
    })();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (password && password.length < 6)
      return setMsg({ type: "err", text: "A nova senha deve ter ao menos 6 caracteres." });
    if (password && password !== confirm)
      return setMsg({ type: "err", text: "As senhas não coincidem." });

    setLoading(true);
    const supabase = createClient();

    const updates: {
      data: { name: string; full_name: string };
      email?: string;
      password?: string;
    } = { data: { name: name.trim(), full_name: name.trim() } };
    const emailChanged = email.trim() !== "" && email.trim() !== currentEmail;
    if (emailChanged) updates.email = email.trim();
    if (password) updates.password = password;

    const { error } = await supabase.auth.updateUser(updates);
    setLoading(false);

    if (error) {
      setMsg({ type: "err", text: error.message });
      return;
    }

    let text = "Perfil atualizado com sucesso.";
    if (emailChanged)
      text +=
        " A troca de e-mail só conclui após você confirmar pelo link enviado ao novo endereço.";
    if (password) text += " Senha alterada.";
    setMsg({ type: "ok", text });
    setPassword("");
    setConfirm("");
    router.refresh();
  };

  const field =
    "w-full rounded-xl border border-line bg-night px-4 py-3 text-ink placeholder:text-faint outline-none transition-colors focus:border-blue-500 focus:ring-4 focus:ring-blue-600/15";
  const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-faint";

  return (
    <main className="min-h-screen bg-night px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-xl">
        <Link href="/admin" className="text-sm text-muted transition-colors hover:text-ink">
          ← Voltar ao painel
        </Link>
        <h1 className="font-display mt-4 text-3xl font-bold text-ink sm:text-4xl">Meu perfil</h1>
        <p className="mt-1 text-sm text-muted">Edite seu nome, e-mail e senha. As alterações são salvas no banco.</p>

        {!ready ? (
          <p className="mt-10 text-muted">Carregando...</p>
        ) : (
          <form onSubmit={submit} className="mt-10 space-y-6">
            <div>
              <label className={labelCls}>Nome</label>
              <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
            </div>

            <div>
              <label className={labelCls}>E-mail</label>
              <input type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} />
              <p className="mt-1.5 text-xs text-faint">
                Trocar o e-mail exige confirmação pelo link enviado ao novo endereço.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-panel/60 p-5">
              <p className="text-sm font-semibold text-ink">Alterar senha</p>
              <p className="mb-4 text-xs text-faint">Deixe em branco para manter a senha atual.</p>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Nova senha</label>
                  <input type="password" autoComplete="new-password" className={field} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                </div>
                <div>
                  <label className={labelCls}>Confirmar nova senha</label>
                  <input type="password" autoComplete="new-password" className={field} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" />
                </div>
              </div>
            </div>

            {msg && (
              <p
                className={`rounded-xl border px-4 py-3 text-sm ${
                  msg.type === "ok"
                    ? "border-green-500/30 bg-green-500/10 text-green-300"
                    : "border-red-500/30 bg-red-500/10 text-red-300"
                }`}
              >
                {msg.text}
              </p>
            )}

            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="btn btn-primary justify-center disabled:opacity-60">
                {loading ? "Salvando..." : "Salvar alterações"}
              </button>
              <Link href="/admin" className="btn btn-outline">
                Cancelar
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
