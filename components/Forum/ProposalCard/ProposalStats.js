import { view } from "ramda";
import { useState } from "react";

import { PercentageBar } from "../../Generics/PercentageBar";
import { NavBar } from "../../Header/NavBar";
import { RelevantSigners } from "./RelevantSigners";
import { Timeline } from "./Timeline";
import { head } from "../../../utils/functional";

const Overview = ({memberSupport = Math.random(), tokenWeightedSupport=Math.random() }) => (
    <>
        {memberSupport && <PercentageBar title="Member Support" percentage={memberSupport} />}
        {tokenWeightedSupport && <PercentageBar title="Token Weighted Support" percentage={tokenWeightedSupport} />}
    </>
)

export const ProposalStats = () => {
    
    const views = {
        "Overview": <Overview />,
        "Timeline": <Timeline />,
        "Signatures": <RelevantSigners />,
    }
    const navItems = Object.keys(views).map((title) => ({ title, onClick: () => setSelectedView(title) }));
    
    const [selectedView, setSelectedView] = useState(head(Object.keys(views)));
    
    return (
        <div className="flex flex-col space-y-5 w-full justify-evenly">
            <NavBar navItems={navItems} />
            {views[selectedView]}
        </div>
    )
}