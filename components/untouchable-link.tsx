"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { useMotionValue, motion, useSpring } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface UntouchableLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export default function UntouchableLink({ href, children, className }: UntouchableLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const isMobile = useMobile()

  // Mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Link position
  const x = useSpring(0, { stiffness: 400, damping: 8 })
  const y = useSpring(0, { stiffness: 400, damping: 8 })

  // Distance threshold for link movement
  const threshold = 150
  const maxDistance = 600

  // Track if mouse is near
  const [isNear, setIsNear] = useState(false)

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      if (linkRef.current) {
        const rect = linkRef.current.getBoundingClientRect()
        const linkCenterX = rect.left + rect.width / 2
        const linkCenterY = rect.top + rect.height / 2

        const distanceX = e.clientX - linkCenterX
        const distanceY = e.clientY - linkCenterY

        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

        if (distance < threshold) {
          setIsNear(true)

          // Calculate direction vector (normalized)
          const directionX = distanceX / distance
          const directionY = distanceY / distance

          // Calculate movement distance (increases as mouse gets closer)
          const moveFactor = 1 - Math.min(distance / threshold, 1)
          const moveDistance = maxDistance * moveFactor

          // Move in the opposite direction of the mouse
          x.set(-directionX * moveDistance)
          y.set(-directionY * moveDistance)
        } else {
          setIsNear(false)
          x.set(0)
          y.set(0)
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY, x, y, threshold, isMobile])

  // For touch devices
  useEffect(() => {
    if (!isMobile) return

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return

      const touch = e.touches[0]
      mouseX.set(touch.clientX)
      mouseY.set(touch.clientY)

      if (linkRef.current) {
        const rect = linkRef.current.getBoundingClientRect()
        const linkCenterX = rect.left + rect.width / 2
        const linkCenterY = rect.top + rect.height / 2

        const distanceX = touch.clientX - linkCenterX
        const distanceY = touch.clientY - linkCenterY

        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

        if (distance < threshold) {
          setIsNear(true)

          // Calculate direction vector (normalized)
          const directionX = distanceX / distance
          const directionY = distanceY / distance

          // Calculate movement distance (increases as touch gets closer)
          const moveFactor = 1 - Math.min(distance / threshold, 1)
          const moveDistance = maxDistance * moveFactor

          // Move in the opposite direction of the touch
          x.set(-directionX * moveDistance)
          y.set(-directionY * moveDistance)
        } else {
          setIsNear(false)
          x.set(0)
          y.set(0)
        }
      }
    }

    window.addEventListener("touchmove", handleTouchMove)
    return () => window.removeEventListener("touchmove", handleTouchMove)
  }, [mouseX, mouseY, x, y, threshold, isMobile])

  return (
    <motion.div style={{ x, y }} className={cn("inline-block transition-transform", isNear ? "z-10" : "")}>
      <Link
        ref={linkRef}
        href={href}
        className={cn("relative transition-all duration-300", isNear && "text-blue-400 dark:text-blue-300", className)}
      >
        {isNear && (
          <span className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 dark:from-blue-400/20 dark:to-purple-400/20 animate-pulse rounded-md" />
        )}
        {children}
      </Link>
    </motion.div>
  )
}
