import React, { useState, useEffect } from "react";
import { MdFilterList } from "react-icons/md";
import { TbSearch } from "react-icons/tb";
import LoadingIcon from "./components/Loading.jsx";
import { getTests } from "./utils/api";
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

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredtests, setFilteredtests] = useState(tests);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = (selectedLevel, selectedCategory) => {
    const newFilteredtests = tests.filter(
      (tests) =>
        (selectedLevel ? tests.level === selectedLevel : true) &&
        (selectedCategory ? tests.course === selectedCategory : true)
    );
    setFilteredtests(newFilteredtests);
  };

  const handleReset = () => {
    setFilteredtests(tests);
  };

  const searchtests = filteredtests
    .filter((tests) =>
      tests.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    const fetchtests = async () => {
      const tests = await getTests();
      setTests(tests);
      setFilteredtests(tests);
      setIsLoading(false);
    };

    fetchtests();
  }, []);

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <>
      <ItemsWrapper>
        <ItemContainer>
          <SectionInfoWrpper>
            <Heading>Tests</Heading>
            <Description>
              {
                "Discover, engage, and challenge your knowledge. Choose from a variety of tests tailored to your interests."
              }
            </Description>
          </SectionInfoWrpper>
          <ItemSelection>
            <SearchInputWrapper>
              <TbSearch />
              <SearchInput
                type="text"
                placeholder="Search 1000+ tests..."
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

          {searchtests.map((test) => (
            <ItemCard
              item={test}
              itemType="Test"
              startButtonLink={`/test/${test._id}`}
              subjectLink={`/subject/${test.subject}`}
            />
          ))}
        </ItemContainer>

        <FilterModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          items={tests}
          onApply={handleApply}
          onReset={handleReset}
        />
      </ItemsWrapper>
    </>
  );
};

export default Tests;
