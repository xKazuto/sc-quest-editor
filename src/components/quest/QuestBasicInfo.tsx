import React from 'react';
import { Quest } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

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
        <label className="text-sm font-medium">Quest Type</label>
        <Input
          type="number"
          value={quest.Type}
          onChange={(e) => onChange({ Type: Number(e.target.value) })}
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
        <label className="text-sm font-medium">Name</label>
        <Input
          value={quest.Name}
          onChange={(e) => onChange({ Name: e.target.value })}
          className="mt-1"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="eventSendToClient"
          checked={quest.EventSendToClient}
          onCheckedChange={(checked) => 
            onChange({ EventSendToClient: checked as boolean })
          }
        />
        <label htmlFor="eventSendToClient" className="text-sm font-medium">
          Event Send To Client
        </label>
      </div>

      {quest.EventSendToClient && (
        <div>
          <label className="text-sm font-medium">Event ID</label>
          <Input
            value={quest.EventId}
            onChange={(e) => onChange({ EventId: e.target.value })}
            className="mt-1"
          />
        </div>
      )}

      <div>
        <label className="text-sm font-medium">Sound Accept</label>
        <Input
          value={quest.SoundAccept}
          onChange={(e) => onChange({ SoundAccept: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Sound Complete</label>
        <Input
          value={quest.SoundComplete}
          onChange={(e) => onChange({ SoundComplete: e.target.value })}
          className="mt-1"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isRepeatable"
          checked={quest.IsRepeatable}
          onCheckedChange={(checked) => 
            onChange({ IsRepeatable: checked as boolean })
          }
        />
        <label htmlFor="isRepeatable" className="text-sm font-medium">
          Is Repeatable
        </label>
      </div>

      {quest.IsRepeatable && (
        <>
          <div>
            <label className="text-sm font-medium">Repeat Duration (Hours)</label>
            <Input
              type="number"
              value={quest.RepeatDurationHours}
              onChange={(e) => onChange({ RepeatDurationHours: Number(e.target.value) })}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Repeat Duration (Minutes)</label>
            <Input
              type="number"
              value={quest.RepeatDurationMinutes}
              onChange={(e) => onChange({ RepeatDurationMinutes: Number(e.target.value) })}
              className="mt-1"
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="resetKillsComplete"
            checked={quest.ResetKillsComplete}
            onCheckedChange={(checked) => 
              onChange({ ResetKillsComplete: checked as boolean })
            }
          />
          <label htmlFor="resetKillsComplete" className="text-sm font-medium">
            Reset Kills Complete
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="showGoalItems"
            checked={quest.ShowGoalItems}
            onCheckedChange={(checked) => 
              onChange({ ShowGoalItems: checked as boolean })
            }
          />
          <label htmlFor="showGoalItems" className="text-sm font-medium">
            Show Goal Items
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="showRewardItems"
            checked={quest.ShowRewardItems}
            onCheckedChange={(checked) => 
              onChange({ ShowRewardItems: checked as boolean })
            }
          />
          <label htmlFor="showRewardItems" className="text-sm font-medium">
            Show Reward Items
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="abandonable"
            checked={quest.Abandonable}
            onCheckedChange={(checked) => 
              onChange({ Abandonable: checked as boolean })
            }
          />
          <label htmlFor="abandonable" className="text-sm font-medium">
            Abandonable
          </label>
        </div>
      </div>
    </div>
  );
};