import { Card } from '@/shared/components/ui/card';
import { UserAddressList, getUserWithAddresses } from '@/widgets/users-addresses';
import { Suspense } from 'react';

export default async function Home() {
    const users = await getUserWithAddresses();
    return (
        <main className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-5xl p-6">
                <div className="flex justify-center gap-4 mb-8">
                    <Suspense fallback={<div>Loading...</div>}>
                        <UserAddressList users={users} />
                    </Suspense>
                </div>
            </Card>
        </main>
    );
}
