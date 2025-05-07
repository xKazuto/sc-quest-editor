
import { useState, useCallback } from 'react';
import { Quest, QuestData, QuestGiver } from '@/lib/types';
import { createEmptyQuest } from '@/lib/questValidation';
import { useToast } from "@/components/ui/use-toast";

export const useQuestEditor = (initialData: QuestData, onSave: (data: QuestData) => void) => {
  const [questData, setQuestData] = useState<QuestData>(initialData);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Helper function to fix missing fields in quests
  const fixQuestData = (data: QuestData): QuestData => {
    return {
      ...data,
      Quests: data.Quests.map(quest => ({
        ...quest,
        // Add missing Blacklist property if it doesn't exist
        Blacklist: quest.Blacklist || []
      }))
    };
  };

  const handleAddQuest = useCallback(() => {
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
  }, [toast]);

  const handleRemoveQuest = useCallback((questId: string) => {
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
  }, [selectedQuestId, toast]);

  const handleQuestChange = useCallback((updatedQuest: Quest) => {
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
  }, [selectedQuestId]);

  const handleSave = useCallback(() => {
    onSave(questData);
    toast({
      title: "Changes Saved",
      description: "Your quest data has been saved successfully.",
    });
  }, [questData, onSave, toast]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          // Fix missing fields in loaded JSON
          const fixedJson = fixQuestData(json);
          
          // Reset selectedQuestId to avoid references to quests that might not exist in the new data
          setSelectedQuestId(null);
          
          // Update quest data with fixed JSON
          setQuestData(fixedJson);
          
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
  }, [toast]);

  const handleQuestGiversUpdate = useCallback((newQuestGivers: QuestGiver[]) => {
    setQuestData(prev => ({
      ...prev,
      QuestGivers: newQuestGivers
    }));
  }, []);

  const selectedQuest = questData.Quests.find(q => q.Id === selectedQuestId);

  return {
    questData,
    selectedQuest,
    selectedQuestId,
    handleAddQuest,
    handleRemoveQuest,
    handleQuestChange,
    handleSave,
    handleFileUpload,
    handleQuestGiversUpdate,
    setSelectedQuestId
  };
};
