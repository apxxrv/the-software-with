import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichMediaUpload } from "@/components/admin/RichMediaUpload";
import { Bookmark, ThumbsUp, MessageSquare, Edit2 } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar?: string;
  contributions: {
    articles: number;
    comments: number;
    likes: number;
  };
  joinedAt: string;
}

interface UserProfileProps {
  userId: string;
  isEditable?: boolean;
}

export function UserProfile({ userId, isEditable = false }: UserProfileProps) {
  const [profile, setProfile] = useState<UserProfile>({
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software engineer and tech enthusiast',
    contributions: {
      articles: 5,
      comments: 23,
      likes: 156,
    },
    joinedAt: new Date().toISOString(),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSaveProfile = async () => {
    // TODO: Implement profile update logic
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleAvatarUpload = (url: string) => {
    setEditedProfile(prev => ({ ...prev, avatar: url }));
  };

  const ProfileContent = () => (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback className="text-2xl">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {isEditable && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-0 right-0 rounded-full"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex-1 space-y-1">
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <p className="text-sm">Member since {new Date(profile.joinedAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{profile.contributions.articles}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{profile.contributions.comments}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{profile.contributions.likes}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Bio</h3>
        <p className="text-sm text-muted-foreground">{profile.bio}</p>
      </div>
    </div>
  );

  const EditProfileForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={editedProfile.name}
            onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={editedProfile.email}
            onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={editedProfile.bio}
            onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <RichMediaUpload
            onUploadComplete={handleAvatarUpload}
            acceptedFileTypes={['image/*']}
            type="image"
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <Button onClick={handleSaveProfile}>Save Changes</Button>
        <Button variant="outline" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          {isEditing ? <EditProfileForm /> : <ProfileContent />}
        </TabsContent>

        <TabsContent value="activity">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            {/* TODO: Implement activity feed */}
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        </TabsContent>

        <TabsContent value="bookmarks">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Saved Content</h3>
            {/* TODO: Implement bookmarks list */}
            <p className="text-sm text-muted-foreground">No bookmarks yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 