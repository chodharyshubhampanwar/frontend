import React, { useState, useEffect } from "react";
import { MdFilterList } from "react-icons/md";
import { TbSearch } from "react-icons/tb";
import LoadingIcon from "./components/Loading.jsx";
import { getExams } from "./utils/api";
import ItemCard from "./components/ItemCard.jsx";
import {
  ItemContainer,
  SearchInput,
  SortSelect,
  ItemsWrapper,
  Filter,
  ItemSelection,
  SearchInputWrapper,
  FilterWrapper,
  SortSelectWrapper,
  SectionInfoWrpper,
  Description,
  Heading,
} from "./styles/Items.js";

import FilterModal from "./components/FilterModal.jsx";

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredExams, setFilteredExams] = useState(exams);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = (selectedLevel, selectedCategory) => {
    const newFilteredExams = exams.filter(
      (exam) =>
        (selectedLevel ? exam.level === selectedLevel : true) &&
        (selectedCategory ? exam.course === selectedCategory : true)
    );
    setFilteredExams(newFilteredExams);
  };

  const handleReset = () => {
    setFilteredExams(exams);
  };

  const searchExams = filteredExams
    .filter((exam) =>
      exam.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case "asc":
          return a.name > b.name ? 1 : -1;
        case "desc":
          return a.name < b.name ? 1 : -1;
        default:
          return 0;
      }
    });

  useEffect(() => {
    const fetchExams = async () => {
      const exams = await getExams();
      setExams(exams);
      setFilteredExams(exams);
      setIsLoading(false);
    };

    fetchExams();
  }, []);

  return (
    <>
      <ItemsWrapper>
        <ItemContainer>
          <SectionInfoWrpper>
            <Heading>Exams</Heading>
            <Description>
              {
                "Discover, engage, and challenge your knowledge. Choose from a variety of exams tailored to your interests."
              }
            </Description>
          </SectionInfoWrpper>
          <ItemSelection>
            <SearchInputWrapper>
              <TbSearch />
              <SearchInput
                type="text"
                placeholder="Search 1000+ exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInputWrapper>
            <FilterWrapper onClick={() => setIsModalOpen(true)}>
              <Filter>Filter</Filter>
              <MdFilterList />
            </FilterWrapper>

            <SortSelectWrapper>
              <SortSelect
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </SortSelect>
            </SortSelectWrapper>
          </ItemSelection>
          {isLoading ? (
            <LoadingIcon />
          ) : (
            searchExams.map((exam) => (
              <ItemCard
                item={exam}
                itemType="Exam"
                startButtonLink={`/exam/${exam._id}`}
                subjectLink={`/subject/${exam.subject}`}
              />
            ))
          )}
        </ItemContainer>

        <FilterModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          items={exams}
          onApply={handleApply}
          onReset={handleReset}
        />
      </ItemsWrapper>
    </>
  );
};

export default Exams;
