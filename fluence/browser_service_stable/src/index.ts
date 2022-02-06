import { Fluence, KeyPair } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { registerNodeValidatorService, sendTx } from './_aqua/export';

// a node in Krasnodar network to connect to
const relay = krasnodar[4];

// private key for own peer
// NOTE: please, create a new one with `npx aqua create_keypair` command
// dummy one:
// {
//     "peerId": "12D3KooWBecVqhrKqVkJ1ALtVTYRi5vmbqKxQiT2EfnNgNdBWzqS",
//     "secretKey": "imz+c5kodZw8tCHEPfKzDwixBbQBTdiNC6nqUbbYAgg=",
//     "publicKey": "CAESIBs3xJRa6qbq8oHfmVpxb3zPq0R9uxA/0nCQgvQm2M9l"
// }
const sk = Buffer.from('imz+c5kodZw8tCHEPfKzDwixBbQBTdiNC6nqUbbYAgg=', 'base64');

async function main() {
    // Here is where we create our peer and connect to the network
    await Fluence.start({
        KeyPair: await KeyPair.fromEd25519SK(sk),
        connectTo: relay,
    });

    // Fluence.getStatus() returns useful information about peer and it's connection
    console.log('own peer id: ', Fluence.getStatus().peerId);
    console.log('connected to relay: ', Fluence.getStatus().relayPeerId);
    console.log('---\n');

    registerNodeValidatorService({
        receive_tx: (str) => {
            // somebody sent us tx
            
            console.log(str);
        },
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', async () => {
        // Stopping the peer before exiting application \ unit test \ etc is a good practice
        await Fluence.stop();
        process.exit(0);
    });
}

main().catch((err) => console.error(err));
