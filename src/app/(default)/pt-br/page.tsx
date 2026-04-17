import { permanentRedirect } from "next/navigation";

export default async function PtBrAliasPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = new URLSearchParams();

  Object.entries(await searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      params.set(key, value);
      return;
    }

    value?.forEach((item) => params.append(key, item));
  });

  permanentRedirect(params.size > 0 ? `/?${params.toString()}` : "/");
}
