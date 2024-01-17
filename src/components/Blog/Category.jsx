import { useState } from "react";

export const listOfCategory = [
  "All",
  "Technology",
  "Health and Wellness",
  "Travel",
  "Food and Cooking",
  "Personal Development",
  "Finance and Money",
  "Fashion and Style",
];

export default function Category({ selectedCat }) {
  const [activeCategories, setActiveCategories] = useState({ All: true });

  function handleCat(category) {
    selectedCat(category);
    setActiveCategories(() => ({
      [category]: true,
    }));
  }

  return (
    <div className="flex flex-wrap items-center">
      {listOfCategory.map((cat, index) => (
        <button
          key={index}
          className={`text-white font-bold uppercase text-sm px-2 p-1 mr-1 my-1 rounded-md ${
            activeCategories[cat] ? "bg-blue-800" : "bg-gray-900"
          }`}
          onClick={() => handleCat(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
