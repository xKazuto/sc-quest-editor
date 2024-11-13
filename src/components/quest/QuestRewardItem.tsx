import React from 'react';
import { Reward } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

interface QuestRewardItemProps {
  reward: Reward;
  index: number;
  onChange: (updates: Partial<Reward>) => void;
  onRemove: () => void;
}

const fieldDescriptions: Record<string, string> = {
  rewardType: "Type of reward (1: XP, 2: Currency, 3: Item, 4: Reputation, 5: Skill Points)",
  className: "The specific class or identifier of the reward item",
  amount: "The numerical value or amount of the reward",
  quantity: "How many of this reward item to give"
};

export const QuestRewardItem: React.FC<QuestRewardItemProps> = ({ reward, index, onChange, onRemove }) => {
  return (
    <Collapsible className="p-4 border rounded-md mb-4">
      <div className="flex items-center gap-2">
        <CollapsibleTrigger className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium">Reward {index + 1}</span>
        </CollapsibleTrigger>
        <Button
          variant="destructive"
          size="sm"
          onClick={onRemove}
          className="ml-auto"
        >
          Remove
        </Button>
      </div>

      <CollapsibleContent className="space-y-4 mt-4">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">{fieldDescriptions.rewardType}</p>
            <Input
              type="number"
              value={reward.RewardType}
              onChange={(e) => onChange({ RewardType: Number(e.target.value) })}
              placeholder="Reward Type"
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">{fieldDescriptions.className}</p>
            <Input
              value={reward.ClassName}
              onChange={(e) => onChange({ ClassName: e.target.value })}
              placeholder="Class Name"
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">{fieldDescriptions.amount}</p>
            <Input
              type="number"
              step="1"
              value={reward.Amount}
              onChange={(e) => onChange({ Amount: Math.floor(Number(e.target.value)) })}
              placeholder="Amount"
              onWheel={(e) => e.currentTarget.blur()}
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">{fieldDescriptions.quantity}</p>
            <Input
              type="number"
              step="1"
              value={reward.Quantity}
              onChange={(e) => onChange({ Quantity: Math.floor(Number(e.target.value)) })}
              placeholder="Quantity"
              onWheel={(e) => e.currentTarget.blur()}
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};