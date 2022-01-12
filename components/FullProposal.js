import Markdown from 'markdown-to-jsx'

// REFACTOR
export const FullProposal = ({ proposal }) => (
  <div>
    <h1>{proposal.title}</h1>
    <Markdown>{proposal.body}</Markdown>
  </div>
);