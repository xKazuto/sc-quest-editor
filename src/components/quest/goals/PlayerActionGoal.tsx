import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PlayerActionGoalProps {
  className: string;
  onChange: (updates: Partial<{ ClassName: string }>) => void;
}

export const PlayerActionGoal: React.FC<PlayerActionGoalProps> = ({ className, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange({ ClassName: newValue });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Class Name</Label>
        <Input
          type="text"
          value={className || ''}
          onChange={handleInputChange}
          placeholder="Class Name"
        />
      </div>
    </div>
  );
};