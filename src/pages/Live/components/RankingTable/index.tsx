import { useTournamentStore } from "@/stores/useTournamentStore";
import { ChamferedRect, Trapezoid } from "../Clippings";
import LineWithShapedBorder from "../../assets/line-with-shaped-border.svg?react";
import LineGroupSeparator from "../../assets/line-group-separator.svg?react";
import { IsoscelesTrapezium } from "../Clippings";
import { useState } from "react";
import { CDN_CREWS, CDN_AVATARS, SERVER_LOGO } from "../../lib/utils"

const titlePrefix = {
    placements: "TABELA",
    mvp: "MVP",
}

const subtitleSuffix = {
    placements: "COLOCAÇÃO",
    mvp: "PONTOS",
}

const orderType: Record<keyof typeof titlePrefix, string> = {
    placements: "PONTOS",
    mvp: "KILLS",
}

export default function RankingTable(){
    const matchFilter = useTournamentStore((state) => state.matchFilter)
    const dataFilter = useTournamentStore((state) => state.dataFilter)
    const isRankingCategory = !(['countdown', 'winner'].includes(dataFilter))
    const wrapperClass =  `fixed left-1/2 top-[25rem] -translate-x-1/2 -translate-y-1/2 inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${isRankingCategory ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`  
    const [section, setSection] = useState(1)

    const ranking = useTournamentStore((state) => {
        const table = state.ranking[matchFilter]?.[dataFilter] || {}

        if (table.crews){
            return table.crews
        }

        return table
    })

    let title = ""
    let subtitle = "ORDENA POR "
    if (
        isRankingCategory &&
        matchFilter &&
        dataFilter in titlePrefix &&
        dataFilter in subtitleSuffix
    ) {
        const prefix = titlePrefix[dataFilter as keyof typeof titlePrefix]
        const suffix = subtitleSuffix[dataFilter as keyof typeof subtitleSuffix]

        if (matchFilter === "all")
            title = prefix + " GERAL"
        else {
            const matchId = matchFilter.split("Q")[1]
            title = prefix + " " + "DA QUEDA " + matchId
        }

        subtitle += suffix
    } else {
        return <div className={wrapperClass}></div>
    }

    const rankingTable = []

    const getAvatar = (user: {avatar: string}) => {
        if (dataFilter == "mvp"){
            const avatar = user?.avatar || "DEFAULT" 
            return `${CDN_AVATARS}/${avatar}.webp`
        }

        if (!user?.avatar)
            return SERVER_LOGO

        return `${CDN_CREWS}/${user?.avatar}`
    }

    for (let i = 0; i < 20; i++) {
        const crew = ranking[i]
        const label = crew?.name ? (crew.tag + " / " + crew.name ) : "N/A"
        const points = crew?.points != null ? crew.points : "N/A"

        rankingTable.push(
            <div className="relative flex items-center justify-center w-[20rem] h-[4rem]">
                <div className="absolute top-[2.3rem] left-[.3rem] -translate-y-1/2 w-[2.3rem] h-[3.3rem]" style={{ filter: 'drop-shadow(2.275px 3.034px 3.792px rgba(0, 0, 0, 0.25))' }}>
                    <Trapezoid className="w-full h-full" />
                    <span className="absolute top-[1.5rem] left-[1rem] -translate-x-1/2 -translate-y-1/2 text-[0.875rem] font-bold">
                        {i + 1}
                    </span>
                </div>

                <div className="flex items-center gap-[1rem] w-[17rem] h-full bg-[#D9D9D914] px-[1.75rem]">
                    <div className="rounded-full size-[2.5rem] bg-contain bg-no-repeat" style={{ backgroundImage: `url(${getAvatar(crew)}), url(${SERVER_LOGO})` }}></div>
                    <span className="text-[0.875rem] font-bold">{label}</span>
                </div>

                <div>
                    <div className="absolute -right-[1.8rem] top-[2rem] -translate-y-1/2 w-[3.55rem] h-full">
                        <ChamferedRect className="w-full h-full" />

                        <span className="absolute top-[2rem] left-[1.7rem] -translate-x-1/2 -translate-y-1/2 font-bold text-[1.3rem] max-w-[3.1rem] text-center overflow-hidden">
                            {points}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    const currentSlice = rankingTable.slice(
        section === 1 ? 0 : 10,
        section === 1 ? 10 : 20
    );

    const leftSide = currentSlice.slice(0, 5);
    const rightSide = currentSlice.slice(5, 10);

    return (
        <div className={wrapperClass}>
            <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-[1rem]">
                    <LineWithShapedBorder className="w-[6.31rem]" />
                    <span className="text-[#b99960] font-semibold text-[1.25rem] text-nowrap whitespace-nowrap">{subtitle}</span>
                    <LineWithShapedBorder className="w-[6.31rem] scale-x-[-1]" />
                </div>

                <h1 className="text-[3.5rem] italic font-bold text-nowrap whitespace-nowrap">{title}</h1>
            </div>

            <div className="flex items-center justify-center relative gap-[1.25rem] origin-bottom">
                <div className="flex items-center justify-center gap-[1.3rem]">
                    <div className="w-[21.5rem] h-[24.875rem]">
                        <div className="flex items-center justify-between gap-[1rem] opacity-40">
                            <span>POS.</span>
                            <div className="w-full border-[.0625rem] border-solid"></div>
                            <span>{orderType[dataFilter as keyof typeof orderType]}</span>
                        </div>
                    
                        <div className="flex flex-col gap-[0.62rem] mt-[1.37rem]">
                            {leftSide}
                        </div>
                    </div>
                </div>
                
                <LineGroupSeparator className="w-max h-[19rem] mt-[3rem]" />

                <div className="flex items-center justify-center gap-[1.3rem]">
                    <div className="w-[21.5rem] h-[24.875rem]">
                        <div className="flex items-center justify-between gap-[1rem] opacity-40">
                            <span>POS.</span>
                            <div className="w-full border-[.0625rem] border-solid"></div>
                            <span>{orderType[dataFilter as keyof typeof orderType]}</span>
                        </div>
                    
                        <div className="flex flex-col gap-[0.62rem] mt-[1.37rem]">
                            { rightSide }
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-[0.3rem] mt-[2.5rem]">
                { Array.from({ length: 2 }, (_, index) => { 
                    index++
                    
                    const props: {size?: string, fill?: string} = { 
                        size: "2rem",
                        fill: "#574627 "
                    }

                    if (index === section) {
                        delete props.fill
                    }
                    
                    const handleClick = () => {
                        if (section === index) return
                        setSection(index)
                    }

                    return (
                        <div className="hover:cursor-pointer" onClick={handleClick}>
                            <IsoscelesTrapezium value={index} {...props} />
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}