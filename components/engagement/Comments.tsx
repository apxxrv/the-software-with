import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageSquare, Flag, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  isModerated: boolean;
  replies?: Comment[];
}

interface CommentsProps {
  contentId: string;
  contentType: 'article' | 'podcast';
  isModerator?: boolean;
}

export function Comments({ contentId, contentType, isModerator = false }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    try {
      // TODO: Implement actual comment submission
      const comment: Comment = {
        id: Date.now().toString(),
        content: newComment,
        author: {
          id: 'user-1', // TODO: Get from auth context
          name: 'Current User',
        },
        createdAt: new Date().toISOString(),
        likes: 0,
        isModerated: false,
      };
      
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModerateComment = async (commentId: string) => {
    // TODO: Implement moderation logic
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? { ...comment, isModerated: !comment.isModerated }
          : comment
      )
    );
  };

  const handleLikeComment = async (commentId: string) => {
    // TODO: Implement like logic
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const CommentCard = ({ comment }: { comment: Comment }) => (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={comment.author.avatar} />
            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{comment.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {isModerator && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleModerateComment(comment.id)}>
                {comment.isModerated ? 'Approve Comment' : 'Moderate Comment'}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete Comment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm">
            {comment.isModerated ? (
              <span className="italic text-muted-foreground">
                [This comment has been moderated]
              </span>
            ) : (
              comment.content
            )}
          </p>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
              onClick={() => handleLikeComment(comment.id)}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{comment.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>Reply</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <Flag className="h-4 w-4" />
              <span>Report</span>
            </Button>
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-8 space-y-4">
              {comment.replies.map(reply => (
                <CommentCard key={reply.id} comment={reply} />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Comments</h3>
        <div className="space-y-4">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button
            onClick={handleSubmitComment}
            disabled={isSubmitting || !newComment.trim()}
          >
            Post Comment
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map(comment => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
} 