import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NumberInputWithToggle } from '../NumberInputWithToggle';

interface KillGoalProps {
  className: string;
  count?: number;
  onChange: (updates: { ClassName?: string; Count?: number }) => void;
}

export const KillGoal: React.FC<KillGoalProps> = ({ className, count, onChange }) => {
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
        description="Number of targets to kill"
        value={count}
        enabled={count !== undefined}
        onValueChange={(value) => onChange({ Count: value })}
        onToggle={(enabled) => onChange({ Count: enabled ? 0 : undefined })}
      />
    </div>
  );
};