"use client"

import { useState, useEffect, useRef, type ReactNode, type ButtonHTMLAttributes } from "react"
import { useMotionValue, motion, useSpring } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UntouchableButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function UntouchableButton({
  children,
  className,
  variant = "default",
  size = "default",
  ...props
}: UntouchableButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isMobile = useMobile()

  // Mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Button position
  const x = useSpring(0, { stiffness: 400, damping: 8 })
  const y = useSpring(0, { stiffness: 400, damping: 8 })

  // Distance threshold for button movement
  const threshold = 200
  const maxDistance = 600

  // Track if mouse is near
  const [isNear, setIsNear] = useState(false)

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        const buttonCenterX = rect.left + rect.width / 2
        const buttonCenterY = rect.top + rect.height / 2

        const distanceX = e.clientX - buttonCenterX
        const distanceY = e.clientY - buttonCenterY

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

      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        const buttonCenterX = rect.left + rect.width / 2
        const buttonCenterY = rect.top + rect.height / 2

        const distanceX = touch.clientX - buttonCenterX
        const distanceY = touch.clientY - buttonCenterY

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
      <Button
        ref={buttonRef}
        variant={variant}
        size={size}
        className={cn("relative overflow-hidden transition-all duration-300", isNear && "shadow-lg", className)}
        {...props}
      >
        {isNear && (
          <span className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 animate-pulse" />
        )}
        {children}
      </Button>
    </motion.div>
  )
}
