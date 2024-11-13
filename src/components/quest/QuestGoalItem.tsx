import React from 'react';
import { Goal } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface QuestGoalItemProps {
  goal: Goal;
  index: number;
  onChange: (updates: Partial<Goal>) => void;
  onRemove: () => void;
}

const fieldDescriptions: Record<string, string> = {
  type: "Type of goal (e.g., 1: Kill, 2: Collect)",
  className: "The specific class or identifier of the goal target",
  count: "Required count to complete the goal",
  quantity: "Quantity needed",
  value: "Additional value parameter",
  triggerCoordinate: "Coordinates for trigger location",
  triggerRadius: "Radius of trigger area",
  triggerId: "Identifier for the trigger",
  triggerEventId: "Event ID for the trigger",
};

export const QuestGoalItem: React.FC<QuestGoalItemProps> = ({ goal, index, onChange, onRemove }) => {
  return (
    <div className="space-y-2 pt-4">
      <div>
        <p className="text-sm text-gray-600 mb-1">{fieldDescriptions.type}</p>
        <Input
          type="number"
          value={goal.Type}
          onChange={(e) => onChange({ Type: Number(e.target.value) })}
          placeholder="Type"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">{fieldDescriptions.className}</p>
        <Input
          value={goal.ClassName}
          onChange={(e) => onChange({ ClassName: e.target.value })}
          placeholder="Class Name"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id={`goal-state-${index}`}
          checked={goal.State}
          onCheckedChange={(checked) => 
            onChange({ State: checked as boolean })
          }
        />
        <label htmlFor={`goal-state-${index}`}>State</label>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">{fieldDescriptions.count}</p>
        <Input
          type="number"
          value={goal.Count}
          onChange={(e) => onChange({ Count: Number(e.target.value) })}
          placeholder="Count"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">{fieldDescriptions.quantity}</p>
        <Input
          type="number"
          value={goal.Quantity}
          onChange={(e) => onChange({ Quantity: Number(e.target.value) })}
          placeholder="Quantity"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">{fieldDescriptions.value}</p>
        <Input
          value={goal.Value}
          onChange={(e) => onChange({ Value: e.target.value })}
          placeholder="Value"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">{fieldDescriptions.triggerCoordinate}</p>
        <Input
          value={goal.TriggerCoordinate}
          onChange={(e) => onChange({ TriggerCoordinate: e.target.value })}
          placeholder="Trigger Coordinate"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">{fieldDescriptions.triggerRadius}</p>
        <Input
          type="number"
          value={goal.TriggerRadius}
          onChange={(e) => onChange({ TriggerRadius: Number(e.target.value) })}
          placeholder="Trigger Radius"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">{fieldDescriptions.triggerId}</p>
        <Input
          value={goal.TriggerId}
          onChange={(e) => onChange({ TriggerId: e.target.value })}
          placeholder="Trigger ID"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">{fieldDescriptions.triggerEventId}</p>
        <Input
          value={goal.TriggerEventId}
          onChange={(e) => onChange({ TriggerEventId: e.target.value })}
          placeholder="Trigger Event ID"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id={`trigger-send-${index}`}
          checked={goal.TriggerSendToClient}
          onCheckedChange={(checked) => 
            onChange({ TriggerSendToClient: checked as boolean })
          }
        />
        <label htmlFor={`trigger-send-${index}`}>Trigger Send To Client</label>
      </div>

      <Textarea
        value={goal.Description}
        onChange={(e) => onChange({ Description: e.target.value })}
        placeholder="Description"
      />

      <div className="flex items-center space-x-2">
        <Checkbox
          id={`keep-item-${index}`}
          checked={goal.KeepItem}
          onCheckedChange={(checked) => 
            onChange({ KeepItem: checked as boolean })
          }
        />
        <label htmlFor={`keep-item-${index}`}>Keep Item</label>
      </div>
    </div>
  );
};