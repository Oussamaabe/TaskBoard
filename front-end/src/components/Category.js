import React, { useState } from "react";
import GetCategories from "../hooks/GetCategories";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import GetTasks from "../hooks/GetTasks";
import Swal from "sweetalert2";
//npm i react-hot-toast
import toast, { Toaster } from "react-hot-toast";

export default function Category() {
  const categories = GetCategories();

  const { userId } = useAuth();

  const clickedCateg = useSelector((data) => data.categ);

  const allTasks = GetTasks();

  const [index, setIndex] = useState(-1);
  const [showForm, setshowForm] = useState(false);

  const [categToMod, setcategToMod] = useState("");
  const [oldCateg, setOldCateg] = useState("");

  const dispatch = useDispatch();

  function HandleChangeCateg(e, categ) {
    setOldCateg(categ);
    setcategToMod(e.target.value);
  }

  function EditCategory(e) {
    e.preventDefault();
    const isCategExist = categories.filter(
      (categ) => categ.nameCategory === categToMod && categ.userId === userId
    );

    if (categToMod === "") {
      toast.error("Rename your category");
    } else if (isCategExist.length !== 0 || categToMod === "all") {
      toast.error("This category already exist");
    } else {
      axios.put(`http://localhost:8000/api/categories/${oldCateg}/${userId}`, {
        nameCategory: categToMod,
      });
      window.location.reload();
    }
  }

  function DeleteCategory(e, categToDlt) {
    e.preventDefault();

    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to delete this category? all tasks asigned to this category will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(
          `http://localhost:8000/api/categories/${categToDlt}/${userId}`
        )
        window.location.reload()
      }
    });
  }

  function nbreTasksByCateg(chosenCateg) {
    if (allTasks !== "load") {
      if (chosenCateg === "all") {
        return allTasks.filter((task) =>task.userId === userId).length;
      } else {
        return allTasks.filter((task) =>task.userId === userId && task.nameCategory === chosenCateg)
          .length;
      }
    }
  }

  if (categories === "load") {
    return <div className="loader1"></div>;
  } else {
    const categs = categories.filter(
      (categorie) => categorie.userId === userId
    );
    return (
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <div
          className="d-flex align-items-center gap-3 overflow-x-scroll"
          style={{ height: "80px", scrollbarWidth: "thin" }}
        >
          <div
            className={
              index === -1 &&
              clickedCateg === "all" &&
              "fw-bold  bg-body-secondary "
            }
            id="categStyle"
            style={{ height: "40px" }}
            onClick={() => {
              setIndex(-1);
              dispatch({
                type: "storeCateg",
                payload: "all",
              });
            }}
          >
            <span>All</span>
            <span
              className="fw-lighter bg-primary-subtle text-secondary p-2 pt-0 pb-0"
              style={{ fontSize: "14px", borderRadius: "100px" }}
            >
              {nbreTasksByCateg("all")}
            </span>
          </div>
          {categs.length !== 0 &&
            categs.map((categorie, i) => (
              <div
                className={
                  (i === index || categorie.nameCategory === clickedCateg) &&
                  "fw-bold  bg-body-secondary "
                }
                id="categStyle"
                key={i}
                onClick={() => {
                  setIndex(i);
                  dispatch({
                    type: "storeCateg",
                    payload: categorie.nameCategory,
                  });
                }}
                onDoubleClick={() => {
                  setshowForm(true);
                }}
                onMouseLeave={() => {
                  setshowForm(false);
                }}
              >
                <span
                  className="catColor"
                  style={{ backgroundColor: categorie.color }}
                ></span>
                {categorie.nameCategory === clickedCateg && showForm ? (
                  <div className="d-flex">
                    <textarea
                      style={{ resize: "none", height: "30px", width: "100px" }}
                      className="fw-bold bg-body-secondary p-0 rounded text-center border border-0 outline-0"
                      onChange={(e) =>
                        HandleChangeCateg(e, categorie.nameCategory)
                      }
                    >
                      {categorie.nameCategory}
                    </textarea>
                    <button
                      className="btn btn-outline-primary pt-1 pb-1 p-2 border border-0"
                      style={{ borderRadius: "30px" }}
                      onClick={(e) => EditCategory(e)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pen"
                        viewBox="0 0 16 16"
                      >
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <span
                    className={
                      (i === index ||
                        categorie.nameCategory === clickedCateg) &&
                      "fw-bold bg-body-secondary "
                    }
                  >
                    {categorie.nameCategory}
                  </span>
                )}
                <span
                  className="fw-lighter bg-primary-subtle text-secondary p-2 pt-0 pb-0"
                  style={{ fontSize: "14px", borderRadius: "100px" }}
                >
                  {nbreTasksByCateg(categorie.nameCategory)}
                </span>
                <button
                  className="btn btn-outline-secondary pt-1 pb-1 p-2 border border-0"
                  style={{ borderRadius: "30px" }}
                  onClick={(e) => DeleteCategory(e, categorie.nameCategory)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
                </button>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
