import { Link, href } from "react-router";

import { Configure, Hits, InstantSearch, SearchBox } from "react-instantsearch";

import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Heading } from "@/components/ui/text";

import { MEILISEARCH_INDEX_NAME, searchClient } from "@/lib/config";

type Hit = {
  id: string;
  title: string;
  description: string;
  handle: string;
  thumbnail: string;
  categories: { id: string; name: string; handle: string }[];
  tags: { id: string; value: string }[];
};

export function Search(props: React.ComponentPropsWithoutRef<typeof DialogTrigger>) {
  /* function searchProducts(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get("query")?.toString() || "";
    if (!query) return;

    navigate(`/collections/all?q=${encodeURIComponent(query)}`);
  } */

  return (
    <Dialog>
      <DialogTrigger {...props} />
      <DialogContent showCloseButton={false} className="gap-0 pt-0">
        <InstantSearch searchClient={searchClient} indexName={MEILISEARCH_INDEX_NAME}>
          <SearchBox
            autoFocus
            className="bg-background/70 sticky top-0 z-99 -mx-4 w-[calc(100%+2rem)] px-5 py-4 backdrop-blur-md [&_button.ais-SearchBox-reset]:hidden [&_span.ais-SearchBox-loadingIndicator]:hidden [&_svg]:size-4"
            placeholder="Search by title, brand or notes..."
            inputProps={{
              className: "w-[calc(100%-1rem)] h-12 outline-none text-lg",
            }}
          />
          <Configure hitsPerPage={6} />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </DialogContent>
    </Dialog>
  );
}

function Hit({ hit }: { hit: Hit }) {
  return (
    <DialogClose asChild>
      <Link
        className="group relative mt-4 flex flex-row gap-x-4"
        key={hit.id}
        to={href("/products/:handle", { handle: hit.handle })}
        aria-label={`View details for ${hit.title}`}
      >
        <div className="bg-muted group-hover:border-primary/20 relative flex aspect-[9/10] w-16 items-center justify-center rounded border transition-colors">
          <img src={hit.thumbnail} alt={hit.title} className="size-full" />
        </div>
        <div className="flex flex-col gap-y-1">
          <Heading variant="h3">{hit.title}</Heading>
          <div className="text-muted-foreground text-sm">
            {hit.categories.map((c) => c.name).join(", ")}
            {!!hit.tags.length && ` - ${hit.tags.map((t) => t.value).join(", ")}`}
          </div>
          {/* <ProductPrice product={hit} /> */}
        </div>
      </Link>
    </DialogClose>
  );
}
