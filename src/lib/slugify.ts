// Remove marcas diacríticas (acentos) sem depender de regex de caracteres
// combinantes — filtra os code points do bloco U+0300–U+036F.
function stripDiacritics(s: string): string {
  return s
    .normalize("NFD")
    .split("")
    .filter((c) => {
      const code = c.charCodeAt(0);
      return code < 0x300 || code > 0x36f;
    })
    .join("");
}

export function slugify(input: string): string {
  return stripDiacritics(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
