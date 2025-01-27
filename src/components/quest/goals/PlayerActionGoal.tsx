import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PlayerActionGoalProps {
  className: string;
  onChange: (updates: Partial<{ ClassName: string }>) => void;
}

export const PlayerActionGoal: React.FC<PlayerActionGoalProps> = ({ className, onChange }) => {
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
    </div>
  );
};