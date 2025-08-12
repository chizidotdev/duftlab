import { SearchIcon } from "lucide-react";

import { useSearch } from "@/hooks/data";

export function Search() {
  const { mutate } = useSearch();

  function searchProducts(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get("query")?.toString() || "";
    if (!query) return;

    mutate(
      { query },
      {
        onSuccess: (data) => {
          console.log("Search results:", data);
        },
      }
    );
  }

  return (
    <form onSubmit={searchProducts} className="container flex items-center gap-4 pb-3">
      <SearchIcon className="size-5" />
      <input
        autoFocus
        className="w-full text-lg focus-visible:outline-none"
        placeholder="Search..."
        name="query"
      />
    </form>
  );
}
