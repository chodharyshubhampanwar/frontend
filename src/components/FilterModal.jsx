import React, { useState, useEffect } from "react";
import {
  ModalOverlay,
  ModalContent,
  FilterSection,
  FilterSelect,
  ApplyButton,
} from "./../styles/FilterModal.js";

const FilterModal = ({ isOpen, onRequestClose, items, onApply, onReset }) => {
  const [showAllLevels, setShowAllLevels] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [levels, setLevels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const allLevels = items.map((quiz) => quiz.level);
    const allCategories = items.map((quiz) => quiz.course);
    const uniqueLevels = [...new Set(allLevels)];
    const uniqueCategories = [...new Set(allCategories)];
    setLevels(uniqueLevels);
    setCategories(uniqueCategories);
  }, [items]);

  const handleApply = () => {
    onApply(selectedLevel, selectedCategory);
    onRequestClose();
  };

  const handleReset = () => {
    setSelectedLevel("");
    setSelectedCategory("");
    onReset();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay onClick={onRequestClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <FilterSection>
          <h3>Difficulty</h3>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="">Select a level</option>
            {(showAllLevels ? levels : levels.slice(0, 3)).map(
              (level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              )
            )}
          </select>
          <h3>Course</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {(showAllCategories ? categories : categories.slice(0, 3)).map(
              (category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
        </FilterSection>
        <button onClick={handleApply}>Apply</button>
        <button onClick={handleReset}>Clear Filter</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FilterModal;
