import React from 'react';
import { Reward } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { QuestRewardItem } from './QuestRewardItem';
import { createEmptyReward } from '@/lib/questValidation';

interface QuestRewardsProps {
  rewards: Reward[];
  onChange: (rewards: Reward[]) => void;
}

export const QuestRewards: React.FC<QuestRewardsProps> = ({ rewards, onChange }) => {
  const addReward = () => {
    const updatedRewards = [...rewards, createEmptyReward()];
    onChange(updatedRewards);
  };

  const updateReward = (index: number, updates: Partial<Reward>) => {
    const newRewards = [...rewards];
    newRewards[index] = { ...newRewards[index], ...updates };
    onChange(newRewards);
  };

  const removeReward = (index: number) => {
    const updatedRewards = rewards.filter((_, i) => i !== index);
    onChange(updatedRewards);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Rewards</h3>
      {rewards.map((reward, index) => (
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
  );
};