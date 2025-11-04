import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

import "./parts.css";
import ThemeButton from "../components/ThemeButton";
import InputArea from "../components/InputArea";
import ListOfActivity from "../components/ListOfActivity";
import Filter from "../components/InformationAndFilter";
import TodoDetail from "../components/TodoDetail";

function Todo() {
  // Query todos from Convex
  const list = useQuery(api.todos.getTodos) || [];
  
  // Mutations
  const createTodo = useMutation(api.todos.createTodo);
  const toggleTodoMutation = useMutation(api.todos.toggleTodo);
  const deleteTodoMutation = useMutation(api.todos.deleteTodo);
  const updateTodoMutation = useMutation(api.todos.updateTodo);
  const updateTodoOrder = useMutation(api.todos.updateTodoOrder);
  const deleteCompletedMutation = useMutation(api.todos.deleteCompleted);
  
  const [filter, setFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Sync selectedTodo with updated list data
  useEffect(() => {
    if (selectedTodo && list.length > 0) {
      const updatedTodo = list.find(item => item._id === selectedTodo._id);
      if (updatedTodo && JSON.stringify(updatedTodo) !== JSON.stringify(selectedTodo)) {
        setSelectedTodo(updatedTodo);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  const handleSubmit = async (e, input, description = "", dueDate = "") => {
    e.preventDefault();

    // Allow submission if there's either a title or description
    const trimmedInput = input.trim();
    const trimmedDescription = description.trim();
    
    if (trimmedInput === "" && trimmedDescription === "") {
      return;
    }

    // Use description as title if no title provided
    const todoText = trimmedInput || trimmedDescription;

    await createTodo({
      text: todoText,
      description: trimmedInput ? trimmedDescription : "", // Only keep description if we have a separate title
      dueDate: dueDate || undefined,
    });
  };

  // function when check button pressed (from list)
  const checked = async (e) => {
    const itemId = e.currentTarget.dataset.id;
    if (!itemId) {
      return;
    }

    await toggleTodoMutation({ id: itemId });
    
    // Update selected todo if it's the one being toggled
    if (selectedTodo && selectedTodo._id === itemId) {
      const updatedTodo = list.find(item => item._id === itemId);
      if (updatedTodo) {
        setSelectedTodo(updatedTodo);
      }
    }
  };

  // Toggle complete from detail view
  const toggleComplete = async (itemId) => {
    await toggleTodoMutation({ id: itemId });
    const updatedTodo = list.find(item => item._id === itemId);
    if (updatedTodo) {
      setSelectedTodo(updatedTodo);
    }
  };

  // Open todo detail view
  const openTodoDetail = (item) => {
    setSelectedTodo(item);
  };

  // function when x button pressed (from list)
  const removeOne = async (value) => {
    const itemId =
      typeof value === "string"
        ? value
        : value?.currentTarget?.dataset?.id;

    if (!itemId) {
      return;
    }

    await deleteTodoMutation({ id: itemId });
  };

  // Delete from detail view
  const deleteTodo = async (itemId) => {
    await deleteTodoMutation({ id: itemId });
    setSelectedTodo(null); // Close detail view after deletion
  };

  // Update todo from detail view
  const updateTodo = async (itemId, updates) => {
    await updateTodoMutation({ 
      id: itemId, 
      text: updates.text,
      description: updates.description,
      dueDate: updates.dueDate,
    });
    // selectedTodo will be updated by useEffect when list updates
  };

  const removeCompleted = async () => {
    await deleteCompletedMutation();
  };

  async function handleDrag(result) {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order in Convex
    const updates = items.map((item, index) => ({
      id: item._id,
      order: index,
    }));

    await updateTodoOrder({ updates });
  }

  return (
    <div className="relative z-10 flex h-auto max-w-xl px-4 sm:px-10 mx-auto bg-yellow-3000 md:mx-auto">
      <div className="w-full mt-20 text-left ">
        <div className="flex justify-between align-middle">
          <h1 className="text-4xl font-bold text-white">T O D O</h1>
          <ThemeButton />
        </div>
        <InputArea 
          handleSubmit={handleSubmit}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
        />
        
        {selectedTodo ? (
          // Show detail view
          <TodoDetail
            item={selectedTodo}
            onBack={() => setSelectedTodo(null)}
            onToggleComplete={() => toggleComplete(selectedTodo._id)}
            onDelete={() => deleteTodo(selectedTodo._id)}
            onUpdate={(updates) => updateTodo(selectedTodo._id, updates)}
          />
        ) : (
          // Show list view
          <>
            <ListOfActivity
              list={list}
              filter={filter}
              searchQuery={searchQuery}
              checked={checked}
              removeOne={removeOne}
              handleDrag={handleDrag}
              onItemClick={openTodoDetail}
            />
            
            <Filter
              list={list}
              options={options}
              removeCompleted={removeCompleted}
              filter={filter}
              setFilter={setFilter}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Todo;

const options = ["All", "Active", "Completed"];
