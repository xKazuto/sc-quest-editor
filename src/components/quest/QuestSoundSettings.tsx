import React from 'react';
import { Quest } from '@/lib/types';
import { Input } from "@/components/ui/input";

interface QuestSoundSettingsProps {
  quest: Quest;
  onChange: (updates: Partial<Quest>) => void;
}

export const QuestSoundSettings: React.FC<QuestSoundSettingsProps> = ({ quest, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Sound Accept</label>
        <Input
          value={quest.SoundAccept || 'CRDTN_SoundSet_StalkerSounds_Pda_Tip'}
          className="mt-1 bg-gray-100"
          readOnly
        />
      </div>

      <div>
        <label className="text-sm font-medium">Sound Complete</label>
        <Input
          value={quest.SoundComplete || 'CRDTN_SoundSet_StalkerSounds_Pda_Alarm'}
          className="mt-1 bg-gray-100"
          readOnly
        />
      </div>
    </div>
  );
};