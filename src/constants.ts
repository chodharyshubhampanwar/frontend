import {
  Home,
  Newspaper,
  BrainCircuit,
  DollarSign,
  Music,
  Podcast,
  GraduationCap,
  Bitcoin,
  Lightbulb,
} from "lucide-react";

export const SIDE_NAV_ITEMS = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Newspaper, label: "Tests", path: "/test" },
  { icon: Podcast, label: "Questions", path: "/question" },
  { icon: BrainCircuit, label: "Flashcards", path: "/deck" },
  { icon: DollarSign, label: "Economics", path: "/economics" },
  { icon: Music, label: "Music", path: "/music" },
  { icon: GraduationCap, label: "Psychology", path: "/psychology" },
  { icon: Bitcoin, label: "Currencies", path: "/currencies" },
  { icon: Lightbulb, label: "Thoughts", path: "/thoughts" },
];
