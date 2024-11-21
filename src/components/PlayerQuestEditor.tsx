import React, { useState, useRef } from 'react';
import { PlayerQuestData, QuestGoal } from '@/lib/types/progression';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlayerQuestSidebar } from './player-quest/PlayerQuestSidebar';

interface PlayerQuestEditorProps {
  initialData: PlayerQuestData;
  onSave: (data: PlayerQuestData) => void;
}

const PlayerQuestEditor: React.FC<PlayerQuestEditorProps> = ({ initialData, onSave }) => {
  const [questData, setQuestData] = useState<PlayerQuestData>(initialData);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string>("player-quests.json");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCurrentFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setQuestData(json);
          toast({
            title: "File Loaded",
            description: "Player quest data has been loaded successfully.",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to parse JSON file.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSave = () => {
    const jsonString = JSON.stringify(questData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Changes Saved",
      description: "Your player quest data has been saved successfully.",
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteQuest = (questId: string) => {
    setQuestData(prev => ({
      ...prev,
      Quests: prev.Quests.filter(q => q.Id !== questId),
      CompletedQuests: prev.CompletedQuests.filter(id => id !== questId)
    }));
    setSelectedQuestId(null);
    toast({
      title: "Quest Deleted",
      description: "The quest has been removed from your data.",
    });
  };

  const handleUpdateGoalProgress = (goalKey: string, goalId: string, newCount: number) => {
    setQuestData(prev => ({
      ...prev,
      Quests: prev.Quests.map(quest => {
        if (quest.Id === selectedQuestId) {
          const goals = quest.Progression[goalKey] as Record<string, QuestGoal>;
          if (goals && goals[goalId]) {
            const updatedGoals = {
              ...goals,
              [goalId]: {
                ...goals[goalId],
                Count: Math.min(Math.max(0, newCount), goals[goalId].MaxCount)
              }
            };
            return {
              ...quest,
              Progression: {
                ...quest.Progression,
                [goalKey]: updatedGoals
              }
            };
          }
        }
        return quest;
      })
    }));
  };

  const selectedQuest = questData.Quests.find(q => q.Id === selectedQuestId);

  return (
    <div className="flex h-screen bg-gray-100">
      <PlayerQuestSidebar
        onUploadClick={handleUploadClick}
        onSave={handleSave}
        fileInputRef={fileInputRef}
        quests={questData.Quests}
        selectedQuestId={selectedQuestId}
        onSelectQuest={setSelectedQuestId}
        onDeleteQuest={handleDeleteQuest}
      />
      <div className="flex-1 p-6 overflow-auto bg-[#737373]">
        <Tabs defaultValue="quest">
          <TabsList>
            <TabsTrigger value="quest">Quest Progress</TabsTrigger>
            <TabsTrigger value="kills">Kill Records</TabsTrigger>
          </TabsList>
          <TabsContent value="quest">
            {selectedQuest ? (
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
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a quest to view its progress
              </div>
            )}
          </TabsContent>
          <TabsContent value="kills">
            <Card>
              <CardContent className="space-y-4 p-4">
                <div className="flex justify-between mb-6">
                  <h2 className="text-2xl font-bold">Kill Records</h2>
                </div>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-2">
                    {Object.entries(questData.Kills).map(([className, record]) => (
                      <div key={className} className="p-2 bg-gray-100 rounded flex justify-between items-center">
                        <span className="font-medium">{className}</span>
                        <span className="text-lg">{record.Count} kills</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlayerQuestEditor;