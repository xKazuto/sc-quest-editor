
import React from 'react';
import { Quest } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QuestBlacklistProps {
  quest: Quest;
  onChange: (updates: Partial<Quest>) => void;
}

export const QuestBlacklist: React.FC<QuestBlacklistProps> = ({ quest, onChange }) => {
  // Store the raw input as a string in component state
  const [rawInput, setRawInput] = React.useState<string>(quest.Blacklist.join(', '));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Store the raw input value
    const inputValue = e.target.value;
    setRawInput(inputValue);
    
    // Only process the split operation when updating the quest data
    // This allows users to freely type commas
    const blacklist = inputValue
      .split(',')
      .map(id => id.trim())
      .filter(id => id);
      
    onChange({ Blacklist: blacklist });
  };

  return (
    <div>
      <Label className="text-sm font-medium">Blacklisted Quests (comma-separated IDs)</Label>
      <Input
        value={rawInput}
        onChange={handleInputChange}
        placeholder="quest1, quest2, quest3"
        className="mt-1"
      />
    </div>
  );
};
