import TimerBorder from "../../assets/timer-border.svg?react"  
import { useCountDown } from '@/hooks/useCountDown';
import { ShimmeringText } from '../ShimmerText';
import { useTournamentStore } from "@/stores/useTournamentStore";
import Carousel from "../Carousel";
import { motion } from "framer-motion"
import { cn } from "@/utils/cn";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";
import { RequestTeams } from "../../api";
import { fivemRequest } from "@/services/api";

function Counter(){
  const countdown = useTournamentStore((state) => state.countdown)
  const setCountdown = useTournamentStore((state) => state.setCountdown)
  const countdownAsDate = new Date(countdown)
  const timerDate = useCountDown(countdownAsDate, true);
  const hasNPSRole = useUserStore((state) => state.hasNPSRole);
  const discordUser = useUserStore((state) => state.discordUser);

  const handleClickCountdown = async () => { 
    if (!hasNPSRole) return
    if (timerDate.hasEnded) return

    const userInput = prompt("Defina o horário exato (HH:MM):", `${countdownAsDate.getHours()}:${countdownAsDate.getMinutes()}`)
    if (!userInput) return

    const [hours, minutes] = userInput.split(":").map(Number)
    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      hours < 0 || hours > 23 ||
      minutes < 0 || minutes > 59
    ) {
      alert("Formato inválido. Use HH:MM (ex: 15:40)")
      return
    }

    const now = new Date()
    const targetDate = new Date(now)
    targetDate.setHours(hours, minutes, 0, 0)

    if (targetDate.getTime() <= now.getTime()) {
      targetDate.setDate(targetDate.getDate() + 1)
    }

    const dbCountdownTimestamp = targetDate.toISOString()
    const response = await fivemRequest.post("/bot-api/tournament/countdown", { params: {
      countdown: dbCountdownTimestamp,
      discordId: discordUser?.id
    }})
    
    if (response.status !== 200) return
    setCountdown(dbCountdownTimestamp)
  }

  useEffect(() => { 
    const requestCountdown = async () => {
      const response = await fivemRequest.get("/bot-api/tournament/countdown")
      if (response.status !== 200) return
      setCountdown(response.data.result)
    }

    requestCountdown()
  }, [])

  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className='flex items-center justify-center size-max group'>
        <TimerBorder className='w-[7rem] h-[15rem] transition-transform duration-300 group-hover:-translate-x-4' />

        <div className='flex flex-col items-center justify-center italic font-extrabold w-[20rem] leading-none'>
          <motion.p
            initial={false}
            animate={{
              opacity: timerDate.hasEnded ? 0 : 1,
              y: timerDate.hasEnded ? -20 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="text-[2rem] text-[#b99960] group-hover:scale-110 transition-transform duration-300 h-[2.4rem]"
          >
            INICIANDO EM
          </motion.p>

          <motion.div
            initial={false}
            animate={{
              y: timerDate.hasEnded ? -20 : 0,
              opacity: 1,
              scale: 1,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ShimmeringText
              className={cn("text-[6rem] group-hover:scale-110 transition-transform duration-300 text-nowrap", timerDate.hasEnded ? "text-[5.5rem]" : "")}
              onClick={handleClickCountdown}
              shimmeringColor="#b99960"
              text={
                timerDate.hasEnded
                  ? "COMEÇOU"
                  : `${timerDate.hours}:${timerDate.minutes}:${timerDate.seconds}`
              }
              duration={2}
            />
          </motion.div>
        </div>

        <TimerBorder className='w-[7rem] h-[15rem] rotate-180 transition-transform duration-300 group-hover:translate-x-4' />
      </div>
    </div>
  )
}

export default function Countdown(){
  const dataFilter = useTournamentStore((state) => state.dataFilter)
  const isCountdownCategory = dataFilter === 'countdown'

  useEffect(() => {
    RequestTeams()
  }, [])

  return (
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${isCountdownCategory ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <Counter />
        <Carousel />
      </div>
  )
}