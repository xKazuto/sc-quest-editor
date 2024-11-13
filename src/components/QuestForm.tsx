import React from 'react';
import { Quest, Goal, Reward } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { createEmptyGoal, createEmptyReward } from '@/lib/questValidation';
import { QuestBasicInfo } from './quest/QuestBasicInfo';
import { QuestGoalItem } from './quest/QuestGoalItem';
import { QuestRewardItem } from './quest/QuestRewardItem';

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
      <QuestBasicInfo quest={quest} onChange={updateQuest} />

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
          <QuestGoalItem
            key={index}
            goal={goal}
            index={index}
            onChange={(updates) => updateGoal(index, updates)}
            onRemove={() => removeGoal(index)}
          />
        ))}
        <Button onClick={addGoal} className="w-full mt-2">
          Add Goal
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Rewards</h3>
        {quest.Rewards.map((reward, index) => (
          <QuestRewardItem
            key={index}
            reward={reward}
            index={index}
            onChange={(updates) => updateReward(index, updates)}
            onRemove={() => removeReward(index)}
          />
        ))}
        <Button onClick={addReward} className="w-full mt-2">
          Add Reward
        </Button>
      </div>
    </div>
  );
};

export default QuestForm;