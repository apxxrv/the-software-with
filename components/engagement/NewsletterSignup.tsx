import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface NewsletterSignupProps {
  onSuccess?: () => void;
  className?: string;
}

export function NewsletterSignup({ onSuccess, className }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    articles: true,
    podcasts: true,
    events: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // TODO: Implement actual newsletter signup
      // This is where you'd integrate with Mailchimp, Resend, or your email service
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success('Successfully subscribed to the newsletter!');
      setEmail('');
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
      console.error('Newsletter signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Stay Updated</CardTitle>
        <CardDescription>
          Subscribe to our newsletter for the latest articles, podcasts, and events.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>I'm interested in:</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="articles"
                  checked={preferences.articles}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({ ...prev, articles: checked as boolean }))
                  }
                />
                <Label htmlFor="articles" className="text-sm font-normal">
                  Articles
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="podcasts"
                  checked={preferences.podcasts}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({ ...prev, podcasts: checked as boolean }))
                  }
                />
                <Label htmlFor="podcasts" className="text-sm font-normal">
                  Podcasts
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="events"
                  checked={preferences.events}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({ ...prev, events: checked as boolean }))
                  }
                />
                <Label htmlFor="events" className="text-sm font-normal">
                  Events
                </Label>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Subscribing...' : 'Subscribe to Newsletter'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </form>
      </CardContent>
    </Card>
  );
} 