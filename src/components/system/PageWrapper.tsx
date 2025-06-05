import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -50,
  },
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3,
}

interface PageWrapperProps {
  children: ReactNode
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="grid h-full w-full overflow-hidden"
    >
      <div className="min-h-0 w-full overflow-y-auto">{children}</div>
    </motion.div>
  )
}

export default PageWrapper
