// TopicItem.tsx
import React, { useCallback } from "react";
import { useUpdateTopicProgress, useTopicProgress } from "../hooks/useProgress";
import { Topic } from "../types/course";
import LoadingSpinner from "@/components/LoadingSpinner";

interface TopicItemProps {
  topic: Topic;
  userId: string;
  onPlay?: (url: string) => void;
  isPlaying?: boolean;
  hideCompletionButton?: boolean;
}

export const TopicItem: React.FC<TopicItemProps> = ({
  topic,
  userId,
  hideCompletionButton = false,
}) => {
  const { mutate: updateProgress, isLoading: isUpdating } =
    useUpdateTopicProgress();
  const { isCompleted } = useTopicProgress(userId, topic.id);

  // Extract YouTube video ID from URL.
  const extractYouTubeID = (url: string): string | null => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = topic.videoUrl ? extractYouTubeID(topic.videoUrl) : null;

  const handleMarkDone = useCallback(() => {
    if (isCompleted) return;
    updateProgress({
      userId,
      topicId: topic.id,
      completed: true,
      progress: 100,
    });
  }, [updateProgress, userId, topic.id, isCompleted]);

  return (
    <div className="mb-8 border-b pb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{topic.name}</h3>
        <div className="flex items-center gap-4">
          {/* Render the per‑topic completion button only if not hidden */}
          {!hideCompletionButton &&
            (isUpdating ? (
              <div className="px-4 py-2">
                <LoadingSpinner />
              </div>
            ) : (
              <button
                onClick={handleMarkDone}
                disabled={isCompleted}
                className={`px-4 py-2 rounded ${
                  isCompleted
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isCompleted ? "Completed" : "Mark as Complete"}
              </button>
            ))}
        </div>
      </div>

      {/* YouTube video embed */}
      {videoId && (
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={topic.name}
            className="w-full h-64 sm:h-96"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};
