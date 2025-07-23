import React from "react";
import { UserButton, useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  const { isSignedIn, userId } = useAuth();

  const { user } = useUser();

  if (isSignedIn) {
    // const email = user.primaryEmailAddress.emailAddress;
    let fullName;

    if (fullName) {
      fullName = user.fullName;
    } else {
      fullName = user.username;
    }
    return (
      <div style={{ width: "20%" }}>
        <div className="d-flex align-items-center gap-2 m-5">
          <UserButton />
          <p className="fw-bold m-0 text-uppercase">{fullName}</p>
        </div>
        <div>
          <div>
            <p onClick={() => navigate(`/`)}>Tasks</p>
          </div>
          <div>
            <p onClick={() => navigate(`/notes/${userId}`)}>Notes</p>
          </div>
          <div>
            <p onClick={() => navigate(`/statistics/${userId}`)}>
              Statistics
            </p>
          </div>
        </div>
      </div>
    );
  }
}
