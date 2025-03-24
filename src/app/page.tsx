import { Card } from '@/shared/components/ui/card';
import { getUserWithAddresses, UserAddressList } from '@/features/user-address-list';
export default async function Home() {
    const users = await getUserWithAddresses();
    return (
        <main className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-5xl p-6">
                <div className="flex justify-center gap-4 mb-8">
                    <UserAddressList users={users} />
                </div>
            </Card>
        </main>
    );
}
