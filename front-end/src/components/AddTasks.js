import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "@clerk/clerk-react";
import GetCategories from "../hooks/GetCategories";
import toast, { Toaster } from "react-hot-toast";

export default function AddTasks() {
  const [description, setDescription] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("green");
  const [CreateNewCateForm, setCreateNewCateForm] = useState(false);
  const { userId } = useAuth();

  const categories = GetCategories();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let selectedCategory = nameCategory === "" ? newCategory : nameCategory;

    const isCategExist = categories.filter(
      (categ) => categ.nameCategory === newCategory && categ.userId === userId
    );

    if (selectedCategory === newCategory) {

      if (isCategExist.length !== 0) {
        toast.error("This category name already exists");
      } else if(selectedCategory !== "" && selectedCategory !== "all") {
        axios.post("http://localhost:8000/api/categories", {
          nameCategory: newCategory,
          color: newCategoryColor,
          userId: userId,
        });

      }
    }

    let newTask

    if(selectedCategory === ""){
      newTask = {
        description,
        nameCategory: "all",
        createdAt: new Date(),
        userId,
      };
    }
    else{
      newTask = {
        description,
        nameCategory: selectedCategory,
        createdAt: new Date(),
        userId,
      };
    }
    
    if (isCategExist.length === 0) {
      try {
        await axios.post("http://localhost:8000/api/tasks", newTask);
        Swal.fire({
          icon: "success",
          title: "Task Added",
          text: "Your task has been added successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => window.location.reload());
      } catch (error) {
        console.error("Error adding task:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add task. Please try again later.",
          showCancelButton: "Back",
        });
      }
    }
  };

  if (categories !== "load") {
    return (
      <div className="addTaskForm container mt-4 p-3 shadow bg-body-secondary rounded" style={{width:"30%"}}>
        <Toaster position="top-center" reverseOrder={false} />
        <form onSubmit={handleSubmit} className="">
          <div className="mb-2">
            <label htmlFor="description" className="form-label">
              Task:
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter new task"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="category" className="form-label">
              Category:
            </label>
            {
              CreateNewCateForm ?
              <div className="d-flex gap-2" style={{height:"38px"}}>
                <input
                  type="color"
                  style={{height:"100%"}}
                  defaultValue={'#008000'}
                  onChange={(e) => setNewCategoryColor(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter New Category Name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  required
                />
              </div>
              :
              <select
                className="form-select"
                id="category"
                value={nameCategory}
                onChange={(e) => {setNameCategory(e.target.value) ; setNewCategory('')}}
              >
                <option hidden value="">
                  Choose an existing category
                </option>
                {categories.filter(cteg=>cteg.userId === userId).map((category) => (
                  <option key={category._id} value={category.nameCategory}>
                    {category.nameCategory}
                  </option>
                ))}
              </select>
            }
            <p
              className="text-body-secondary text-decoration-underline"
              style={{ textAlign: "right", cursor: "pointer" }}
              onClick={() => setCreateNewCateForm((prev) => !prev)}
            >
              {CreateNewCateForm ? "Choose an existing category" : "Create New Category"}
            </p>
          </div>
          <div className="d-flex align-items-center">
            <button type="submit" className="btn btn-dark mb-2" style={{height:'fit-content'}}>
              Add Task
            </button>
          </div>
        </form>
      </div>
    );
  }
}
