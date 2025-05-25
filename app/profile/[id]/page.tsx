import { UserProfile } from '@/components/engagement/UserProfile';
import { NewsletterSignup } from '@/components/engagement/NewsletterSignup';

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  // TODO: Fetch user data based on ID
  const isCurrentUser = false; // TODO: Compare with authenticated user

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <UserProfile userId={params.id} isEditable={isCurrentUser} />
        </div>
        <div className="space-y-6">
          <NewsletterSignup />
          {/* Add more sidebar widgets here */}
        </div>
      </div>
    </div>
  );
} 