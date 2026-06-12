"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown, Search } from "lucide-react";
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
import { SoftwareLogo } from "./SoftwareLogo";

interface SoftwareOption {
  id: string;
  name: string;
  slug: string;
  logo_url?: string | null;
}

export function CompareSelector({ softwareList }: { softwareList: SoftwareOption[] }) {
  const router = useRouter();
  const [softwareA, setSoftwareA] = useState<SoftwareOption | null>(null);
  const [softwareB, setSoftwareB] = useState<SoftwareOption | null>(null);

  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);

  const handleCompare = () => {
    if (softwareA && softwareB) {
      router.push(`/compare/${softwareA.slug}-vs-${softwareB.slug}`);
    }
  };

  const isReady = softwareA && softwareB && softwareA.id !== softwareB.id;

  return (
    <div className="mx-auto w-full max-w-4xl rounded-[24px] bg-gray-50/50 p-6 sm:p-10">
      <h2 className="mb-6 text-center text-[17px] font-semibold text-gray-800">
        What products would you like to compare?
      </h2>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        {/* Selector A */}
        <div className="flex-1">
          <Popover open={openA} onOpenChange={setOpenA}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                role="combobox" 
                aria-expanded={openA} 
                className="w-full justify-between bg-white text-[15px] font-normal h-[60px] border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {softwareA ? (
                  <div className="flex items-center gap-3">
                    <SoftwareLogo src={softwareA.logo_url ?? null} name={softwareA.name} size={32} />
                    <span className="font-semibold">{softwareA.name}</span>
                  </div>
                ) : (
                  <span className="text-gray-400"><Search className="inline w-4 h-4 mr-2"/> Select first product...</span>
                )}
                <ChevronsUpDown className="h-4 w-4 shrink-0 text-gray-300" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-(--radix-popover-trigger-width) p-0 border-gray-200 shadow-lg rounded-xl" align="start">
              <Command>
                <CommandInput placeholder="Search products..." className="h-12 text-[15px]" />
                <CommandList>
                  <CommandEmpty className="py-6 text-sm text-center text-gray-500">No product found.</CommandEmpty>
                  <CommandGroup>
                    {softwareList.map((s) => (
                      <CommandItem
                        key={s.id}
                        value={s.name}
                        onSelect={() => {
                          setSoftwareA(s);
                          setOpenA(false);
                        }}
                        className="py-3 text-[15px] cursor-pointer flex items-center"
                      >
                        <Check className={cn("mr-3 h-4 w-4 shrink-0 text-brand", softwareA?.id === s.id ? "opacity-100" : "opacity-0")} />
                        <SoftwareLogo src={s.logo_url ?? null} name={s.name} size={32} className="mr-3 shadow-sm" />
                        <span className="truncate font-medium">{s.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* VS Text Minimal */}
        <div className="flex shrink-0 items-center justify-center text-xs font-bold text-gray-400 uppercase tracking-widest self-center">
          vs
        </div>

        {/* Selector B */}
        <div className="flex-1">
          <Popover open={openB} onOpenChange={setOpenB}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                role="combobox" 
                aria-expanded={openB} 
                className="w-full justify-between bg-white text-[15px] font-normal h-[60px] border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {softwareB ? (
                  <div className="flex items-center gap-3">
                    <SoftwareLogo src={softwareB.logo_url ?? null} name={softwareB.name} size={32} />
                    <span className="font-semibold">{softwareB.name}</span>
                  </div>
                ) : (
                  <span className="text-gray-400"><Search className="inline w-4 h-4 mr-2"/> Select second product...</span>
                )}
                <ChevronsUpDown className="h-4 w-4 shrink-0 text-gray-300" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-(--radix-popover-trigger-width) p-0 border-gray-200 shadow-lg rounded-xl" align="start">
              <Command>
                <CommandInput placeholder="Search products..." className="h-12 text-[15px]"/>
                <CommandList>
                  <CommandEmpty className="py-6 text-sm text-center text-gray-500">No product found.</CommandEmpty>
                  <CommandGroup>
                    {softwareList.map((s) => (
                      <CommandItem
                        key={s.id}
                        value={s.name}
                        onSelect={() => {
                          setSoftwareB(s);
                          setOpenB(false);
                        }}
                        className="py-3 text-[15px] cursor-pointer flex items-center"
                      >
                        <Check className={cn("mr-3 h-4 w-4 shrink-0 text-brand", softwareB?.id === s.id ? "opacity-100" : "opacity-0")} />
                        <SoftwareLogo src={s.logo_url ?? null} name={s.name} size={32} className="mr-3 shadow-sm" />
                        <span className="truncate font-medium">{s.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button 
          size="lg" 
          disabled={!isReady} 
          onClick={handleCompare}
          className="w-full sm:w-auto px-10 text-[15px] font-bold h-12 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          Compare Now
        </Button>
      </div>
    </div>
  );
}
