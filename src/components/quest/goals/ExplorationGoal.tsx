import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ExplorationGoalProps {
  triggerCoordinate: string;
  triggerRadius: number;
  triggerId: string;
  onChange: (updates: { TriggerCoordinate?: string; TriggerRadius?: number; TriggerId?: string }) => void;
}

export const ExplorationGoal: React.FC<ExplorationGoalProps> = ({
  triggerCoordinate,
  triggerRadius,
  triggerId,
  onChange,
}) => {
  const { toast } = useToast();

  const generateTriggerId = () => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 7);
    const newId = `TRIGGER_${timestamp}_${randomStr}`;
    onChange({ TriggerId: newId });
    toast({
      title: "Trigger ID Generated",
      description: "A new Trigger ID has been automatically generated.",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Trigger Coordinate</Label>
        <Input
          value={triggerCoordinate}
          onChange={(e) => onChange({ TriggerCoordinate: e.target.value })}
          placeholder="Trigger Coordinate"
        />
      </div>
      <div>
        <Label>Trigger Radius</Label>
        <Input
          type="number"
          value={triggerRadius}
          onChange={(e) => onChange({ TriggerRadius: Number(e.target.value) })}
          placeholder="Trigger Radius"
        />
      </div>
      <div>
        <Label>Trigger ID</Label>
        <div className="flex gap-2">
          <Input
            value={triggerId}
            onChange={(e) => onChange({ TriggerId: e.target.value })}
            placeholder="Trigger ID"
          />
          <Button onClick={generateTriggerId}>Generate</Button>
        </div>
      </div>
    </div>
  );
};