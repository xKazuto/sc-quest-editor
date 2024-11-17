import React from 'react';
import { Goal } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

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
  triggerId: "Unique Waypoint ID", // Updated description
  triggerEventId: "Event ID for the trigger",
  description: "Description shown to the player in the quest log",
};

export const QuestGoalItem: React.FC<QuestGoalItemProps> = ({ goal, index, onChange, onRemove }) => {
  const { toast } = useToast();

  const generateRandomWaypointId = () => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 7);
    const newId = `WP_${timestamp}_${randomStr}`;
    onChange({ TriggerId: newId });
    toast({
      title: "Waypoint ID Generated",
      description: "A new Waypoint ID has been automatically generated.",
    });
  };

  return (
    <div className="space-y-2 pt-4">
      <div>
        <p className="text-sm text-gray-600 mb-1">{fieldDescriptions.type}</p>
        <Input
          type="number"
          value={goal.QType}
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
        <label htmlFor={`goal-state-${index}`}>Is Quest done on take?</label>
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
        <div className="flex gap-2">
          <Input
            value={goal.TriggerId}
            onChange={(e) => onChange({ TriggerId: e.target.value })}
            placeholder="Trigger ID"
          />
          <Button 
            variant="outline"
            onClick={generateRandomWaypointId}
            type="button"
          >
            Generate
          </Button>
        </div>
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

      <div>
        <p className="text-sm text-gray-600 mb-1">{fieldDescriptions.description}</p>
        <Textarea
          value={goal.Description}
          onChange={(e) => onChange({ Description: e.target.value })}
          placeholder="Description"
        />
      </div>

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