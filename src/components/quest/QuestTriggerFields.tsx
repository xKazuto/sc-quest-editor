import { Goal } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface QuestTriggerFieldsProps {
  goal: Goal;
  index: number;
  onChange: (updates: Partial<Goal>) => void;
}

export const QuestTriggerFields: React.FC<QuestTriggerFieldsProps> = ({
  goal,
  index,
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
        <p className="text-sm text-gray-600 mb-1">Trigger Coordinate</p>
        <Input
          value={goal.TriggerCoordinate}
          onChange={(e) => onChange({ TriggerCoordinate: e.target.value })}
          placeholder="Trigger Coordinate"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">Trigger Radius</p>
        <Input
          type="number"
          value={goal.TriggerRadius}
          onChange={(e) => onChange({ TriggerRadius: Number(e.target.value) })}
          placeholder="Trigger Radius"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">Trigger ID</p>
        <div className="flex gap-2">
          <Input
            value={goal.TriggerId}
            onChange={(e) => onChange({ TriggerId: e.target.value })}
            placeholder="Trigger ID"
          />
          <Button 
            variant="outline"
            onClick={generateTriggerId}
            type="button"
          >
            Generate
          </Button>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">Trigger Event ID</p>
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
    </div>
  );
};