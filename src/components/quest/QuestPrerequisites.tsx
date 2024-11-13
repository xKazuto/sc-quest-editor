import React from 'react';
import { Quest } from '@/lib/types';
import { Input } from "@/components/ui/input";

interface QuestPrerequisitesProps {
  quest: Quest;
  onChange: (updates: Partial<Quest>) => void;
}

export const QuestPrerequisites: React.FC<QuestPrerequisitesProps> = ({ quest, onChange }) => {
  const handlePreQuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const preQuests = e.target.value.split(',').map(id => id.trim()).filter(id => id);
    onChange({ PreQuests: preQuests });
  };

  return (
    <div>
      <label className="text-sm font-medium">Pre-Quests (comma-separated IDs)</label>
      <Input
        value={quest.PreQuests.join(', ')}
        onChange={handlePreQuestsChange}
        placeholder="quest1, quest2, quest3"
        className="mt-1"
      />
    </div>
  );
};