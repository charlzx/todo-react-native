import React from "react";

function InformationAndFilter({
  list,
  options,
  removeCompleted,
  filter,
  setFilter,
}) {
  return (
    <>
      {/* additional information  */}
      <div className="flex justify-between w-full h-16 px-6 text-sm leading-tight text-gray-700 align-middle bg-white rounded-b-lg shadow appearance-none dark:bg-input-dark focus:outline-none focus:shadow-outline dark:text-gray-300">
        <p className="my-auto">{list.length} {list.length === 1 ? 'item' : 'items'} left</p>

        {/* Filer Desktop */}
        <div className="hidden my-auto gap-x-5 sm:flex">
          {options.map((item, i) => (
            <p
              className={
                (i === filter ? "text-blue-600 font-bold" : "") +
                " cursor-pointer transition-all hover:text-shadow-bold"
              }
              style={{
                textShadow: i === filter ? 'none' : undefined
              }}
              key={item}
              onClick={() => {
                setFilter(i);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = '0 0 0.5px currentColor, 0 0 0.5px currentColor';
              }}
              onMouseLeave={(e) => {
                if (i !== filter) {
                  e.currentTarget.style.textShadow = 'none';
                }
              }}
            >
              {item}
            </p>
          ))}
        </div>

        <p
          className="my-auto cursor-pointer"
          onMouseEnter={(e) => {
            e.currentTarget.style.textShadow = '0 0 0.5px currentColor, 0 0 0.5px currentColor';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textShadow = 'none';
          }}
          onClick={() => removeCompleted()}
        >
          Clear Completed
        </p>
      </div>
      {/* Filter Option Mobile */}
      <div className="flex justify-center w-full h-16 px-6 mt-5 text-sm leading-tight text-gray-700 align-middle bg-white rounded-lg shadow appearance-none gap-x-5 sm:hidden dark:bg-input-dark focus:outline-none focus:shadow-outline dark:text-gray-300 ">
        {options.map((item, i) => (
          <p
            className={
              (i === filter ? "text-blue-600 font-bold" : "") +
              " cursor-pointer my-auto"
            }
            key={item}
            onClick={() => {
              setFilter(i);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '0 0 0.5px currentColor, 0 0 0.5px currentColor';
            }}
            onMouseLeave={(e) => {
              if (i !== filter) {
                e.currentTarget.style.textShadow = 'none';
              }
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </>
  );
}

export default InformationAndFilter;
