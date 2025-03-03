// hooks/useCompleteChapter.ts
import { useMutation, useQueryClient } from "react-query";
import { courseService } from "@/services/courseService";

interface CompleteChapterInput {
  userId: string;
  chapterId: string;
}

export const useCompleteChapter = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: CompleteChapterInput) => courseService.completeChapter(data),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["userProgress", variables.userId]);
      },
    }
  );
};
