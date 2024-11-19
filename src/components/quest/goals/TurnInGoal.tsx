import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TurnInGoalProps {
  state: boolean;
  onChange: (updates: { State: boolean }) => void;
}

export const TurnInGoal: React.FC<TurnInGoalProps> = ({ state, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="state"
        checked={state}
        onCheckedChange={(checked) => onChange({ State: !!checked })}
      />
      <Label htmlFor="state">State</Label>
    </div>
  );
};