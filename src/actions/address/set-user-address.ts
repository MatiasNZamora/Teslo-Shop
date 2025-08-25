'use server';

import { Address } from "../../interfaces";
import { prisma } from "../../lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
    try {
        const newAddres = await createOrReplaceAddress(address, userId);

        return {
            ok: true,
            address: newAddres,
        }

    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo grabar la direccion'
        }
    }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
    try {

        // busqueda del address
        const storedAddress = await prisma.userAddress.findUnique({
            where: { userId },
        });

        const addressToSave = {
            userId: userId,
            address: address.address,
            address2: address.address2,
            countryId: address.country,
            city: address.city,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
        };

        if (!storedAddress) {
            const newAddress = await prisma.userAddress.create({
                data: addressToSave,
            });

            // console.log(newAddress)
            return newAddress;
        }
        // actualizacion del address
        const updatedAddres = await prisma.userAddress.update({
            where: { userId },
            data: addressToSave,
        });

        return updatedAddres;

    } catch (error) {
        console.log(error);
        throw new Error('no se pudo grabar')
    };
};