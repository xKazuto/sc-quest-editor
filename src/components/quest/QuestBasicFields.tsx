import React from 'react';
import { Quest } from '@/lib/types';
import { Input } from "@/components/ui/input";

interface QuestBasicFieldsProps {
  quest: Quest;
  onChange: (updates: Partial<Quest>) => void;
}

export const QuestBasicFields: React.FC<QuestBasicFieldsProps> = ({ quest, onChange }) => {
  const handleInputChange = (field: keyof Quest, value: string | number) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Quest ID</label>
        <Input
          type="text"
          value={quest.Id ?? ''}
          onChange={(e) => handleInputChange('Id', e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Quest Type</label>
        <Input
          type="number"
          value={quest.Type ?? ''}
          onChange={(e) => handleInputChange('Type', Number(e.target.value))}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Taker ID</label>
        <Input
          value={quest.TakerId ?? ''}
          onChange={(e) => handleInputChange('TakerId', e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Name</label>
        <Input
          type="text"
          value={quest.Name ?? ''}
          onChange={(e) => handleInputChange('Name', e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};