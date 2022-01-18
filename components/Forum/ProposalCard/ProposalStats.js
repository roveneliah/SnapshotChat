import { PercentageBar } from "../../Generics/PercentageBar";

export const ProposalStats = (overview) => {
    // sample dummy prop
    overview = {
        memberSupport: Math.random(),
        tokenWeightedSupport: Math.random(),
    }
    const {memberSupport, tokenWeightedSupport} = overview;

    return (
        <div className="flex flex-col space-y-5 w-full justify-evenly">
            {memberSupport && <PercentageBar title="Member Support" percentage={memberSupport} />}
            {tokenWeightedSupport && <PercentageBar title="Token Weighted Support" percentage={tokenWeightedSupport} />}
        </div>
    )
}