import { Emitter } from "@/utils/Emitter"
import { useMemo } from "react"

export const useEmitter = () => {
  const emitter = useMemo(() => new Emitter(), [])
  console.log("Emitter root created")
  return emitter
}