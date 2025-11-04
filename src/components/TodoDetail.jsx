import React, { useState } from "react";
import Circle from "../images/circle.svg";
import Checked from "../images/circle-cheked.svg";
import Cross from "../images/icon-cross.svg";

function TodoDetail({ item, onBack, onToggleComplete, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.text);
  const [editedDescription, setEditedDescription] = useState(item.description || "");
  const [editedDueDate, setEditedDueDate] = useState(item.dueDate || "");

  const handleSave = () => {
    onUpdate({
      text: editedText,
      description: editedDescription,
      dueDate: editedDueDate,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(item.text);
    setEditedDescription(item.description || "");
    setEditedDueDate(item.dueDate || "");
    setIsEditing(false);
  };
  return (
    <div className="w-full bg-white dark:bg-input-dark rounded-lg shadow">
      {/* Header with back button */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 text-2xl text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ←
          </button>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Todo Details
          </h2>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Edit
          </button>
        )}
      </div>

      {/* Todo Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
            Title
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full px-4 py-2 text-lg font-medium text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className={`text-xl font-medium ${
              item.status === "Completed" 
                ? "text-gray-400 dark:text-gray-500 line-through" 
                : "text-gray-800 dark:text-gray-200"
            }`}>
              {item.text}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
            Description
          </label>
          {isEditing ? (
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 text-base text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Add a description..."
            />
          ) : item.description ? (
            <p className={`text-base ${
              item.status === "Completed"
                ? "text-gray-400 dark:text-gray-500 line-through"
                : "text-gray-700 dark:text-gray-300"
            }`}>
              {item.description}
            </p>
          ) : (
            <p className="text-base text-gray-400 dark:text-gray-500 italic">
              No description
            </p>
          )}
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
            Due Date
          </label>
          {isEditing ? (
            <input
              type="date"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
              className="w-full px-4 py-2 text-base text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : item.dueDate ? (
            <p className="text-base text-gray-700 dark:text-gray-300">
              {new Date(item.dueDate).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          ) : (
            <p className="text-base text-gray-400 dark:text-gray-500 italic">
              No due date
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
            Status
          </label>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              item.status === "Completed"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            }`}>
              {item.status === "Completed" ? "Completed" : "In Progress"}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
        {isEditing ? (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={onToggleComplete}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <img
                src={item.status === "onProgress" ? Checked : Circle}
                alt="Status"
                className="w-5 h-5"
              />
              <span className="font-medium">
                {item.status === "onProgress" ? "Mark as Completed" : "Mark as In Progress"}
              </span>
            </button>

            <button
              onClick={onDelete}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <img src={Cross} alt="Delete" className="w-5 h-5" />
              <span className="font-medium">Delete Todo</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoDetail;
