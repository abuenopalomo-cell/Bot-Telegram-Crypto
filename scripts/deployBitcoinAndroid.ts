import { Address, toNano } from '@ton/core';
import { BitcoinAndroidToken } from '../build/BitcoinAndroidToken/tact_BitcoinAndroidToken';
import { NetworkProvider } from '@ton/dev';

export async function run(provider: NetworkProvider) {
    // Dirección del dueño del token (tu propia cartera de TON)
    const owner = provider.sender().address as Address;

    // Inicializamos el contrato con el dueño y parámetros iniciales
    const bitcoinAndroid = provider.open(await BitcoinAndroidToken.fromInit(owner));

    // Ejecutamos la transacción de despliegue en la red blockchain
    await bitcoinAndroid.send(
        provider.sender(),
        {
            value: toNano('0.05'), // Pequeña cantidad en TON para pagar los costes de despliegue (gas)
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    // Esperamos a que el contrato esté completamente desplegado en la red
    await provider.waitForDeploy(bitcoinAndroid.address);

    console.log("¡Contrato desplegado con éxito en la dirección:", bitcoinAndroid.address.toString());
}
