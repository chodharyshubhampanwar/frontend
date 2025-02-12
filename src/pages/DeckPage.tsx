import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDecks } from "../hooks/useDeck";
import LoadingSpinner from "../components/LoadingSpinner";
import { TbCardsFilled } from "react-icons/tb";

interface Deck {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  cards: Array<{
    id: string;
    front: string;
    back: string;
  }>;
  tags: string[];
  subject?: string;
  grade?: number;
}

const DeckList = () => {
  const navigate = useNavigate();
  const { data: decks, isLoading, error } = useDecks();
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Predefined subjects and grades for filtering
  const subjects = [
    "Mathematics",
    "Science",
    "History",
    "English",
    "Geography",
  ];
  const grades = Array.from({ length: 12 }, (_, i) => i + 1);

  // Filter decks based on selected criteria
  const filteredDecks = useMemo(() => {
    if (!decks) return [];

    return decks.filter((deck) => {
      const matchesSubject =
        selectedSubject === "all" || deck.subject === selectedSubject;
      const matchesGrade =
        selectedGrade === "all" || deck.grade === parseInt(selectedGrade);
      const matchesSearch =
        deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deck.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSubject && matchesGrade && matchesSearch;
    });
  }, [decks, selectedSubject, selectedGrade, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center">
          Error loading decks:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          Flashcard Decks
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Browse and study from our collection of flashcard decks
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search decks..."
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="all">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <select
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        >
          <option value="all">All Grades</option>
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              Grade {grade}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSelectedSubject("all");
            setSelectedGrade("all");
            setSearchTerm("");
          }}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          Clear Filters
        </button>
      </div>

      {/* Deck Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDecks.map((deck) => (
          <div
            key={deck.id}
            onClick={() => navigate(`/deck/${deck.id}`)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {deck.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {deck.description}
                </p>
              </div>
              <TbCardsFilled className="text-blue-500" size={24} />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {deck.subject && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm">
                  {deck.subject}
                </span>
              )}
              {deck.grade && (
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm">
                  Grade {deck.grade}
                </span>
              )}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
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
        <div className="text-center py-12">
          <h3 className="text-xl text-gray-600 dark:text-gray-300">
            No decks found matching your criteria
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Try adjusting your filters or search term
          </p>
        </div>
      )}
    </div>
  );
};

export default DeckList;
