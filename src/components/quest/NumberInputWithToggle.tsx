import React from 'react';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FormItem } from "@/components/ui/form";

interface NumberInputWithToggleProps {
  label: string;
  description: string;
  value: number | undefined;
  enabled: boolean;
  onValueChange: (value: number | undefined) => void;
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
  const handleToggleChange = (checked: boolean) => {
    if (!checked) {
      onValueChange(undefined);
    } else if (value === undefined) {
      onValueChange(0);
    }
    onToggle(checked);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? undefined : Number(e.target.value);
    onValueChange(newValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={`toggle-${label}`} className="text-sm">{description}</Label>
        <div className="flex items-center gap-2">
          <Label htmlFor={`toggle-${label}`} className="text-sm">Enable {label}</Label>
          <Switch
            id={`toggle-${label}`}
            checked={enabled}
            onCheckedChange={handleToggleChange}
          />
        </div>
      </div>
      {enabled && (
        <FormItem>
          <Input
            type="number"
            value={value ?? ''}
            onChange={handleInputChange}
            placeholder={`Enter ${label}`}
            min={0}
            onWheel={(e) => e.currentTarget.blur()}
          />
        </FormItem>
      )}
    </div>
  );
};