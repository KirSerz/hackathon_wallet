import { Fluence, KeyPair } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { sendTx } from './_aqua/export';

// a node in Krasnodar network to connect to
const relay = krasnodar[4];

const sk = Buffer.from('imz+c5kodZw8tCHEPfKzDwixBbQBTdiNC6nqUbbYAgg=', 'base64');

async function main() {
    // Here is where we create our peer and connect to the network
    await Fluence.start({
        KeyPair: await KeyPair.fromEd25519SK(sk),
        connectTo: relay,
    });

    await sendTx('some', '12D3KooWBecVqhrKqVkJ1ALtVTYRi5vmbqKxQiT2EfnNgNdBWzqS', '12D3KooWJd3HaMJ1rpLY1kQvcjRPEvnDwcXrH8mJvk7ypcZXqXGE');
    
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', async () => {
        // Stopping the peer before exiting application \ unit test \ etc is a good practice
        await Fluence.stop();
        process.exit(0);
    });
}

main().catch((err) => console.error(err));
