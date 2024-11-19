import React from 'react';
import { Quest } from '@/lib/types';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { QuestBasicFields } from './QuestBasicFields';
import { QuestPrerequisites } from './QuestPrerequisites';
import { QuestSoundSettings } from './QuestSoundSettings';
import { FormItem } from "@/components/ui/form";
import { QuestTypeSelector } from './QuestTypeSelector';

interface QuestBasicInfoProps {
  quest: Quest;
  onChange: (updates: Partial<Quest>) => void;
}

export const QuestBasicInfo: React.FC<QuestBasicInfoProps> = ({ quest, onChange }) => {
  const handleCheckboxChange = (field: keyof Quest) => {
    onChange({ [field]: !quest[field] });
  };

  return (
    <div className="space-y-6">
      <QuestBasicFields quest={quest} onChange={onChange} />
      <QuestPrerequisites quest={quest} onChange={onChange} />

      <FormItem>
        <Label>Quest Type</Label>
        <QuestTypeSelector
          value={quest.QType}
          onValueChange={(value) => onChange({ QType: value })}
        />
      </FormItem>

      <FormItem className="flex items-center space-x-2">
        <Checkbox
          id="eventSendToClient"
          checked={quest.EventSendToClient}
          onCheckedChange={() => handleCheckboxChange('EventSendToClient')}
        />
        <Label htmlFor="eventSendToClient">
          Event Send To Client
        </Label>
      </FormItem>

      {quest.EventSendToClient && (
        <FormItem>
          <Label>Event ID</Label>
          <Input
            value={quest.EventId}
            onChange={(e) => onChange({ EventId: e.target.value })}
            placeholder="Enter Event ID"
          />
        </FormItem>
      )}

      <QuestSoundSettings quest={quest} onChange={onChange} />

      <div className="space-y-4">
        <FormItem className="flex items-center space-x-2">
          <Checkbox
            id="isRepeatable"
            checked={quest.IsRepeatable}
            onCheckedChange={() => handleCheckboxChange('IsRepeatable')}
          />
          <Label htmlFor="isRepeatable">
            Is Repeatable
          </Label>
        </FormItem>

        {quest.IsRepeatable && (
          <>
            <FormItem>
              <Label>Repeat Duration (Hours)</Label>
              <Input
                type="number"
                value={quest.RepeatDurationHours}
                onChange={(e) => onChange({ RepeatDurationHours: Number(e.target.value) })}
                placeholder="Enter hours"
              />
            </FormItem>

            <FormItem>
              <Label>Repeat Duration (Minutes)</Label>
              <Input
                type="number"
                value={quest.RepeatDurationMinutes}
                onChange={(e) => onChange({ RepeatDurationMinutes: Number(e.target.value) })}
                placeholder="Enter minutes"
              />
            </FormItem>
          </>
        )}

        <div className="space-y-2">
          <FormItem className="flex items-center space-x-2">
            <Checkbox
              id="resetKillsComplete"
              checked={quest.ResetKillsComplete}
              onCheckedChange={() => handleCheckboxChange('ResetKillsComplete')}
            />
            <Label htmlFor="resetKillsComplete">
              Reset Kills Complete
            </Label>
          </FormItem>

          <FormItem className="flex items-center space-x-2">
            <Checkbox
              id="showGoalItems"
              checked={quest.ShowGoalItems}
              onCheckedChange={() => handleCheckboxChange('ShowGoalItems')}
            />
            <Label htmlFor="showGoalItems">
              Show Goal Items
            </Label>
          </FormItem>

          <FormItem className="flex items-center space-x-2">
            <Checkbox
              id="showRewardItems"
              checked={quest.ShowRewardItems}
              onCheckedChange={() => handleCheckboxChange('ShowRewardItems')}
            />
            <Label htmlFor="showRewardItems">
              Show Reward Items
            </Label>
          </FormItem>

          <FormItem className="flex items-center space-x-2">
            <Checkbox
              id="abandonable"
              checked={quest.Abandonable}
              onCheckedChange={() => handleCheckboxChange('Abandonable')}
            />
            <Label htmlFor="abandonable">
              Abandonable
            </Label>
          </FormItem>
        </div>
      </div>
    </div>
  );
};