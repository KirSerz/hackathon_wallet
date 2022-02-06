import { Fluence, KeyPair } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { sendTx } from './_aqua/export';
import {ethers} from 'ethers';
import {createTx, createNodePk} from './logic';

// a node in Krasnodar network to connect to
const relay = krasnodar[4];

const sk = Buffer.from('imz+c5kodZw8tCHEPfKzDwixBbQBTdiNC6nqUbbYAgg=', 'base64');

async function main() {
    // Here is where we create our peer and connect to the network
    await Fluence.start({
        KeyPair: await KeyPair.fromEd25519SK(sk),
        connectTo: relay,
    });
    // console.log(createNodePk());
    let pk = '0x7d556a31d11efe64a99706815fb0628ca8578e77b7c04a8a5c9a3295f239210c';
    let wallet = new ethers.Wallet(pk);
    console.log('Loaded addres: ' + wallet.address);
    // TODO: get latest tx
    let tx = await createTx(wallet.address, '0x184f8d267CBD46F94fefE24597f21Aee53F829aa', 2, '0xb20ef37e74f703af67bcb7369078e309de46b8bcd71ce9aeb54458828487928b', pk);
    console.log(await sendTx(JSON.stringify(tx), '12D3KooWBecVqhrKqVkJ1ALtVTYRi5vmbqKxQiT2EfnNgNdBWzqS', '12D3KooWJd3HaMJ1rpLY1kQvcjRPEvnDwcXrH8mJvk7ypcZXqXGE'));
    
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', async () => {
        // Stopping the peer before exiting application \ unit test \ etc is a good practice
        await Fluence.stop();
        process.exit(0);
    });
}

main().catch((err) => console.error(err));
