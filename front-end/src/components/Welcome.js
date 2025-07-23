import React, { useEffect, useState } from "react";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import logo from "../Assets/logo.gif";
import getStarted from "../Assets/getStarted.webp";
import { ReactComponent as Fb } from "../Assets/facebook.svg";
import { ReactComponent as Insta } from "../Assets/instagram.svg";
import { ReactComponent as In } from "../Assets/linkedin.svg";
import { ReactComponent as Smile } from "../Assets/smile.svg";

export default function Welcome() {

  const pros = [
    {
      title: "Simple layoute",
      text: "Show only tasks assigned to you, or items marked as urgent. Break down any project in the way that’s most helpful to you.",
    },
    {
      title: "All-in-One package",
      text: "Show only tasks assigned to you, or items marked as urgent. Break down any project in the way that’s most helpful to you.",
    },
    {
      title: "Statistics",
      text: "Show only tasks assigned to you, or items marked as urgent. Break down any project in the way that’s most helpful to you.",
    },
  ];

  let [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : 0));
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [index]);

  return (
    <SignedOut>

      <div className="h-100">
        <nav className="z-3 navbar navbar-expand-lg bg-body-tertiary w-100 position-sticky top-0">
          <div className="container-fluid">
            <div className="d-flex gap-5">
              <a className="navbar-brand" href="/">
                <img src={logo} alt="TaskBoard logo" title="TaskBoard" />
                <span className="fw-bold">TaskBoard</span>
              </a>
              <div className="d-flex gap-3 HeaderLinks">
                <a className="nav-link fw-bold" href="/">
                  Home
                </a>
                <a className="nav-link fw-bold" href="#about">
                  About
                </a>
                <a className="nav-link fw-bold" href="/contact-us">
                  Contact us
                </a>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <span className="text-body-secondary">
                Log in or create a new account
              </span>
              <svg width="1" height="20">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100"
                  stroke="black"
                  stroke-width="1"
                />
              </svg>
              <SignInButton className="btn btn-dark" />
            </div>
          </div>
        </nav>
        <main className="text-center h-50 d-flex align-items-center justify-content-center">
          <section className="w-100">
            <h1 className="fw-bold p-2" style={{ fontSize: "80px" }}>
              Write,plan,organize
            </h1>
            <div className="text-center p-2 d-flex justify-content-center">
              <p className="fw-bold w-50">
                Plan your day with TaskBoard, make your tasks and notes palning
                easy
              </p>
            </div>
            <div>
              <span className="text-body-secondary p-2">
                Begin your success journey
              </span>
              <SignInButton className="text-decoration-underline border-0 bg-body link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" />
            </div>
          </section>
        </main>
        <article>
          <header>
            <div className="prosList d-flex justify-content-center gap-5">
              <div
                className={`iconWrapper ${index === 0 && "shadow"}`}
                onClick={() => setIndex(0)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/vweaucqr.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#ffffff"
                  style={{ width: "120px", height: "120px" }}
                ></lord-icon>
              </div>
              <div
                className={`iconWrapper ${index === 1 && "shadow"}`}
                onClick={() => setIndex(1)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/qxqvtswi.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#ffffff,tertiary:#000000"
                  style={{ width: "120px", height: "120px" }}
                ></lord-icon>
              </div>
              <div
                className={`iconWrapper ${index === 2 && "shadow"}`}
                onClick={() => setIndex(2)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/ofcynlwa.json"
                  trigger="hover"
                  colors="primary:#000000,secondary:#ffffff,tertiary:#ffffff,quaternary:#ffffff"
                  style={{ width: "120px", height: "120px" }}
                ></lord-icon>
              </div>
            </div>
          </header>
          <aside className="w-100 mt-5 text-center">
            <h1 className="fw-bold">{pros[index].title}</h1>
            <div className="d-flex justify-content-center">
              <p className="w-25 prosText" key={pros[index].title}>
                {pros[index].text}
              </p>
            </div>
          </aside>
        </article>

        <div className="mt-5 d-flex justify-content-center" id="about">
          <hr className="w-50" />
        </div>

        <section className="mt-5">
          <h1 className="text-center mb-3 fw-bold" style={{ fontSize: "50px" }}>
            About TaskBoard
          </h1>
          <div className="d-flex justify-content-center h-100">
            <p
              className="text-center w-50 lh-lg fw-lighter fst-italic"
              style={{ fontSize: "17px" }}
            >
              TaskBoard is a versatile organizational app designed to streamline
              your daily workflow by efficiently managing tasks and notes. With
              its intuitive interface, TaskBoard empowers users to create,
              prioritize, and track tasks seamlessly, ensuring nothing falls
              through the cracks. Whether you're juggling work projects, personal
              errands, or creative endeavors, TaskBoard provides the flexibility
              to customize boards, columns, and cards to suit your unique needs.
              Stay organized with drag-and-drop functionality, allowing you to
              effortlessly move tasks between different stages of completion.
              Additionally, TaskBoard seamlessly integrates note-taking
              capabilities, allowing users to capture ideas, insights, and
              reminders alongside their tasks. With TaskBoard, you'll never miss a
              deadline or forget an important detail, empowering you to stay
              focused, productive, and in control of your day.
            </p>
          </div>
        </section>

        <div className="mt-5 d-flex justify-content-center">
          <hr className="w-50" />
        </div>

        <section className="mt-5">
          <h1 className="text-center mb-3 fw-bold" style={{ fontSize: "50px" }}>
            Get started today
          </h1>
          <div className="text-center">
            <p className="fs-5">Play around with it first. Love it later.</p>
            <span className="text-body-secondary">Enter TaskBoard </span>
              <SignInButton className="btn btn-body text-decoration-underline" />
            <div>
              <img src={getStarted} alt="" />
              <hr className="m-0" />
            </div>
          </div>
        </section>

        <footer className="m-5 bg-body d-flex justify-content-around h-50">
          <div>
            <a className="navbar-brand" href="/">
              <img src={logo} alt="TaskBoard logo" title="TaskBoard" />
              <span className="fw-bold">TaskBoard</span>
            </a>
            <p className="text-body-secondary mt-3">
              <Smile />
              <span className="m-2">
                {new Date().getFullYear()} TaskBoard project
              </span>
            </p>
          </div>
          <div>
            <div className="d-flex gap-5">
              <a href="/">
                <Fb className="social-media" />
              </a>
              <a href="/">
                <Insta className="social-media" />
              </a>
              <a href="/">
                <In className="social-media" />
              </a>
            </div>
            <hr />
            <div>
              <a
                className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-body-secondary"
                href="/"
              >
                Home
              </a>
            </div>
            <div>
              <a
                className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-body-secondary"
                href="/contact-us"
              >
                Contact us
              </a>
            </div>
            <div>
              <a
                className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-body-secondary"
                href="/#about"
              >
                About
              </a>
            </div>
            <div>
              <a
                className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-body-secondary"
                href="/"
              >
                Feedback
              </a>
            </div>
          </div>
        </footer>
      </div>
    </SignedOut>
  );
}
