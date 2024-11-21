import React from 'react';
import { KillRecord } from '@/lib/types/progression';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface KillRecordsContentProps {
  kills: Record<string, KillRecord>;
}

export const KillRecordsContent: React.FC<KillRecordsContentProps> = ({ kills }) => {
  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Kill Records</h2>
        </div>
        <ScrollArea className="h-[600px]">
          <div className="space-y-2">
            {Object.entries(kills).map(([className, record]) => (
              <div key={className} className="p-2 bg-gray-100 rounded flex justify-between items-center">
                <span className="font-medium">{className}</span>
                <span className="text-lg">{record.Count} kills</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};