import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PlayerActionGoalProps {
  className?: string;
  onChange: (updates: Partial<{ ClassName: string }>) => void;
}

export const PlayerActionGoal: React.FC<PlayerActionGoalProps> = ({ className, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ClassName: e.target.value });
  };

  return (
    <div className="space-y-2">
      <Label>Action Required</Label>
      <Input
        value={className ?? ''}
        onChange={handleInputChange}
        placeholder="Enter required action"
      />
    </div>
  );
};