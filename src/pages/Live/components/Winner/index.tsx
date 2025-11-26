import { useTournamentStore } from "@/stores/useTournamentStore";
import LineWithShapedBorder from "../../assets/line-with-shaped-border.svg?react";
import LineWithCurve from "../../assets/line-group-curve.svg?react";
import ImageFrame from "../../assets/image-frame.svg?react";
import GoldFrame from "../../assets/gold-frame.svg?react";
import { CDN_CREWS, SERVER_LOGO } from "../../lib/utils";

export default function Winner(){
    const matchFilter = useTournamentStore((state) => state.matchFilter)
    const dataFilter = useTournamentStore((state) => state.dataFilter)
    const isWinnerCategory = dataFilter === 'winner'
    const wrapperClass = `fixed left-1/2 top-[23.5rem] -translate-x-1/2 -translate-y-1/2 inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${isWinnerCategory ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`
    
    const ranking = useTournamentStore((state) => {
        return state.ranking[matchFilter]?.winner?.winner || {}
    })


    let title = "VENCEDOR"

    if (isWinnerCategory && matchFilter){
        if (matchFilter === "all")
            title += " " + "GERAL"
        else {
            const matchId = matchFilter.split("Q")[1]
            title += " " + "DA QUEDA " + matchId
        }
    } else {
        return <div className={wrapperClass}></div>
    }

    const label = (ranking.name && ranking.tag) ? (ranking.tag + " / " + ranking.name) : "N/A" 
    const points = typeof ranking.points == "number" ? (ranking.points + " Pontos") : "N/A" 
    const avatar = ranking.avatar ? `${CDN_CREWS}/${ranking.avatar}` : SERVER_LOGO 

    return (
        <div className={wrapperClass}>
            <div>
                <div className="flex items-center justify-center gap-[1rem]">
                    <LineWithShapedBorder className="w-[6.31rem]" />
                    <span className="text-[#b99960] font-semibold text-[1.25rem]">VENCEDOR</span>
                    <LineWithShapedBorder className="w-[6.31rem] scale-x-[-1]" />
                </div>

                <h1 className="text-[3.5rem] italic font-bold text-nowrap whitespace-nowrap">{title}</h1>
            </div>

            <div className="flex flex-col items-center justify-center relative">
                <div className="flex h-[5rem] overflow-hidden">
                    <LineWithCurve />
                </div>

                <div className="relative bottom-[.25rem]">
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hex w-[9rem] h-[10rem] bg-contain bg-no-repeat"
                        style={{
                            backgroundImage: `url(${avatar})`
                        }}
                    >
                        
                    </div>

                    <ImageFrame className="z-10" />
                    <GoldFrame className="absolute bottom-[-1.8rem] left-1/2 -translate-x-1/2" style={{
                        filter: 'drop-shadow(0 1.412px 18.995px rgba(185, 153, 96, 0.5))'
                    }} />
                </div>

                <div className="flex flex-col items-center justify-center gap-[.75rem] mt-[1rem]">
                    <span className="text-[1.75rem] font-bold leading-relaxed">{label}</span>

                    <div className="points-clip-path flex items-center justify-center w-[9.5rem] h-[2.25rem]">
                        <span className="text-nowrap text-[1.375rem]">{points}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}








{/* <img
    src={config.frame}
    alt={config.frameAlt}
    className="absolute top-0 z-10"
    width={currentSize.width}
    height={currentSize.height}
    aria-hidden="true"
/>
<img src={player.avatar} alt={`Avatar de ${player.name}`} className={config.avatarClass} /> */}