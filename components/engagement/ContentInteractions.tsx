import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ThumbsUp, Bookmark, Share2, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ContentInteractionsProps {
  contentId: string;
  contentType: 'article' | 'podcast' | 'event';
  initialLikes?: number;
  initialBookmarked?: boolean;
  onLike?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
  onComment?: () => void;
}

export function ContentInteractions({
  contentId,
  contentType,
  initialLikes = 0,
  initialBookmarked = false,
  onLike,
  onBookmark,
  onShare,
  onComment,
}: ContentInteractionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const handleLike = async () => {
    try {
      // TODO: Implement actual like functionality
      setIsLiked(!isLiked);
      setLikes(prev => isLiked ? prev - 1 : prev + 1);
      onLike?.();
      toast.success(isLiked ? 'Removed like' : 'Liked content');
    } catch (error) {
      toast.error('Failed to update like');
      console.error('Like error:', error);
    }
  };

  const handleBookmark = async () => {
    try {
      // TODO: Implement actual bookmark functionality
      setIsBookmarked(!isBookmarked);
      onBookmark?.();
      toast.success(isBookmarked ? 'Removed bookmark' : 'Bookmarked content');
    } catch (error) {
      toast.error('Failed to update bookmark');
      console.error('Bookmark error:', error);
    }
  };

  const handleShare = async () => {
    try {
      // TODO: Implement actual share functionality
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this content',
          text: `Check out this ${contentType} on THE SOFTWARE WITH`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
      }
      onShare?.();
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast.error('Failed to share content');
        console.error('Share error:', error);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex items-center gap-1",
              isLiked ? "text-primary" : ""
            )}
            onClick={handleLike}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{likes}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isLiked ? 'Unlike' : 'Like'}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex items-center gap-1",
              isBookmarked ? "text-primary" : ""
            )}
            onClick={handleBookmark}
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isBookmarked ? 'Remove bookmark' : 'Bookmark'}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={onComment}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Comment</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
} 