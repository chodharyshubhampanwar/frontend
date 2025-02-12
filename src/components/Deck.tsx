import { motion, AnimatePresence } from "framer-motion";
import { useFlashCardStore } from "../store/flashCardStore";

interface FlashcardProps {
  front: string;
  back: string;
  onNext?: () => void;
  onPrevious?: () => void;
}

const Flashcard = ({ front, back, onNext, onPrevious }: FlashcardProps) => {
  const { studyState, flipCard } = useFlashCardStore();
  const { isFlipped } = studyState;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={isFlipped ? "back" : "front"}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 cursor-pointer min-h-[300px] flex items-center justify-center"
            onClick={() => flipCard()}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isFlipped ? back : front}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Click to flip
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-8">
        {onPrevious && (
          <button
            onClick={onPrevious}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Previous
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
