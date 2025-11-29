import './style.css'; 
import Refresh from "./assets/refresh.svg?react" 
import WinsLogo from "@/assets/wins-full-logo.svg?react" 

import { TimerBG, MenuBackground } from './components/Clippings'
import { dataFilterTypes, matchFilterTypes, useTournamentStore } from '@/stores/useTournamentStore';
import { cn } from '@/utils/cn';

import Countdown from './components/Countdown';
import RankingTable from './components/RankingTable';
import Winner from './components/Winner';
import { FunctionComponent, SVGProps } from 'react';
import MvpWinner from './components/MvpWinner';
import MvpTable from './components/MvpTable'
import ClassificationTable from './components/WeekClassificationTable'
import SpecialClassificationTable from './components/SpecialWeekClassificationTable'
import RankingMvpBadge from './components/RankingMvpBadge'

import { RequestRankingData } from './api';

function TournamentFilter(){
  const setMatchFilter = useTournamentStore((state) => state.setMatchFilter);
  const setDataFilter = useTournamentStore((state) => state.setDataFilter);
  const dataFilter = useTournamentStore((state) => state.dataFilter);
  const matchFilter = useTournamentStore((state) => state.matchFilter);

  let matchFilters: ({ text: string; value: string; icon?: undefined; rotate?: undefined; } | { icon: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string; titleId?: string; desc?: string; descId?: string; }>; rotate: boolean; text?: undefined; value?: undefined; })[] = []

  if (dataFilter !== "countdown" && dataFilter !== "mvp" && dataFilter !== "specialclassificationtable" && dataFilter !== "classificationtable" && dataFilter !== "rankingmvpbadge") {
    matchFilters = [
      { text: "Geral", value: "all" },
      { icon: Refresh, rotate: true }
    ]

    for (let i = 1; i <= 6; i++) {
      const c = `Q${i}`
      matchFilters.push({ text: c, value: c })
    }
  }

  const dataFilters = [ 
    { text: "INICIO", value: "countdown" },
    { text: "VENCEDOR", value: "winner" },
    { text: "VENCEDOR QUEDA", value: "mvpwinner" },
    { text: "TABELA", value: "placements" },
    { text: "TOP 20 MVP GERAL", value: "mvp" },
    // { text: "CLASSIFICAÇÃO SEMANAL", value: "classificationtable" },   
    // { text: "CLASSIFICAÇÃO ESPECIAL", value: "specialclassificationtable" },   
    { text: "MVP TOP 5", value: "rankingmvpbadge" },     
  ]

  const handleSwitchMatchFilter = (value: matchFilterTypes) => {
    if (matchFilter === value) return;
    setMatchFilter(value);
    RequestRankingData(value, dataFilter)
  }

  const handleSwitchDataFilter = (value: dataFilterTypes) => {
    if (dataFilter === value) return;
    
    if (!matchFilter)
      setMatchFilter('all')
    
    if (value != "winner"){
      RequestRankingData(matchFilter, value)
    }
    setDataFilter(value)
  }

  return (
    <div className='fixed left-1/2 bottom-[1rem] -translate-x-1/2 w-[50%] h-[5rem] flex items-center justify-center group'>
      <div className='absolute inset-0 flex flex-col items-center justify-center transform transition-all duration-500 ease-out group-hover:translate-y-full group-hover:opacity-0 z-50'>
        <span className='text-[0.875rem]'>POWERED BY</span>
        <WinsLogo className='w-[14rem] h-[2.25rem]' />
      </div>

      <div className='absolute  inset-0 flex items-center justify-center transform transition-all duration-500 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-50'>
        
        <div className='flex menu-background items-center justify-center z-10 py-[0.5rem] px-[1.19rem]'>
          <div className='flex items-center justify-between gap-[0.7rem] hover:cursor-pointer'>
            {matchFilters.map(({ text, icon: Icon, value, rotate }, index) => {
              const className = "hover:text-[#568EFF] transition-colors text-[0.75rem] font-semibold text-nowrap"
              const key = "match-filter-" + index

              if (Icon) {
                return (
                  <Icon
                    key={key}
                    onClick={() => RequestRankingData(matchFilter, dataFilter, true)}
                    className={cn(className, rotate ? "hover:animate-spin transition-transform" : "", "size-[0.8rem]")}
                  />
                )
              }

              return (
                <span
                    key={key}
                    onClick={() => handleSwitchMatchFilter(((value || text) as matchFilterTypes))}
                    className={cn(
                      className,
                      matchFilter === (value || text) ? "text-[#568EFF]" : ""
                    )}
                  >
                  {text}
                </span>
              )
            })}
          </div>

          { dataFilter !== "countdown" && dataFilter !== "mvp" && dataFilter !== "specialclassificationtable" && dataFilter !== "classificationtable" && dataFilter !== "rankingmvpbadge" && <div className='border-[.1rem] self-stretch border-solid border-white opacity-30 mx-[.64rem]'></div> }

          <div className='flex items-center justify-center gap-[0.9rem] hover:cursor-pointer'>
            {dataFilters.map(({ text, value }, index) => {
              const className = "hover:text-[#568EFF] transition-colors text-[0.75rem] font-semibold"
              const key = "data-filter-" + index
              return (
                <span
                    key={key}
                    onClick={() => handleSwitchDataFilter(value as dataFilterTypes)}
                    className={cn(
                      className,
                      dataFilter === value ? "text-[#568EFF]" : ""
                    )}
                  >
                  {text}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LiveWeekend() {

  return (
    <>
      <svg className="clippy">
        <defs>
          <TimerBG />
          <MenuBackground />
        </defs>
      </svg>

      <div className="z-100 relative">
        <Countdown />
        <RankingTable />
        <Winner />        
        <MvpTable />
        <TournamentFilter />
        <MvpWinner />
        <ClassificationTable />
        <SpecialClassificationTable />
        <RankingMvpBadge />
      </div>
    </>
  )
}