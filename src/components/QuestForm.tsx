import React from 'react';
import { Quest, Goal, Reward } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { createEmptyGoal, createEmptyReward } from '@/lib/questValidation';

interface QuestFormProps {
  quest: Quest;
  onChange: (quest: Quest) => void;
}

export const QuestForm: React.FC<QuestFormProps> = ({ quest, onChange }) => {
  const updateQuest = (updates: Partial<Quest>) => {
    onChange({ ...quest, ...updates });
  };

  const addGoal = () => {
    updateQuest({ Goals: [...quest.Goals, createEmptyGoal()] });
  };

  const updateGoal = (index: number, updates: Partial<Goal>) => {
    const newGoals = [...quest.Goals];
    newGoals[index] = { ...newGoals[index], ...updates };
    updateQuest({ Goals: newGoals });
  };

  const removeGoal = (index: number) => {
    updateQuest({ Goals: quest.Goals.filter((_, i) => i !== index) });
  };

  const addReward = () => {
    updateQuest({ Rewards: [...quest.Rewards, createEmptyReward()] });
  };

  const updateReward = (index: number, updates: Partial<Reward>) => {
    const newRewards = [...quest.Rewards];
    newRewards[index] = { ...newRewards[index], ...updates };
    updateQuest({ Rewards: newRewards });
  };

  const removeReward = (index: number) => {
    updateQuest({ Rewards: quest.Rewards.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Quest ID</label>
          <Input
            value={quest.Id}
            onChange={(e) => updateQuest({ Id: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Name</label>
          <Input
            value={quest.Name}
            onChange={(e) => updateQuest({ Name: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={quest.Description}
            onChange={(e) => updateQuest({ Description: e.target.value })}
            className="mt-1"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="repeatable"
            checked={quest.IsRepeatable}
            onCheckedChange={(checked) => 
              updateQuest({ IsRepeatable: checked as boolean })
            }
          />
          <label htmlFor="repeatable" className="text-sm font-medium">
            Is Repeatable
          </label>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Goals</h3>
          {quest.Goals.map((goal, index) => (
            <div key={index} className="p-4 border rounded-md mb-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Goal {index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeGoal(index)}
                >
                  Remove
                </Button>
              </div>
              <div className="space-y-2">
                <Input
                  type="number"
                  value={goal.Type}
                  onChange={(e) => updateGoal(index, { Type: Number(e.target.value) })}
                  placeholder="Type"
                />
                <Input
                  value={goal.ClassName}
                  onChange={(e) => updateGoal(index, { ClassName: e.target.value })}
                  placeholder="Class Name"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`goal-state-${index}`}
                    checked={goal.State}
                    onCheckedChange={(checked) => 
                      updateGoal(index, { State: checked as boolean })
                    }
                  />
                  <label htmlFor={`goal-state-${index}`}>State</label>
                </div>
                <Input
                  type="number"
                  value={goal.Count}
                  onChange={(e) => updateGoal(index, { Count: Number(e.target.value) })}
                  placeholder="Count"
                />
                <Input
                  type="number"
                  value={goal.Quantity}
                  onChange={(e) => updateGoal(index, { Quantity: Number(e.target.value) })}
                  placeholder="Quantity"
                />
                <Input
                  value={goal.Value}
                  onChange={(e) => updateGoal(index, { Value: e.target.value })}
                  placeholder="Value"
                />
                <Input
                  value={goal.TriggerCoordinate}
                  onChange={(e) => updateGoal(index, { TriggerCoordinate: e.target.value })}
                  placeholder="Trigger Coordinate"
                />
                <Input
                  type="number"
                  value={goal.TriggerRadius}
                  onChange={(e) => updateGoal(index, { TriggerRadius: Number(e.target.value) })}
                  placeholder="Trigger Radius"
                />
                <Input
                  value={goal.TriggerId}
                  onChange={(e) => updateGoal(index, { TriggerId: e.target.value })}
                  placeholder="Trigger ID"
                />
                <Input
                  value={goal.TriggerEventId}
                  onChange={(e) => updateGoal(index, { TriggerEventId: e.target.value })}
                  placeholder="Trigger Event ID"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`trigger-send-${index}`}
                    checked={goal.TriggerSendToClient}
                    onCheckedChange={(checked) => 
                      updateGoal(index, { TriggerSendToClient: checked as boolean })
                    }
                  />
                  <label htmlFor={`trigger-send-${index}`}>Trigger Send To Client</label>
                </div>
                <Textarea
                  value={goal.Description}
                  onChange={(e) => updateGoal(index, { Description: e.target.value })}
                  placeholder="Description"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`keep-item-${index}`}
                    checked={goal.KeepItem}
                    onCheckedChange={(checked) => 
                      updateGoal(index, { KeepItem: checked as boolean })
                    }
                  />
                  <label htmlFor={`keep-item-${index}`}>Keep Item</label>
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addGoal} className="w-full mt-2">
            Add Goal
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Rewards</h3>
          {quest.Rewards.map((reward, index) => (
            <div key={index} className="p-4 border rounded-md mb-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Reward {index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeReward(index)}
                >
                  Remove
                </Button>
              </div>
              <div className="space-y-2">
                <Input
                  value={reward.ClassName}
                  onChange={(e) => updateReward(index, { ClassName: e.target.value })}
                  placeholder="Class Name"
                />
                <Input
                  type="number"
                  value={reward.Amount}
                  onChange={(e) => updateReward(index, { Amount: Number(e.target.value) })}
                  placeholder="Amount"
                />
                <Input
                  type="number"
                  value={reward.Quantity}
                  onChange={(e) => updateReward(index, { Quantity: Number(e.target.value) })}
                  placeholder="Quantity"
                />
              </div>
            </div>
          ))}
          <Button onClick={addReward} className="w-full mt-2">
            Add Reward
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestForm;