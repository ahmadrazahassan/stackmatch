"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface SoftwareOption {
  id: string;
  name: string;
}

interface SoftwareComboboxProps {
  options: SoftwareOption[];
  value: string | null;
  onChange: (id: string | null) => void;
  placeholder?: string;
  allowClear?: boolean;
}

export function SoftwareCombobox({
  options,
  value,
  onChange,
  placeholder = "Select software…",
  allowClear = false,
}: SoftwareComboboxProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between bg-white font-normal">
          {selected?.name ?? <span className="text-muted-foreground">{placeholder}</span>}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        <Command>
          <CommandInput placeholder="Search software…" />
          <CommandList>
            <CommandEmpty>No software found.</CommandEmpty>
            <CommandGroup>
              {allowClear && (
                <CommandItem
                  value="__none__"
                  onSelect={() => {
                    onChange(null);
                    setOpen(false);
                  }}
                >
                  <span className="text-muted-foreground">None</span>
                </CommandItem>
              )}
              {options.map((o) => (
                <CommandItem
                  key={o.id}
                  value={o.name}
                  onSelect={() => {
                    onChange(o.id);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("h-4 w-4", value === o.id ? "opacity-100" : "opacity-0")} />
                  {o.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
