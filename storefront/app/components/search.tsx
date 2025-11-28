import { useNavigate } from "react-router";

import { SearchIcon } from "lucide-react";

export function Search({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  // const { mutate } = useSearch();
  const navigate = useNavigate();

  function searchProducts(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get("query")?.toString() || "";
    if (!query) return;

    navigate(`/collections/all?q=${encodeURIComponent(query)}`);
    setOpen(false);

    // mutate({ query });
  }

  return (
    <form onSubmit={searchProducts} className="container flex items-center gap-4 border-y py-3">
      <SearchIcon className="size-5" />
      <input
        autoFocus
        className="w-full text-lg focus-visible:outline-none"
        placeholder="Search by title, brand or notes..."
        name="query"
      />
    </form>
  );
}
