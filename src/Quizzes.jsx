import React, { useState, useEffect } from "react";
import { MdFilterList } from "react-icons/md";
import { TbSearch } from "react-icons/tb";
import LoadingIcon from "./components/Loading.jsx";
import { getQuizzes } from "./utils/api";
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
import ItemCard from "./components/ItemCard.jsx";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = (selectedLevel, selectedCategory) => {
    const newFilteredQuizzes = quizzes.filter(
      (quiz) =>
        (selectedLevel ? quiz.level === selectedLevel : true) &&
        (selectedCategory ? quiz.course === selectedCategory : true)
    );
    setFilteredQuizzes(newFilteredQuizzes);
  };

  const handleReset = () => {
    setFilteredQuizzes(quizzes);
  };

  const searchQuizzes = filteredQuizzes
    .filter((quiz) =>
      quiz.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    const fetchQuizzes = async () => {
      const quizzes = await getQuizzes();
      setQuizzes(quizzes);
      setFilteredQuizzes(quizzes);
      setIsLoading(false);
    };

    fetchQuizzes();
  }, []);

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <>
      <ItemsWrapper>
        <ItemContainer>
          <SectionInfoWrpper>
            <Heading>Quizzes</Heading>
            <Description>
              {
                "Discover, engage, and challenge your knowledge. Choose from a variety of quizzes tailored to your interests."
              }
            </Description>
          </SectionInfoWrpper>
          <ItemSelection>
            <SearchInputWrapper>
              <TbSearch />
              <SearchInput
                type="text"
                placeholder="Search 1000+ Quizzes..."
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

          {searchQuizzes.map((quiz) => (
            <ItemCard
              item={quiz}
              itemType="Quiz"
              startButtonLink={`/quiz/${quiz._id}`}
              subjectLink={`/subject/${quiz.subject}`}
            />
          ))}
        </ItemContainer>

        <FilterModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          items={quizzes}
          onApply={handleApply}
          onReset={handleReset}
        />
      </ItemsWrapper>
    </>
  );
};

export default Quizzes;
