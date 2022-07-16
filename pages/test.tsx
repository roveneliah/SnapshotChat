import ForumPage from "../components/ForumPage";
import ProfilePage from "../components/ProfilePage";
import Web3Container from "../components/Web3Container";

export default function Home() {
  return (
    <Web3Container
      render={(props: any) => (
        <div className="snap flex w-[100vw] snap-x snap-mandatory">
          <div className="w-[100vw] shrink-0 snap-end">
            {ForumPage({ ...props, snapshotSpace: "krausehouse.eth" })}
          </div>
          <div className="w-[100vw] shrink-0 snap-start">
            <ProfilePage connection={props} />
          </div>
        </div>
      )}
    />
  );
}
