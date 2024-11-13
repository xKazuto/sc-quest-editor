import React from 'react';
import { Goal } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface QuestGoalItemProps {
  goal: Goal;
  index: number;
  onChange: (updates: Partial<Goal>) => void;
  onRemove: () => void;
}

export const QuestGoalItem: React.FC<QuestGoalItemProps> = ({ goal, index, onChange, onRemove }) => {
  return (
    <Accordion type="single" collapsible className="mb-4">
      <AccordionItem value="goal">
        <div className="flex items-center justify-between">
          <AccordionTrigger>Goal {index + 1}</AccordionTrigger>
          <Button
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            Remove
          </Button>
        </div>
        <AccordionContent>
          <div className="space-y-2 pt-4">
            <Input
              type="number"
              value={goal.Type}
              onChange={(e) => onChange({ Type: Number(e.target.value) })}
              placeholder="Type"
            />
            <Input
              value={goal.ClassName}
              onChange={(e) => onChange({ ClassName: e.target.value })}
              placeholder="Class Name"
            />
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
            <Input
              type="number"
              value={goal.Count}
              onChange={(e) => onChange({ Count: Number(e.target.value) })}
              placeholder="Count"
            />
            <Input
              type="number"
              value={goal.Quantity}
              onChange={(e) => onChange({ Quantity: Number(e.target.value) })}
              placeholder="Quantity"
            />
            <Input
              value={goal.Value}
              onChange={(e) => onChange({ Value: e.target.value })}
              placeholder="Value"
            />
            <Input
              value={goal.TriggerCoordinate}
              onChange={(e) => onChange({ TriggerCoordinate: e.target.value })}
              placeholder="Trigger Coordinate"
            />
            <Input
              type="number"
              value={goal.TriggerRadius}
              onChange={(e) => onChange({ TriggerRadius: Number(e.target.value) })}
              placeholder="Trigger Radius"
            />
            <Input
              value={goal.TriggerId}
              onChange={(e) => onChange({ TriggerId: e.target.value })}
              placeholder="Trigger ID"
            />
            <Input
              value={goal.TriggerEventId}
              onChange={(e) => onChange({ TriggerEventId: e.target.value })}
              placeholder="Trigger Event ID"
            />
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};