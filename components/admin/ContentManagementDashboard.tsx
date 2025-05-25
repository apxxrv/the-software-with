import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileEdit, Clock, Upload } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  status: 'draft' | 'published' | 'scheduled';
  type: 'article' | 'podcast' | 'event';
  createdAt: string;
  scheduledFor?: string;
}

export function ContentManagementDashboard() {
  const [activeTab, setActiveTab] = useState('articles');
  const [content, setContent] = useState<ContentItem[]>([]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Button className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          Create New
        </Button>
      </div>

      <Tabs defaultValue="articles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Content cards will be mapped here */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sample Article</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <FileEdit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Clock className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Status: Draft
                </div>
                <div className="text-sm text-muted-foreground">
                  Created: {new Date().toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="podcasts" className="space-y-4">
          {/* Podcast content management UI */}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {/* Events content management UI */}
        </TabsContent>
      </Tabs>
    </div>
  );
} 