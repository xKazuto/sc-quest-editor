import React from 'react';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FormItem } from "@/components/ui/form";

interface NumberInputWithToggleProps {
  label: string;
  description: string;
  value: number;
  enabled: boolean;
  onValueChange: (value: number) => void;
  onToggle: (enabled: boolean) => void;
}

export const NumberInputWithToggle: React.FC<NumberInputWithToggleProps> = ({
  label,
  description,
  value,
  enabled,
  onValueChange,
  onToggle,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 mb-1">{description}</p>
        <div className="flex items-center gap-2">
          <Label htmlFor={`toggle-${label}`} className="text-sm">Enable {label}</Label>
          <Switch
            id={`toggle-${label}`}
            checked={enabled}
            onCheckedChange={onToggle}
          />
        </div>
      </div>
      {enabled && (
        <FormItem>
          <Input
            type="number"
            value={value}
            onChange={(e) => onValueChange(Number(e.target.value))}
            placeholder={label}
            onWheel={(e) => e.currentTarget.blur()}
          />
        </FormItem>
      )}
    </div>
  );
};