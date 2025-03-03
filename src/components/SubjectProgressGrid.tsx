import React from "react";
import { Subject, Chapter, Unit } from "../types/course";
import { useUserProgress } from "../hooks/useProgress";
import LoadingSpinner from "@/components/LoadingSpinner";

interface SubjectProgressGridProps {
  subject: Subject;
  userId: string;
}

export const SubjectProgressGrid: React.FC<SubjectProgressGridProps> = ({
  subject,
  userId,
}) => {
  const { data, isLoading } = useUserProgress(userId);

  if (isLoading) return <LoadingSpinner />;

  // All user topic progress
  const topicProgress = data?.topicProgress || [];

  // Quickly find all completed topic IDs
  const completedTopicIds = new Set(
    topicProgress.filter((p) => p.completed).map((p) => p.topicId)
  );

  // A chapter is complete only if all its topics are complete
  const isChapterComplete = (chapter: Chapter) => {
    if (!chapter.topics || chapter.topics.length === 0) {
      // If a chapter has no topics, treat as incomplete or decide your own logic
      return false;
    }
    return chapter.topics.every((t) => completedTopicIds.has(t.id));
  };

  // A unit is complete only if all its chapters are complete
  const isUnitComplete = (unit: Unit) => {
    if (!unit.chapters || unit.chapters.length === 0) return false;
    return unit.chapters.every((chapter) => isChapterComplete(chapter));
  };

  // Overall subject progress = (# units completed / total units) * 100
  const units = subject.units || [];
  const totalUnits = units.length;
  const completedUnits = units.filter(isUnitComplete).length;
  const progressPercentage =
    totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

  // Flatten all chapters for the GitHub-style grid
  const allChapters = units.flatMap((unit) => unit.chapters || []);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{subject.name} Progress</h2>
        <div className="flex items-center">
          <div className="w-48 bg-gray-200 rounded-full h-4 mr-2">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{progressPercentage}%</span>
        </div>
      </div>

      {/* GitHub-style activity grid: small colored squares for each chapter */}
      <div className="grid grid-cols-12 gap-1">
        {allChapters.map((chapter) => {
          const chapterCompleted = isChapterComplete(chapter);
          return (
            <div
              key={chapter.id}
              className={`h-6 w-6 rounded-sm ${
                chapterCompleted ? "bg-blue-500" : "bg-gray-200"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
