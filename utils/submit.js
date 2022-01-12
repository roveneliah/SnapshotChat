
export const submit = (signer) => async (msg) => {
    // check if this person has a token balance
    const signature = await signer.signMessage(msg);
    console.log(signature);
    console.log(ethers.utils.verifyMessage(msg, signature));
}

export const submitPost = (signer) => async (postText) => {
    // what checks do we want to do on this?
    // even if something got in db, we could prune it out
    // we want to make sure it's really the person who claims is connected, which requires signature for db
    const signature = await signer.signMessage(JSON.stringify({
      author: await signer.getAddress(),
      body: postText
    }));
    // post into a firebase db with { message, author, signature (to verify)}
}