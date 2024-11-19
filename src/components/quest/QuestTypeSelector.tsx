import React from 'react';
import { MapPin, Skull, AlertOctagon, Package } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface QuestTypeSelectorProps {
  value: number;
  onValueChange: (value: number) => void;
}

const questTypes = [
  { id: 1, name: "Turn-In", icon: Package },
  { id: 2, name: "Kill Quest", icon: Skull },
  { id: 3, name: "Exploration Quest", icon: MapPin },
  { id: 4, name: "Alert Quest", icon: AlertOctagon },
];

export const QuestTypeSelector: React.FC<QuestTypeSelectorProps> = ({
  value,
  onValueChange
}) => {
  return (
    <ToggleGroup 
      type="single" 
      value={value.toString()}
      onValueChange={(val) => val && onValueChange(parseInt(val))}
      className="flex justify-start space-x-2"
    >
      {questTypes.map((type) => {
        const Icon = type.icon;
        return (
          <ToggleGroupItem
            key={type.id}
            value={type.id.toString()}
            aria-label={type.name}
            className={cn(
              "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
              "h-10 w-10 p-2"
            )}
          >
            <Icon className="h-full w-full" />
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
};