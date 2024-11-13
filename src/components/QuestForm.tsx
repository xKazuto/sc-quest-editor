import React from 'react';
import { Quest, Goal, Reward } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createEmptyGoal, createEmptyReward } from '@/lib/questValidation';
import { QuestBasicInfo } from './quest/QuestBasicInfo';
import { QuestGoalItem } from './quest/QuestGoalItem';
import { QuestRewardItem } from './quest/QuestRewardItem';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

interface QuestFormProps {
  quest: Quest;
  onChange: (quest: Quest) => void;
}

export const QuestForm: React.FC<QuestFormProps> = ({ quest, onChange }) => {
  const updateQuest = (updates: Partial<Quest>) => {
    const updatedQuest = { ...quest, ...updates };
    onChange(updatedQuest);
  };

  const addGoal = () => {
    const updatedGoals = [...quest.Goals, createEmptyGoal()];
    updateQuest({ Goals: updatedGoals });
  };

  const updateGoal = (index: number, updates: Partial<Goal>) => {
    const newGoals = [...quest.Goals];
    newGoals[index] = { ...newGoals[index], ...updates };
    updateQuest({ Goals: newGoals });
  };

  const removeGoal = (index: number) => {
    const updatedGoals = quest.Goals.filter((_, i) => i !== index);
    updateQuest({ Goals: updatedGoals });
  };

  const addReward = () => {
    const updatedRewards = [...quest.Rewards, createEmptyReward()];
    updateQuest({ Rewards: updatedRewards });
  };

  const updateReward = (index: number, updates: Partial<Reward>) => {
    const newRewards = [...quest.Rewards];
    newRewards[index] = { ...newRewards[index], ...updates };
    updateQuest({ Rewards: newRewards });
  };

  const removeReward = (index: number) => {
    const updatedRewards = quest.Rewards.filter((_, i) => i !== index);
    updateQuest({ Rewards: updatedRewards });
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <QuestBasicInfo quest={quest} onChange={updateQuest} />

      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={quest.Description ?? ''}
          onChange={(e) => updateQuest({ Description: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Goals</h3>
        {quest.Goals.map((goal, index) => (
          <Collapsible key={index} className="p-4 border rounded-md mb-4">
            <div className="flex items-center gap-2">
              <CollapsibleTrigger className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                <span className="font-medium">Goal {index + 1}</span>
              </CollapsibleTrigger>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeGoal(index)}
                className="ml-auto"
              >
                Remove
              </Button>
            </div>
            <CollapsibleContent className="space-y-4 mt-4">
              <QuestGoalItem
                goal={goal}
                index={index}
                onChange={(updates) => updateGoal(index, updates)}
                onRemove={() => removeGoal(index)}
              />
            </CollapsibleContent>
          </Collapsible>
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