import React, { useState, useRef } from 'react';
import { PlayerQuestData } from '@/lib/types/progression';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

interface PlayerQuestEditorProps {
  initialData: PlayerQuestData;
  onSave: (data: PlayerQuestData) => void;
}

const PlayerQuestEditor: React.FC<PlayerQuestEditorProps> = ({ initialData, onSave }) => {
  const [questData, setQuestData] = useState<PlayerQuestData>(initialData);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    onSave(questData);
    toast({
      title: "Changes Saved",
      description: "Your player quest data has been saved successfully.",
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const selectedQuest = questData.Quests.find(q => q.Id === selectedQuestId);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 border-r bg-white">
        <div className="p-4 space-y-2 bg-[#737373]">
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
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-2 p-4">
            {questData.Quests.map((quest) => (
              <div
                key={quest.Id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedQuestId === quest.Id
                    ? 'bg-quest-selected text-quest-text'
                    : 'bg-quest-background text-quest-text hover:bg-quest-hover'
                }`}
                onClick={() => setSelectedQuestId(quest.Id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium truncate">
                    {quest.Id}
                  </span>
                </div>
                <span className="text-sm opacity-75 block truncate">
                  {quest.IsCompleted ? 'Completed' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
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
                    <Button onClick={handleSave}>
                      Save Changes
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Completion Status</Label>
                      <div className="text-lg font-medium">
                        {selectedQuest.IsCompleted ? 'Completed' : 'In Progress'}
                      </div>
                    </div>
                    <div>
                      <Label>Quest Type</Label>
                      <div className="text-lg font-medium">
                        {selectedQuest.Progression.QType}
                      </div>
                    </div>
                  </div>
                  {/* Display goals based on their types */}
                  {Object.entries(selectedQuest.Progression).map(([key, goals]) => {
                    if (key.endsWith('Goals') && typeof goals === 'object') {
                      return (
                        <div key={key} className="mt-4">
                          <h3 className="text-lg font-semibold mb-2">{key}</h3>
                          <div className="space-y-2">
                            {Object.entries(goals).map(([goalId, goal]) => (
                              <div key={goalId} className="p-2 bg-gray-100 rounded">
                                <div className="font-medium">{goal.Description || goalId}</div>
                                <div className="text-sm">
                                  Progress: {goal.Count}/{goal.MaxCount}
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
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
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