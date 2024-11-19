import { Goal } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { QuestTypeSelector } from './QuestTypeSelector';
import { QuestTriggerFields } from './QuestTriggerFields';

interface QuestGoalItemProps {
  goal: Goal;
  index: number;
  onChange: (updates: Partial<Goal>) => void;
  onRemove: () => void;
}

export const QuestGoalItem: React.FC<QuestGoalItemProps> = ({ 
  goal, 
  index, 
  onChange, 
  onRemove 
}) => {
  const handleQTypeChange = (value: number) => {
    onChange({ 
      QType: value,
      State: value === 1 // Set State to true only for Turn-In (QType 1)
    });
  };

  return (
    <div className="space-y-2 pt-4">
      <QuestTypeSelector
        value={goal.QType}
        onValueChange={handleQTypeChange}
      />

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

      <div>
        <p className="text-sm text-gray-600 mb-1">Count</p>
        <Input
          type="number"
          value={goal.Count}
          onChange={(e) => onChange({ Count: Number(e.target.value) })}
          placeholder="Count"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">Quantity</p>
        <Input
          type="number"
          value={goal.Quantity}
          onChange={(e) => onChange({ Quantity: Number(e.target.value) })}
          placeholder="Quantity"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-1">Value</p>
        <Input
          value={goal.Value}
          onChange={(e) => onChange({ Value: e.target.value })}
          placeholder="Value"
        />
      </div>

      <QuestTriggerFields
        goal={goal}
        index={index}
        onChange={onChange}
      />

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