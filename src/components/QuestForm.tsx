
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

const QuestForm: React.FC<QuestFormProps> = ({ quest, onChange }) => {
  const updateQuest = (updates: Partial<Quest>) => {
    onChange({ ...quest, ...updates });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <QuestBasicInfo quest={quest} onChange={updateQuest} />
        <QuestDescription 
          description={quest.Description ?? ''} 
          onChange={(description) => updateQuest({ Description: description })} 
        />
      </div>
      
      <div className="p-4 bg-card/40 rounded-lg border border-border/30 space-y-6">
        <QuestGoals 
          goals={quest.Goals} 
          onChange={(goals) => updateQuest({ Goals: goals })} 
        />
      </div>
      
      <div className="p-4 bg-card/40 rounded-lg border border-border/30">
        <QuestRewards 
          rewards={quest.Rewards} 
          onChange={(rewards) => updateQuest({ Rewards: rewards })} 
        />
      </div>
    </div>
  );
};

export default QuestForm;
