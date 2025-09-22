"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function CampaignComboBox({ existingCampaigns, onSelectCampaign, selectedId, setSelectedId }) {
  const [open, setOpen] = React.useState(false)
  // Find the selected campaign object by its id
  const selectedCampaign = existingCampaigns.find(
    (c) => c.id === selectedId
  )

  const handleSelect = (id) => {
    const newId = id === selectedId ? "" : id
    setSelectedId(newId)
    setOpen(false)
    if (onSelectCampaign) {
      onSelectCampaign(newId) // pass back the selected id only
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between "
        >
          {selectedCampaign?.name || "Select campaign..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" sideOffset={4} className=" w-fit p-1">
        <Command>
          <CommandInput placeholder="Search campaign..." className="h-9" />
          <CommandList>
            <CommandEmpty>No campaign found.</CommandEmpty>
            <CommandGroup>
              {existingCampaigns.map((campaign) => (
                <CommandItem
                  key={campaign.id}
                  value={campaign.id}
                  onSelect={handleSelect}
                >
                  {campaign.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedId === campaign.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
