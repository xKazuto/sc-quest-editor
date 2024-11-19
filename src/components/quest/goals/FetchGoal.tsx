import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NumberInputWithToggle } from '../NumberInputWithToggle';

interface FetchGoalProps {
  className: string;
  count?: number;
  quantity?: number;
  onChange: (updates: { ClassName?: string; Count?: number; Quantity?: number }) => void;
}

export const FetchGoal: React.FC<FetchGoalProps> = ({
  className,
  count,
  quantity,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Class Name</Label>
        <Input
          value={className}
          onChange={(e) => onChange({ ClassName: e.target.value })}
          placeholder="Class Name"
        />
      </div>
      <NumberInputWithToggle
        label="Count"
        description="Count"
        value={count ?? 0}
        enabled={count !== undefined}
        onValueChange={(value) => onChange({ Count: value })}
        onToggle={(enabled) => onChange({ Count: enabled ? 0 : undefined })}
      />
      <NumberInputWithToggle
        label="Quantity"
        description="Quantity"
        value={quantity ?? 0}
        enabled={quantity !== undefined}
        onValueChange={(value) => onChange({ Quantity: value })}
        onToggle={(enabled) => onChange({ Quantity: enabled ? 0 : undefined })}
      />
    </div>
  );
};