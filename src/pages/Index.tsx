import React from 'react';
import QuestEditor from '@/components/QuestEditor';
import UserManagement from '@/components/UserManagement';
import { QuestData } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { logout } = useAuth();
  const initialData: QuestData = {
    Quests: [],
    QuestGivers: []
  };

  const handleSave = (data: QuestData) => {
    console.log('Saving quest data:', data);
    const jsonString = JSON.stringify(data, null, 2);
    
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#6b6b6b' }}>
      <div className="p-4 flex justify-end">
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
      <div className="container mx-auto p-4">
        <Tabs defaultValue="quests">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quests">Quest Editor</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>
          <TabsContent value="quests">
            <QuestEditor
              initialData={initialData}
              onSave={handleSave}
            />
          </TabsContent>
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;