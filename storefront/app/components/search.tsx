import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function Search({ ...props }: React.ComponentProps<typeof PopoverTrigger>) {
  return (
    <Popover>
      <PopoverTrigger {...props} />
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
}
