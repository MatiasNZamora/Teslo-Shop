import { redirect } from 'next/navigation';
import { auth } from '../../../auth.config';
import { Title } from '../../../components/ui/title/Title';

export default async function PorfilePage() {
    
    const session = await auth();
    
    if( !session?.user) redirect('/');

    return (
        <div>
            <Title title="Perfil" />
            
            <pre>
                {
                    JSON.stringify( session.user, null, 2 )
                }
            </pre>
                <h3 className='text-3xl mb-10' > { session.user.role } </h3>
            
        </div>
    )
};