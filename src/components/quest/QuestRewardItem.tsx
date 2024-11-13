import React from 'react';
import { Reward } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from 'lucide-react';

interface QuestRewardItemProps {
  reward: Reward;
  index: number;
  onChange: (updates: Partial<Reward>) => void;
  onRemove: () => void;
}

const rewardTypeDescriptions: Record<number, string> = {
  1: "Experience Points",
  2: "Currency",
  3: "Item",
  4: "Reputation",
  5: "Skill Points"
};

export const QuestRewardItem: React.FC<QuestRewardItemProps> = ({ reward, index, onChange, onRemove }) => {
  return (
    <div className="p-4 border rounded-md mb-4">
      <div className="flex justify-between mb-2">
        <h4 className="font-medium">Reward {index + 1}</h4>
        <Button
          variant="destructive"
          size="sm"
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={reward.RewardType}
            onChange={(e) => onChange({ RewardType: Number(e.target.value) })}
            placeholder="Reward Type"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Available types:<br />
                  {Object.entries(rewardTypeDescriptions).map(([type, desc]) => (
                    `${type}: ${desc}\n`
                  ))}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          value={reward.ClassName}
          onChange={(e) => onChange({ ClassName: e.target.value })}
          placeholder="Class Name"
        />
        <Input
          type="number"
          value={reward.Amount}
          onChange={(e) => onChange({ Amount: Number(e.target.value) })}
          placeholder="Amount"
        />
        <Input
          type="number"
          value={reward.Quantity}
          onChange={(e) => onChange({ Quantity: Number(e.target.value) })}
          placeholder="Quantity"
        />
      </div>
    </div>
  );
};