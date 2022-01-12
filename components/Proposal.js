

export const Proposal = (setSelectedProposal) => ({ title, author, id, body }) => (
    <>
      <h2 onClick={() => setSelectedProposal(id)}>{title}</h2>
      <h5>{author}</h5>
      <a href={`https://snapshot.org/#/krausehouse.eth/proposal/${id}`}>
        View on Snapshot
      </a>
      <br/>
      <button onClick={() => setSelectedProposal(id)}>Select</button>
      <br/><br/> 
    </>
  )