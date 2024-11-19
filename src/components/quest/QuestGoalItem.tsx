import { Goal } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { NumberInputWithToggle } from './NumberInputWithToggle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuestGoalItemProps {
  goal: Goal;
  index: number;
  onChange: (updates: Partial<Goal>) => void;
  onRemove: () => void;
}

const QUEST_TYPES = [
  { value: 1, label: "Turn-In" },
  { value: 2, label: "Kill Quest" },
  { value: 3, label: "Exploration Quest" },
  { value: 4, label: "Fetch/Bring Quest" },
];

export const QuestGoalItem: React.FC<QuestGoalItemProps> = ({
  goal,
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

  const renderQuestTypeSpecificFields = () => {
    switch (goal.QType) {
      case 1: // Turn-In
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="state"
                checked={goal.State}
                onCheckedChange={(checked) => onChange({ State: !!checked })}
              />
              <label htmlFor="state">State</label>
            </div>
          </div>
        );

      case 2: // Kill Quest
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Class Name</label>
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
          </div>
        );

      case 3: // Exploration Quest
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Trigger Coordinate</label>
              <Input
                value={goal.TriggerCoordinate}
                onChange={(e) => onChange({ TriggerCoordinate: e.target.value })}
                placeholder="Trigger Coordinate"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Trigger Radius</label>
              <Input
                type="number"
                value={goal.TriggerRadius}
                onChange={(e) => onChange({ TriggerRadius: Number(e.target.value) })}
                placeholder="Trigger Radius"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Trigger ID</label>
              <div className="flex gap-2">
                <Input
                  value={goal.TriggerId}
                  onChange={(e) => onChange({ TriggerId: e.target.value })}
                  placeholder="Trigger ID"
                />
                <Button onClick={generateTriggerId}>Generate</Button>
              </div>
            </div>
          </div>
        );

      case 4: // Fetch/Bring Quest
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Class Name</label>
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
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Quest Type</label>
        <Select
          value={goal.QType.toString()}
          onValueChange={(value) => onChange({ QType: parseInt(value) })}
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

      {renderQuestTypeSpecificFields()}

      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={goal.Description}
          onChange={(e) => onChange({ Description: e.target.value })}
          placeholder="Description"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Optional Settings</label>
        </div>
        <div className="space-y-2">
          <div>
            <label className="text-sm font-medium">Trigger Event ID</label>
            <Input
              value={goal.TriggerEventId}
              onChange={(e) => onChange({ TriggerEventId: e.target.value })}
              placeholder="Trigger Event ID"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="triggerSendToClient"
              checked={goal.TriggerSendToClient}
              onCheckedChange={(checked) => onChange({ TriggerSendToClient: !!checked })}
            />
            <label htmlFor="triggerSendToClient">Trigger Send To Client</label>
          </div>
        </div>
      </div>
    </div>
  );
};