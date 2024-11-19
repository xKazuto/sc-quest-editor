import { Goal } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { NumberInputWithToggle } from './NumberInputWithToggle';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface QuestGoalItemProps {
  goal: Goal;
  index: number;
  onChange: (updates: Partial<Goal>) => void;
  onRemove: () => void;
}

export const QuestGoalItem: React.FC<QuestGoalItemProps> = ({ goal, index, onChange }) => {
  const { toast } = useToast();
  
  const questTypes = [
    { id: 1, name: "Turn-In" },
    { id: 2, name: "Kill Quest" },
    { id: 3, name: "Exploration Quest" },
    { id: 4, name: "Fetch/Bring Quest" },
    { id: 5, name: "Craft (Does not work yet)" },
    { id: 6, name: "Action (Does not work yet)" },
  ];

  const handleQTypeChange = (value: string) => {
    const qType = parseInt(value);
    onChange({ 
      QType: qType,
      State: qType === 1 
    });
  };

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
    <div className="space-y-2 pt-4">
      <div>
        <p className="text-sm text-gray-600 mb-1">Quest Type</p>
        <Select
          value={goal.QType.toString()}
          onValueChange={handleQTypeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select quest type" />
          </SelectTrigger>
          <SelectContent>
            {questTypes.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id={`state-${index}`}
          checked={goal.State}
          onCheckedChange={(checked) => 
            onChange({ State: checked as boolean })
          }
        />
        <label htmlFor={`state-${index}`}>State</label>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">Class Name</p>
        <Input
          value={goal.ClassName}
          onChange={(e) => onChange({ ClassName: e.target.value })}
          placeholder="Class Name"
        />
      </div>

      <NumberInputWithToggle
        label="Count"
        description="Count"
        value={goal.Count ?? 0}
        enabled={goal.Count !== undefined}
        onValueChange={(value) => onChange({ Count: value })}
        onToggle={(enabled) => onChange({ Count: enabled ? 0 : undefined })}
      />

      <NumberInputWithToggle
        label="Quantity"
        description="Quantity"
        value={goal.Quantity ?? 0}
        enabled={goal.Quantity !== undefined}
        onValueChange={(value) => onChange({ Quantity: value })}
        onToggle={(enabled) => onChange({ Quantity: enabled ? 0 : undefined })}
      />

      <div>
        <p className="text-sm text-gray-600 mb-1">Value</p>
        <Input
          value={goal.Value}
          onChange={(e) => onChange({ Value: e.target.value })}
          placeholder="Value"
        />
      </div>

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

      <div>
        <p className="text-sm text-gray-600 mb-1">Description</p>
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
