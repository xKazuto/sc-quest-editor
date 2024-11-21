import React from 'react';
import { PlayerQuest, QuestGoal } from '@/lib/types/progression';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface QuestProgressContentProps {
  selectedQuest: PlayerQuest | undefined;
  handleUpdateGoalProgress: (goalKey: string, goalId: string, newCount: number) => void;
}

export const QuestProgressContent: React.FC<QuestProgressContentProps> = ({
  selectedQuest,
  handleUpdateGoalProgress,
}) => {
  if (!selectedQuest) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a quest to view its progress
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Quest: {selectedQuest.Id}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Completion Status</label>
            <div className="text-lg font-medium">
              {selectedQuest.IsCompleted ? 'Completed' : 'In Progress'}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Quest Type</label>
            <div className="text-lg font-medium">
              {selectedQuest.Progression.QType}
            </div>
          </div>
        </div>
        {Object.entries(selectedQuest.Progression).map(([key, goals]) => {
          if (key.endsWith('Goals') && typeof goals === 'object' && goals !== null) {
            return (
              <div key={key} className="mt-4">
                <h3 className="text-lg font-semibold mb-2">{key}</h3>
                <div className="space-y-2">
                  {Object.entries(goals as Record<string, QuestGoal>).map(([goalId, goal]) => (
                    <div key={goalId} className="p-2 bg-gray-100 rounded">
                      <div className="font-medium">{goal.Description || goalId}</div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={goal.Count}
                          min={0}
                          max={goal.MaxCount}
                          onChange={(e) => handleUpdateGoalProgress(key, goalId, parseInt(e.target.value))}
                          className="w-24"
                        />
                        <span className="text-sm">
                          / {goal.MaxCount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </CardContent>
    </Card>
  );
};