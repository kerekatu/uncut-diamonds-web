import { motion } from "framer-motion";

const COMMENTS = [
  {
    author: "Marianooos",
    text: "#freemarian",
    coordinates: { x: 15, y: 75 },
  },
  {
    author: "Rosolino",
    text: "Humoru nie brakuje!",
    coordinates: { x: 6, y: 45 },
  },
  {
    author: "Matrannae",
    text: "Minął rok i jeszcze nie wyszłam",
    coordinates: { x: 10, y: 15 },
  },
  {
    author: "Lucuś",
    text: "Super atmosfera, dobrze rozbudowany",
    coordinates: { x: 72, y: 60 },
  },
  {
    author: "Ethan",
    text: "Kozak serwer, fajni ludzie",
    coordinates: { x: 73, y: 15 },
  },
];

const commentsVariants = {
  hidden: { opacity: 0, translateY: -20 },
  show: {
    opacity: 1,
    translateY: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1.5,
    },
  },
};

const Comments = () => {
  return (
    <motion.div
      className="hidden xl:block pointer-events-none"
      variants={commentsVariants}
      initial="hidden"
      animate="show"
    >
      {COMMENTS.map((comment, index) => (
        <motion.div
          className="absolute -z-10 max-w-[270px]"
          style={{
            left: comment.coordinates.x + "%",
            top: comment.coordinates.y + "%",
          }}
          variants={commentsVariants}
          key={index}
        >
          <div className="absolute inset-0 bg-gradient-to-bl blur-md from-zinc-800 to-zinc-700 rounded-full"></div>
          <div className="relative block px-8 py-4 rounded-xl leading-6">
            <h4 className="font-bold tracking-tight">{comment.author}:</h4>
            <p className="text-base text-zinc-300">{comment.text}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Comments;
