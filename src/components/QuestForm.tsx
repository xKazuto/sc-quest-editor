import React from 'react';
import { Quest } from '@/lib/types';
import { QuestBasicInfo } from './quest/QuestBasicInfo';
import { QuestDescription } from './quest/QuestDescription';
import { QuestGoals } from './quest/QuestGoals';
import { QuestRewards } from './quest/QuestRewards';

interface QuestFormProps {
  quest: Quest;
  onChange: (quest: Quest) => void;
}

export const QuestForm: React.FC<QuestFormProps> = ({ quest, onChange }) => {
  const updateQuest = (updates: Partial<Quest>) => {
    const updatedQuest = { ...quest, ...updates };
    onChange(updatedQuest);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <QuestBasicInfo quest={quest} onChange={updateQuest} />
      
      <QuestDescription 
        description={quest.Description ?? ''} 
        onChange={(description) => updateQuest({ Description: description })} 
      />

      <QuestGoals 
        goals={quest.Goals} 
        onChange={(goals) => updateQuest({ Goals: goals })} 
      />

      <QuestRewards 
        rewards={quest.Rewards} 
        onChange={(rewards) => updateQuest({ Rewards: rewards })} 
      />
    </div>
  );
};

export default QuestForm;