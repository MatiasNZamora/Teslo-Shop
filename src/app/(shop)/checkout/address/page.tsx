import { titleFont } from '../../../../config/fonts';
import { Title } from '../../../../components';
import AddressForm from './ui/AddressForm';
import { getCountries, getUserAddres } from '../../../../actions';
import { auth } from '../../../../auth.config';

export default async function AddressPage() {

    const countries = await getCountries();

    const session = await auth();
    if(!session.user) {
        <h3 className='text-5xl'> 500 - No hay session de usuario </h3>
    };

    const userAddress = await getUserAddres(session.user.id);
    return (
        <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

            <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
                <Title className={ titleFont.className } title="Dirección" subtitle="Dirección de entrega" />
                <AddressForm countries={ countries } userStoreAddres={ userAddress } />
            </div>

        </div>
    );
};