import { redirect } from 'next/navigation';
import { auth } from '../../../auth.config';
import { Title } from '../../../components/ui/title/Title';
import { ProfileCard } from './ProfileCard';

export default async function ProfilePage() {

    const session = await auth();

    if (!session?.user) redirect('/');

    const { name, email, role, image } = session.user;

    return (
        <div className="max-w-4xl mx-auto px-6 pb-20">

            <Title title="Perfil" subtitle="Gestioná tu información personal" />

            <div className="mt-12">
                <ProfileCard
                    name={name}
                    email={email}
                    role={role}
                    image={image}
                />
            </div>

        </div>
    );
}
