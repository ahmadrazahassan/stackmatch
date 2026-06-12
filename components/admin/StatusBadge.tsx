import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  published: "bg-brand-light text-brand-dark border-transparent",
  draft: "bg-muted text-muted-foreground border-transparent",
  hidden: "bg-amber/15 text-amber-dark border-transparent",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge className={cn("capitalize", styles[status] ?? styles.draft)}>{status}</Badge>
  );
}
