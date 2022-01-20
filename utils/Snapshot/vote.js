import snapshot from '@snapshot-labs/snapshot.js';
import { Web3Provider } from '@ethersproject/providers';

import { either, equals } from 'ramda';
import { composeP } from '../functional';



export const vote = (provider) => async ({ proposalId, voteType, choice, }) => {
    if (!either(equals("basic"), equals("single-choice"))(voteType)) {
        console.log(`${voteType} not yet supported.`)   
        return;
    }
    
    const hub = 'https://hub.snapshot.org'; // or https://testnet.snapshot.org for testnet
    const client = new snapshot.Client712(hub);
    
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    console.log("CASTING VOTE");
    const receipt = await client.vote(provider, address, {
        space: 'delegates.krausehouse.eth',
        proposal: proposalId,
        type: voteType,
        choice,
        metadata: JSON.stringify({})
    });
    console.log("RECEIPT")
    console.log(receipt)
}