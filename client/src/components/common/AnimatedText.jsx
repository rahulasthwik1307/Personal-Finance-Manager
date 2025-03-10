import { motion } from 'framer-motion'

export default function AnimatedText({ text, className }) {
  const words = text.split(' ')

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="inline-block mr-3"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}