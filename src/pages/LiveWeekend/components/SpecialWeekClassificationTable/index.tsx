import { useTournamentStore } from "@/stores/useTournamentStore";
import { TableRow } from "../Clippings";
import { CDN_CREWS, CDN_AVATARS, SERVER_LOGO } from "../../lib/utils"
import HeaderEdge from "../../assets/header-edge.svg?react"
import Textura from '../../assets/textura.svg?react'
import CheckIcon from "../../assets/check-icon.svg?react"
        // todo: corrigir dados

export default function SpecialClassificationTable(){
    const dataFilter = useTournamentStore((state) => state.dataFilter)
    const isMvpRankingCategory = (['specialclassificationtable'].includes(dataFilter))
    const wrapperClass = `fixed top-[35rem] -translate-y-1/2  inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out 
    ${isMvpRankingCategory ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-[150%] pointer-events-none'}`;  
    
     const section = 1  
    const ranking = useTournamentStore((state) => {
        return state.ranking['all']?.['mvp'] || {}
    })

    const rankingTable = []

    interface User {
        avatar?: string;
        guild?: {
            avatar?: string;
        };
    }

    const getAvatar = (user: User, getCrewAvatarFromUser: boolean = false) => {
        if (getCrewAvatarFromUser && user?.guild?.avatar){
            return `${CDN_CREWS}/${user?.guild?.avatar}`
        }

        if (dataFilter == "mvp"){
            const avatar = user?.avatar || "DEFAULT"
            return `${CDN_AVATARS}/${avatar}.webp`
        }

        if (!user?.avatar)
            return SERVER_LOGO

        return `${CDN_CREWS}/${user?.avatar}`
    }

    for (let i = 0; i < 4; i++) {
        const crew = ranking[i]
        const label = crew?.name ? (crew.tag + " / " + crew.name ) : "N/A"
        // const points = crew?.points || "N/A"

        rankingTable.push(
            <div className="relative flex flex-col items-center justify-center w-full h-[4rem]">
                <div className="flex items-center justify-center w-[100%] h-[4rem] gap-x-[0.5rem]">
                    <div className="p-[0.1rem] w-[4rem] h-[4rem] bg-[#33D8FEB2] flex justify-center items-center relative pr-[0.375rem]" >
                        <span className="text-[1.2rem] font-kanit font-bold text-[#fff]">
                            #{i + 1}
                        </span>
                        <div className="h-full w-[10%] absolute right-0 bg-[#FECE32]" ></div>
                    </div>
                    <div className="flex table-item-new items-center justify-between gap-[1rem] w-[64rem] h-[4rem] pl-[1.75rem] pr-[1rem] relative" >
                        <Textura className="absolute left-1/2 -translate-x-1/2 h-[2.5rem]" />
                        <div className="flex items-center gap-[2.12rem]" >
                            <div className="rounded-full size-[2.1rem] bg-contain bg-no-repeat flex justify-center items-center" style={{ backgroundImage: `url(${getAvatar(crew)})` }}></div>
                            <span className="text-[1rem] font-bold">{label}</span>
                        </div>
                        <div className="flex items-center gap-[2.12rem]" >
                            <CheckIcon />
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    const currentSlice = rankingTable.slice(
        section === 1 ? 0 : 4,
    );

    const leftSide = currentSlice.slice(0, 10);

    // const points = ranking[1]?.points ? (ranking[1]?.points + " Abates") : "N/A" 
    // const avatar = getAvatar(ranking[1], true)
    // const name = ranking[1]?.name    
    return (
        <div className={wrapperClass}>
             <svg className="clippy">
        <defs>
          <TableRow />
        </defs>
      </svg>            
            <div className="flex flex-col items-start justify-center w-[70rem] px-4 mb-[1rem]">
                <div className="flex flex-col items-start relative" >
                    <p className="text-[1.125rem] font-semibold pre-title" >ORDENADA POR COLOCAÇÃO</p>
                    <h1 className="table-title whitespace-nowrap">
                        <span>
                           CLASSIFICADOS WEEKENDE <br/>SPECIAL EDICTION
                        </span>
                    </h1>
                    <HeaderEdge className="absolute -top-[1.5rem] -left-[1.5rem]" />
                    <HeaderEdge className="absolute -bottom-[1rem] -right-[2rem] scale-x-[-1] scale-y-[-1]" />
                </div>
            </div>

            <div className="flex items-center justify-center relative gap-[7rem] origin-bottom w-[70rem]">
                <div className="flex items-center justify-center gap-[1.3rem]">
                    <div className="w-full h-[25rem]">
                        <div className="flex items-center justify-start gap-[2rem] opacity-40 px-[0.5rem]">
                            <span>POS.</span>
                            <span>NOME</span>

                        </div>

                        <div className="flex flex-col gap-y-[0.37rem] mt-[1.37rem]">
                            {leftSide}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}