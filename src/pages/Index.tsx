
import React from 'react';
import QuestEditor from '@/components/QuestEditor';
import PlayerQuestEditor from '@/components/PlayerQuestEditor';
import { QuestData } from '@/lib/types';
import { PlayerQuestData } from '@/lib/types/progression';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";

const Index = () => {
  const { logout } = useAuth();
  const initialQuestData: QuestData = {
    Quests: [],
    QuestGivers: []
  };

  const initialPlayerQuestData: PlayerQuestData = {
    Quests: [],
    Kills: {},
    CompletedQuests: [],
    ActionQuests: {}
  };

  // Helper function to fix missing fields in quests
  const fixQuestData = (data: QuestData): QuestData => {
    return {
      ...data,
      Quests: data.Quests.map(quest => ({
        ...quest,
        // Add missing Blacklist property if it doesn't exist
        Blacklist: quest.Blacklist || [],
        // Force-cast components to ensure they're properly rendered
        Name: quest.Name || '',
        Description: quest.Description || '',
        Id: quest.Id || ''
      }))
    };
  };

  const handleQuestSave = (data: QuestData) => {
    console.log('Saving quest data:', data);
    // Apply fix before saving to ensure consistent data structure
    const fixedData = fixQuestData(data);
    const jsonString = JSON.stringify(fixedData, null, 2);
    
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quests.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePlayerQuestSave = (data: PlayerQuestData) => {
    console.log('Saving player quest data:', data);
    const jsonString = JSON.stringify(data, null, 2);
    
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'player-quests.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 flex justify-end">
        <Button 
          variant="outline" 
          onClick={logout}
          className="flex items-center gap-2 hover:bg-card"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
      <div className="container mx-auto p-4">
        <Tabs defaultValue="quest-editor" className="space-y-4">
          <TabsList className="w-full bg-card/60 backdrop-blur-sm">
            <TabsTrigger value="quest-editor" className="flex-1">Quest Editor</TabsTrigger>
            <TabsTrigger value="player-quest-editor" className="flex-1">Player Quest Editor</TabsTrigger>
          </TabsList>
          <TabsContent value="quest-editor">
            <QuestEditor
              initialData={initialQuestData}
              onSave={handleQuestSave}
            />
          </TabsContent>
          <TabsContent value="player-quest-editor">
            <PlayerQuestEditor
              initialData={initialPlayerQuestData}
              onSave={handlePlayerQuestSave}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
