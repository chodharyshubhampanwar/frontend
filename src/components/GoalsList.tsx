// import React from "react";
// import { useGoals } from "../hooks/useGoals";
// import { useCourseStore } from "../store/courseStore";

// const GoalsList: React.FC = () => {
//   const { goals, isLoading } = useGoals();
//   const setSelectedGoal = useCourseStore((state) => state.setSelectedGoal);

//   if (isLoading) return <div className="p-4">Loading goals...</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Goals</h2>
//       <ul>
//         {goals?.map((goal) => (
//           <li
//             key={goal.id}
//             className="cursor-pointer hover:bg-gray-200 p-2 rounded"
//             onClick={() => setSelectedGoal(goal)}
//           >
//             {goal.name}{" "}
//             <span className="text-sm text-gray-600">
//               ({goal.grade} | {goal.board})
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default GoalsList;

// GoalsList.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoals } from "../hooks/useGoals";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Edit2, Trash2 } from "lucide-react";

const GoalsList = () => {
  const { goals, isLoading } = useGoals();
  const navigate = useNavigate();

  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<any>(null);
  const [userGoals, setUserGoals] = useState<any[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const uniqueGrades = [...new Set(goals?.map((goal) => goal.grade))];
  const uniqueBoards = [...new Set(goals?.map((goal) => goal.board))];

  const handleSaveGoal = () => {
    const selectedGoal = goals?.find(
      (goal) => goal.grade === selectedGrade && goal.board === selectedBoard
    );

    if (selectedGoal && !userGoals.find((g) => g.id === selectedGoal.id)) {
      setUserGoals((prev) => [...prev, selectedGoal]);
    }
    // Reset form and close modal
    setSelectedGrade("");
    setSelectedBoard("");
    setIsEditModalOpen(false);
  };

  const handleDeleteGoal = (goal: any) => {
    setGoalToDelete(goal);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setUserGoals(userGoals.filter((g) => g.id !== goalToDelete.id));
    setShowDeleteConfirm(false);
    setGoalToDelete(null);
  };

  // Navigate with goalId in the URL:
  const navigateToCourses = (goal: any) => {
    // e.g. /courses/<goalId>
    navigate(`/courses/${goal.id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading goals...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Learning Goals</h2>

        {/* Edit Goals Dialog */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              Edit Goals
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Your Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Grade</label>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueGrades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        Grade {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Board</label>
                <Select value={selectedBoard} onValueChange={setSelectedBoard}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select board" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueBoards.map((board) => (
                      <SelectItem key={board} value={board}>
                        {board}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleSaveGoal}
                disabled={!selectedGrade || !selectedBoard}
              >
                Save Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Render user goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userGoals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="text-lg font-semibold">{goal.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteGoal(goal)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </CardTitle>
              <CardDescription>
                Grade {goal.grade} | {goal.board}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{goal.description}</p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => navigateToCourses(goal)}
              >
                View Courses
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <DialogTitle>Confirm Deletion</DialogTitle>
          </div>
          <p className="py-4">
            Are you sure you want to remove this goal? This action cannot be
            undone.
          </p>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoalsList;
