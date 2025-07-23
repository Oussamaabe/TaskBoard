import { SignedIn, useUser } from "@clerk/clerk-react";
import Menu from "./Menu";
import Content from "./Content";

export default function Board({ nav }) {
  const { user } = useUser();

  if (user) {
    return (
      <SignedIn>
        <div className="d-flex w-100 justify-content-around">
          <Menu />
          <Content nav={nav} />
        </div>
      </SignedIn>
    );
  } else {
    return <p>Error</p>;
  }
}
