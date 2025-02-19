import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDecks } from "../hooks/useDeck";
import LoadingSpinner from "../components/LoadingSpinner";
import { TbCardsFilled } from "react-icons/tb";
import FilterDropdown from "../components/FilterDropdown";
import { Filter, X } from "lucide-react";

const DeckList = () => {
  const navigate = useNavigate();
  const { data: decks, isLoading, error } = useDecks();

  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedBoard, setSelectedBoard] = useState("all");

  // Mobile filter modal state
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Derive filter options from API decks
  const subjectOptions = useMemo(() => {
    if (!decks) return [];
    const set = new Set(
      decks.map((deck) => deck.subject).filter((s): s is string => Boolean(s))
    );
    return Array.from(set);
  }, [decks]);

  const gradeOptions = useMemo(() => {
    if (!decks) return [];
    const set = new Set(
      decks.map((deck) => deck.grade).filter((g): g is string => Boolean(g))
    );
    return Array.from(set);
  }, [decks]);

  const boardOptions = useMemo(() => {
    if (!decks) return [];
    const set = new Set(
      decks.map((deck) => deck.board).filter((b): b is string => Boolean(b))
    );
    return Array.from(set);
  }, [decks]);

  const filteredDecks = useMemo(() => {
    if (!decks) return [];
    return decks.filter((deck) => {
      const matchesSubject =
        selectedSubject === "all" || deck.subject === selectedSubject;
      const matchesGrade =
        selectedGrade === "all" || deck.grade === selectedGrade;
      const matchesBoard =
        selectedBoard === "all" || deck.board === selectedBoard;
      return matchesSubject && matchesGrade && matchesBoard;
    });
  }, [decks, selectedSubject, selectedGrade, selectedBoard]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="text-red-500 text-center">
          Error loading decks:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      </div>
    );
  }

  // Reusable filter content
  const FilterContent = () => (
    <div className="w-full flex flex-col md:flex-row items-center gap-3">
      <FilterDropdown
        label="Subject"
        value={selectedSubject}
        options={subjectOptions.map((s) => ({ label: s, value: s }))}
        onChange={setSelectedSubject}
      />
      <FilterDropdown
        label="Grade"
        value={selectedGrade}
        options={gradeOptions.map((g) => ({ label: g, value: g }))}
        onChange={setSelectedGrade}
      />
      <FilterDropdown
        label="Board"
        value={selectedBoard}
        options={boardOptions.map((b) => ({ label: b, value: b }))}
        onChange={setSelectedBoard}
      />
      {(selectedSubject !== "all" ||
        selectedGrade !== "all" ||
        selectedBoard !== "all") && (
        <button
          onClick={() => {
            setSelectedSubject("all");
            setSelectedGrade("all");
            setSelectedBoard("all");
          }}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-400 transition-colors flex items-center gap-2"
        >
          <span>Clear All Filters</span>
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-900">
          Flashcard Decks
        </h1>
        <p className="text-gray-600">
          Browse and study from our collection of flashcard decks
        </p>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-6 w-6 text-gray-600" />
          <h2 className="text-xl font-semibold">Filters</h2>
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setShowFilterModal(true)}
          className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border-2 border-gray-300 transition-colors flex items-center gap-2 justify-center"
        >
          <Filter className="h-6 w-6 text-gray-600" />
          <span>Filters</span>
        </button>
      </div>

      {/* Mobile Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowFilterModal(false)}
          ></div>
          <div className="absolute top-0 left-0 w-full h-full bg-white transform transition-transform duration-300">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filter Options</h2>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="text-xl font-bold"
                >
                  &times;
                </button>
              </div>
              <FilterContent />
              <div className="mt-4">
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deck Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredDecks.map((deck) => (
          <div
            key={deck.id}
            onClick={() => navigate(`/deck/${deck.id}`)}
            className="bg-white rounded-lg hover:shadow transition-shadow cursor-pointer p-4 border-2 border-gray-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-lg font-semibold mb-1 text-gray-900">
                  {deck.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3">{deck.description}</p>
              </div>
              <TbCardsFilled className="text-blue-600" size={20} />
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {deck.subject && (
                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                  {deck.subject}
                </span>
              )}
              {deck.grade && (
                <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs">
                  {deck.grade}
                </span>
              )}
              {deck.board && (
                <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-xs">
                  {deck.board}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{deck.cards.length} cards</span>
              <span>
                Updated {new Date(deck.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDecks.length === 0 && (
        <div className="text-center py-8">
          <h3 className="text-lg text-gray-600">
            No decks found matching your criteria
          </h3>
          <p className="text-gray-500 mt-1">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default DeckList;
