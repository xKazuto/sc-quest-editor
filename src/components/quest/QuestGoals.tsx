import React from 'react';
import { Goal } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { QuestGoalItem } from './QuestGoalItem';
import { createEmptyGoal } from '@/lib/questValidation';

interface QuestGoalsProps {
  goals: Goal[];
  onChange: (goals: Goal[]) => void;
}

export const QuestGoals: React.FC<QuestGoalsProps> = ({ goals, onChange }) => {
  const addGoal = () => {
    const updatedGoals = [...goals, createEmptyGoal()];
    onChange(updatedGoals);
  };

  const updateGoal = (index: number, updates: Partial<Goal>) => {
    const newGoals = [...goals];
    newGoals[index] = { ...newGoals[index], ...updates };
    onChange(newGoals);
  };

  const removeGoal = (index: number) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    onChange(updatedGoals);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Goals</h3>
      {goals.map((goal, index) => (
        <Collapsible key={index} className="p-4 border rounded-md mb-4">
          <div className="flex items-center gap-2">
            <CollapsibleTrigger className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium">Goal {index + 1}</span>
            </CollapsibleTrigger>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeGoal(index)}
              className="ml-auto"
            >
              Remove
            </Button>
          </div>
          <CollapsibleContent className="space-y-4 mt-4">
            <QuestGoalItem
              goal={goal}
              index={index}
              onChange={(updates) => updateGoal(index, updates)}
              onRemove={() => removeGoal(index)}
            />
          </CollapsibleContent>
        </Collapsible>
      ))}
      <Button onClick={addGoal} className="w-full mt-2">
        Add Goal
      </Button>
    </div>
  );
};