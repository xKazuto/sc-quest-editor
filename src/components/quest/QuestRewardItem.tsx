import React from 'react';
import { Reward } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { NumberInputWithToggle } from './NumberInputWithToggle';

interface QuestRewardItemProps {
  reward: Reward;
  index: number;
  onChange: (updates: Partial<Reward>) => void;
  onRemove: () => void;
}

const fieldDescriptions: Record<string, string> = {
  rewardType: "Type of reward (1: Item, 2: License)",
  className: "The specific class or identifier of the reward item",
  amount: "Amount",
  quantity: "Quantity"
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

          <NumberInputWithToggle
            label="Amount"
            description={fieldDescriptions.amount}
            value={reward.Amount ?? 0}
            enabled={reward.Amount !== undefined}
            onValueChange={(value) => onChange({ Amount: value })}
            onToggle={(enabled) => onChange({ Amount: enabled ? 0 : undefined })}
          />

          <NumberInputWithToggle
            label="Quantity"
            description={fieldDescriptions.quantity}
            value={reward.Quantity ?? 0}
            enabled={reward.Quantity !== undefined}
            onValueChange={(value) => onChange({ Quantity: value })}
            onToggle={(enabled) => onChange({ Quantity: enabled ? 0 : undefined })}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};