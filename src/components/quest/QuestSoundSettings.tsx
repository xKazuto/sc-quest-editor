import React from 'react';
import { Quest } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QuestSoundSettingsProps {
  quest: Quest;
  onChange: (updates: Partial<Quest>) => void;
}

export const QuestSoundSettings: React.FC<QuestSoundSettingsProps> = ({ quest, onChange }) => {
  const defaultSoundAccept = 'CRDTN_SoundSet_StalkerSounds_Pda_Tip';
  const defaultSoundComplete = 'CRDTN_SoundSet_StalkerSounds_Pda_Alarm';

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="soundAccept" className="text-sm font-medium">Sound Accept</Label>
        <Input
          id="soundAccept"
          value={quest.SoundAccept || defaultSoundAccept}
          onChange={(e) => onChange({ SoundAccept: e.target.value })}
          placeholder={defaultSoundAccept}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="soundComplete" className="text-sm font-medium">Sound Complete</Label>
        <Input
          id="soundComplete"
          value={quest.SoundComplete || defaultSoundComplete}
          onChange={(e) => onChange({ SoundComplete: e.target.value })}
          placeholder={defaultSoundComplete}
          className="mt-1"
        />
      </div>
    </div>
  );
};