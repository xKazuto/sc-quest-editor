import React from 'react';
import { Quest } from '@/lib/types';
import { Input } from "@/components/ui/input";

interface QuestBasicFieldsProps {
  quest: Quest;
  onChange: (updates: Partial<Quest>) => void;
}

export const QuestBasicFields: React.FC<QuestBasicFieldsProps> = ({ quest, onChange }) => {
  const generateQuestId = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_') // Replace any non-alphanumeric characters with underscore
      .replace(/^_+|_+$/g, ''); // Remove leading/trailing underscores
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const newId = generateQuestId(newName);
    onChange({
      ...quest,
      Name: newName,
      Id: newId
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Quest ID</label>
        <Input
          type="text"
          value={quest.Id || ''}
          readOnly
          className="mt-1 bg-gray-100"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Quest Type</label>
        <Input
          type="number"
          value={quest.Type}
          onChange={(e) => onChange({ ...quest, Type: Number(e.target.value) })}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Taker ID</label>
        <Input
          value={quest.TakerId}
          onChange={(e) => onChange({ ...quest, TakerId: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Name</label>
        <Input
          value={quest.Name}
          onChange={handleNameChange}
          className="mt-1"
        />
      </div>
    </div>
  );
};