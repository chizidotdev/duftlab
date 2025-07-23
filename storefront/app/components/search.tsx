import { SearchIcon } from "lucide-react";

export function Search() {
  return (
    <div className="container flex items-center gap-4 pb-3">
      <SearchIcon className="size-5" />
      <input
        autoFocus
        className="w-full text-lg focus-visible:outline-none"
        placeholder="Search..."
      />
    </div>
  );
}
