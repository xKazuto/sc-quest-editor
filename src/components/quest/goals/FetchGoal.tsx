import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NumberInputWithToggle } from '../NumberInputWithToggle';

interface FetchGoalProps {
  className: string;
  count?: number;
  quantity?: number;
  keepItem?: boolean;
  onChange: (updates: { 
    ClassName?: string; 
    Count?: number; 
    Quantity?: number;
    KeepItem?: boolean;
  }) => void;
}

export const FetchGoal: React.FC<FetchGoalProps> = ({
  className,
  count,
  quantity,
  keepItem = false,
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
        description="Number of items to fetch"
        value={count}
        enabled={count !== undefined}
        onValueChange={(value) => onChange({ Count: value })}
        onToggle={(enabled) => onChange({ Count: enabled ? 0 : undefined })}
      />
      
      <NumberInputWithToggle
        label="Quantity"
        description="Quantity per item"
        value={quantity}
        enabled={quantity !== undefined}
        onValueChange={(value) => onChange({ Quantity: value })}
        onToggle={(enabled) => onChange({ Quantity: enabled ? 0 : undefined })}
      />

      <div>
        <Label>Keep Item (0 or 1)</Label>
        <Input
          type="number"
          min={0}
          max={1}
          value={keepItem ? 1 : 0}
          onChange={(e) => onChange({ KeepItem: e.target.value === '1' })}
          placeholder="Keep Item (0 or 1)"
        />
      </div>
    </div>
  );
};