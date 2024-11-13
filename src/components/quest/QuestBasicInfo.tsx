import React from 'react';
import { Quest } from '@/lib/types';
import { Input } from "@/components/ui/input";

interface QuestBasicInfoProps {
  quest: Quest;
  onChange: (updates: Partial<Quest>) => void;
}

export const QuestBasicInfo: React.FC<QuestBasicInfoProps> = ({ quest, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Quest ID</label>
        <Input
          value={quest.Id}
          onChange={(e) => onChange({ Id: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Taker ID</label>
        <Input
          value={quest.TakerId}
          onChange={(e) => onChange({ TakerId: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Quest Type</label>
        <Input
          type="number"
          value={quest.Type}
          onChange={(e) => onChange({ Type: Number(e.target.value) })}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Name</label>
        <Input
          value={quest.Name}
          onChange={(e) => onChange({ Name: e.target.value })}
          className="mt-1"
        />
      </div>
    </div>
  );
};