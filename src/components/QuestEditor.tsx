import React, { useState, useRef } from 'react';
import { Quest, QuestData, QuestGiver } from '@/lib/types';
import QuestList from './QuestList';
import QuestForm from './QuestForm';
import QuestGiverEditor from './QuestGiverEditor';
import { createEmptyQuest } from '@/lib/questValidation';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface QuestEditorProps {
  initialData: QuestData;
  onSave: (data: QuestData) => void;
}

const QuestEditor: React.FC<QuestEditorProps> = ({ initialData, onSave }) => {
  const [questData, setQuestData] = useState<QuestData>(initialData);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddQuest = () => {
    const newQuest = createEmptyQuest();
    setQuestData(prev => ({
      ...prev,
      Quests: [...prev.Quests, newQuest]
    }));
    setSelectedQuestId(newQuest.Id);
    toast({
      title: "New Quest Added",
      description: "Start editing your new quest!",
    });
  };

  const handleRemoveQuest = (questId: string) => {
    setQuestData(prev => ({
      ...prev,
      Quests: prev.Quests.filter(q => q.Id !== questId)
    }));
    if (selectedQuestId === questId) {
      setSelectedQuestId(null);
    }
    toast({
      title: "Quest Removed",
      description: "The quest has been deleted.",
      variant: "destructive",
    });
  };

  const handleQuestChange = (updatedQuest: Quest) => {
    setQuestData(prev => ({
      ...prev,
      Quests: prev.Quests.map(q => {
        if (q.Id === selectedQuestId) {
          // If the ID is being updated, update the selectedQuestId as well
          if (updatedQuest.Id !== q.Id) {
            setSelectedQuestId(updatedQuest.Id);
          }
          return updatedQuest;
        }
        return q;
      })
    }));
  };

  const handleSave = () => {
    onSave(questData);
    toast({
      title: "Changes Saved",
      description: "Your quest data has been saved successfully.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setQuestData(json);
          toast({
            title: "File Loaded",
            description: "Quest data has been loaded successfully.",
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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleQuestGiversUpdate = (newQuestGivers: QuestGiver[]) => {
    setQuestData(prev => ({
      ...prev,
      QuestGivers: newQuestGivers
    }));
  };

  const selectedQuest = questData.Quests.find(q => q.Id === selectedQuestId);

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 border-r bg-background border-border">
        <div className="p-4 space-y-2">
          <Button onClick={handleAddQuest} className="w-full">
            Add New Quest
          </Button>
          <Button onClick={handleUploadClick} variant="outline" className="w-full">
            Load JSON File
          </Button>
          <Input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
        <QuestList
          quests={questData.Quests}
          selectedQuestId={selectedQuestId}
          onSelectQuest={setSelectedQuestId}
          onRemoveQuest={handleRemoveQuest}
        />
      </div>
      <div className="flex-1 p-6 overflow-auto bg-background">
        <Tabs defaultValue="quests" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="quests">Quests</TabsTrigger>
            <TabsTrigger value="questgivers">Quest Givers</TabsTrigger>
          </TabsList>
          <TabsContent value="quests">
            {selectedQuest ? (
              <>
                <div className="flex justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Editing Quest: {selectedQuest.Name || 'Unnamed Quest'}
                  </h2>
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
                <QuestForm
                  quest={selectedQuest}
                  onChange={handleQuestChange}
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select a quest to edit or create a new one
              </div>
            )}
          </TabsContent>
          <TabsContent value="questgivers">
            <div className="space-y-4">
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Quest Givers</h2>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
              <QuestGiverEditor
                questGivers={questData.QuestGivers}
                onUpdate={handleQuestGiversUpdate}
                availableQuestIds={questData.Quests.map(q => q.Id)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QuestEditor;
