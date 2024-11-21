import React, { useState, useRef } from 'react';
import { PlayerQuestData, QuestGoal } from '@/lib/types/progression';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlayerQuestSidebar } from './player-quest/PlayerQuestSidebar';
import { QuestProgressContent } from './player-quest/QuestProgressContent';
import { KillRecordsContent } from './player-quest/KillRecordsContent';

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
          const content = e.target?.result;
          if (typeof content === 'string') {
            const json = JSON.parse(content);
            setQuestData(json);
            toast({
              title: "File Loaded",
              description: "Player quest data has been loaded successfully.",
            });
          }
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
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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

  return (
    <div className="flex h-screen bg-background">
      <PlayerQuestSidebar
        onUploadClick={handleUploadClick}
        onSave={handleSave}
        fileInputRef={fileInputRef}
        handleFileUpload={handleFileUpload}
        quests={questData.Quests}
        selectedQuestId={selectedQuestId}
        onSelectQuest={setSelectedQuestId}
        onDeleteQuest={handleDeleteQuest}
      />
      <div className="flex-1 p-6 overflow-auto bg-background">
        <Tabs defaultValue="quest" className="w-full">
          <TabsList className="bg-card text-card-foreground">
            <TabsTrigger value="quest">Quest Progress</TabsTrigger>
            <TabsTrigger value="kills">Kill Records</TabsTrigger>
          </TabsList>
          <TabsContent value="quest">
            <QuestProgressContent
              selectedQuest={questData.Quests.find(q => q.Id === selectedQuestId)}
              handleUpdateGoalProgress={handleUpdateGoalProgress}
            />
          </TabsContent>
          <TabsContent value="kills">
            <KillRecordsContent kills={questData.Kills} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlayerQuestEditor;