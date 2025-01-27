import React from 'react';
import { Goal } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TurnInGoal } from './goals/TurnInGoal';
import { KillGoal } from './goals/KillGoal';
import { ExplorationGoal } from './goals/ExplorationGoal';
import { FetchGoal } from './goals/FetchGoal';
import { PlayerActionGoal } from './goals/PlayerActionGoal';
import { cleanGoalData } from '@/lib/questGoalUtils';

const QUEST_TYPES = [
  { value: 1, label: "Turn-In" },
  { value: 2, label: "Kill Quest" },
  { value: 3, label: "Exploration Quest" },
  { value: 4, label: "Fetch/Bring Quest" },
  { value: 6, label: "Player Action" },
];

interface QuestGoalItemProps {
  goal: Goal;
  onChange: (updates: Partial<Goal>) => void;
  onRemove: () => void;
}

export const QuestGoalItem: React.FC<QuestGoalItemProps> = ({ goal, onChange, onRemove }) => {
  const handleChange = (updates: Partial<Goal>) => {
    const updatedGoal = { ...goal, ...updates };
    onChange(cleanGoalData(updatedGoal));
  };

  const renderGoalTypeContent = () => {
    switch (goal.QType) {
      case 1:
        return (
          <TurnInGoal
            state={goal.State}
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <KillGoal
            className={goal.ClassName}
            count={goal.Count}
            onChange={handleChange}
          />
        );
      case 3:
        return (
          <ExplorationGoal
            triggerCoordinate={goal.TriggerCoordinate}
            triggerRadius={goal.TriggerRadius}
            triggerId={goal.TriggerId}
            onChange={handleChange}
          />
        );
      case 4:
        return (
          <FetchGoal
            className={goal.ClassName}
            count={goal.Count}
            quantity={goal.Quantity}
            keepItem={goal.KeepItem}
            onChange={handleChange}
          />
        );
      case 6:
        return (
          <PlayerActionGoal
            className={goal.ClassName}
            onChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Quest Type</Label>
        <Select
          value={goal.QType.toString()}
          onValueChange={(value) => handleChange({ QType: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select quest type" />
          </SelectTrigger>
          <SelectContent>
            {QUEST_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value.toString()}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {renderGoalTypeContent()}

      <div>
        <Label>Description</Label>
        <Textarea
          value={goal.Description}
          onChange={(e) => handleChange({ Description: e.target.value })}
          placeholder="Description"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Optional Settings</Label>
        </div>
        <div className="space-y-2">
          <div>
            <Label>Trigger Event ID</Label>
            <Input
              value={goal.TriggerEventId}
              onChange={(e) => handleChange({ TriggerEventId: e.target.value })}
              placeholder="Trigger Event ID"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="triggerSendToClient"
              checked={goal.TriggerSendToClient}
              onCheckedChange={(checked) => handleChange({ TriggerSendToClient: !!checked })}
            />
            <Label htmlFor="triggerSendToClient">Trigger Send To Client</Label>
          </div>
        </div>
      </div>
    </div>
  );
};