import React, { useRef, useState } from "react";
import Circle from "../images/circle.svg";
import Checked from "../images/circle-cheked.svg";
import Cross from "../images/icon-cross.svg";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const restrictToVerticalAxis = ({ transform }) => {
  if (!transform) return transform;
  return { ...transform, x: 0 };
};

function SortableItem({ item, idx, checked, removeOne, onItemClick }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item._id,
  });

  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);
  const swipeTriggeredRef = useRef(false);

  const swipeThreshold = 120;
  const maxSwipeDistance = 160;

  const baseTransform = CSS.Transform.toString(transform);
  const composedTransform = `${
    baseTransform && baseTransform !== "none" ? baseTransform : ""
  }${swipeOffset ? ` translateX(${swipeOffset}px)` : ""}`.trim();

  const style = {
    transform: composedTransform || `translateX(${swipeOffset}px)`,
    transition: isSwiping ? "none" : transition || "transform 0.2s ease",
  };

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    swipeTriggeredRef.current = false;
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const deltaX = e.touches[0].clientX - touchStartXRef.current;
    const deltaY = e.touches[0].clientY - touchStartYRef.current;

    // Only treat primarily horizontal motions as swipes
    if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX >= 0) {
      e.preventDefault();
      e.stopPropagation();
      setSwipeOffset(Math.min(deltaX, maxSwipeDistance));
    } else if (Math.abs(deltaY) > Math.abs(deltaX) && isSwiping) {
      // User switched to vertical drag; cancel swipe visuals
      setSwipeOffset(0);
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;

    if (deltaX >= swipeThreshold) {
      swipeTriggeredRef.current = true;
      removeOne(item._id);
      setSwipeOffset(0);
    } else {
      setSwipeOffset(0);
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // reset swipe flag after event loop to prevent click handlers
    if (swipeTriggeredRef.current) {
      setTimeout(() => {
        swipeTriggeredRef.current = false;
      }, 0);
    }

    setIsSwiping(false);
  };

  const handleTouchCancel = () => {
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    setSwipeOffset(0);
    setIsSwiping(false);
  };

  // Truncate text helper
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const displayTitle = truncateText(item.text, 50);
  const displayDescription = truncateText(item.description, 80);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex w-full px-6 py-4 text-lg leading-tight text-gray-700 align-middle bg-white dark:bg-input-dark shadow appearance-none focus:outline-none focus:shadow-outline dark:text-gray-300 cursor-move ${
        idx === 0 ? " rounded-t-lg" : ""
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      <button
        data-index={idx}
        data-id={item._id}
        className="w-6 h-6 mt-1 mr-6 flex-shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          checked(e);
        }}
      >
        <img src={item.status === "onProgress" ? Circle : Checked} alt="Toggle status" />
      </button>

      <div
        className="flex-1 cursor-pointer overflow-hidden"
        onClick={(e) => {
          if (swipeTriggeredRef.current || swipeOffset > 0) {
            swipeTriggeredRef.current = false;
            return;
          }
          e.stopPropagation();
          onItemClick(item);
        }}
      >
        <p className="text-base font-medium hover:text-blue-600 truncate">
          {item.status === "Completed" ? <strike>{displayTitle}</strike> : displayTitle}
        </p>

        {item.description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">
            {item.status === "Completed" ? <strike>{displayDescription}</strike> : displayDescription}
          </p>
        )}

        {item.dueDate && (
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Due: {new Date(item.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}
      </div>

      <button
        className="w-6 h-6 mt-1 ml-6 flex-shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          removeOne(item._id);
        }}
      >
        <img src={Cross} alt="Delete todo" />
      </button>
    </div>
  );
}

function ListOfActivity({
  list,
  filter,
  searchQuery,
  checked,
  removeOne,
  handleDrag,
  onItemClick,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 150, tolerance: 10 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const query = searchQuery?.trim().toLowerCase() || "";

  const filteredList = list.filter((item) => {
    let statusMatch = false;
    if (filter === 0) statusMatch = true;
    if (filter === 1) statusMatch = item.status === "onProgress";
    if (filter === 2) statusMatch = item.status === "Completed";

    if (!statusMatch) return false;

    if (!query) return true;

    const textMatch = item.text.toLowerCase().includes(query);
    const descMatch = item.description?.toLowerCase().includes(query) || false;
    return textMatch || descMatch;
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = list.findIndex((item) => item._id === active.id);
      const newIndex = list.findIndex((item) => item._id === over.id);

      handleDrag({
        source: { index: oldIndex },
        destination: { index: newIndex },
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      {query && (
        <div className="px-6 py-2 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-input-dark rounded-t-lg shadow">
          {filteredList.length > 0 ? (
            <>Showing {filteredList.length} result{filteredList.length === 1 ? "" : "s"} for "{searchQuery}"</>
          ) : (
            <>No results for "{searchQuery}"</>
          )}
        </div>
      )}

      <SortableContext items={filteredList.map((item) => item._id)} strategy={verticalListSortingStrategy}>
        <div>
          {filteredList.length > 0 ? (
            filteredList.map((item, idx) => (
              <SortableItem
                key={item._id}
                item={item}
                idx={idx}
                checked={checked}
                removeOne={removeOne}
                onItemClick={onItemClick}
              />
            ))
          ) : (
            <div className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-input-dark rounded-lg shadow">
              {query ? "Try a different search term." : "No todos available."}
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default ListOfActivity;
