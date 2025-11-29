import { useTournamentStore } from "@/stores/useTournamentStore";
import {  CDN_CREWS, SERVER_LOGO } from "../../lib/utils";
import LineWithShapedBorder from "../../assets/line-with-shaped-border.svg?react";
import ImageFrame from "../../assets/image-frame.svg?react";
import WinnerBg from "../../assets/winner-bg.svg?react"




export default function Winner(){
    const matchFilter = useTournamentStore((state) => state.matchFilter)
    const dataFilter = useTournamentStore((state) => state.dataFilter)
    const isWinnerCategory = dataFilter === 'mvpwinner'
    const wrapperClass = `fixed top-[-20rem] -translate-y-1/2  left-1/2 -translate-x-1/2 inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out -z-50 ${isWinnerCategory ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-[150%] pointer-events-none'}`;
    
    const ranking = useTournamentStore((state) => {
        return state.ranking[matchFilter]?.mvpwinner || {}
    })

    let title = "MVP"

    if (isWinnerCategory && matchFilter){
        if (matchFilter === "all")
            title += " " + "DA QUEDA"
        else {
            const matchId = matchFilter.split("Q")[1]
            title += " " + "DA QUEDA " + matchId
        }
    } else {
        return <div className={wrapperClass}></div>
    }
    
    const label = (ranking.name && ranking.tag) ? (ranking.tag + " / " + ranking.name) : "N/A" 
    const points = ranking[1]?.points ? (ranking[1]?.points + " Abates") : "N/A" 
    const avatar = ranking[1]?.guild?.avatar ? `${CDN_CREWS}/${ranking[1].guild.avatar}` : SERVER_LOGO 
    // const name = ranking[1]?.name

    return (
        <div className={wrapperClass}>
             <div>    
                  <div className="flex items-center justify-center gap-[1.19rem]">
                    <LineWithShapedBorder className="w-[6.31rem]" />
                    <span className="text-[#568EFF] font-semibold text-[1.25rem]">VENCEDOR</span>
                    <LineWithShapedBorder className="w-[6.31rem] scale-x-[-1]" />
                </div>                     
                <h1 className="text-[6rem] font-normal text-nowrap whitespace-nowrap text-bignoodle">
                    {title.split(' ').map((word, index, array) => (
                        <span
                        key={index}                      
                        >
                        {word}
                        {index !== array.length - 1 && ' '}
                        </span>
                    ))}
                </h1>
            </div>
              <div className="flex flex-col items-center justify-center relative pt-[6rem] ">            
                <WinnerBg className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[100vw] "/>
                <div className="relative bottom-[.25rem]">                                      
                    <div 
                        className="absolute top-[6rem] left-1/2 -translate-x-1/2 -translate-y-1/2 hex w-[9rem] h-[10rem] bg-contain bg-no-repeat"
                        style={{
                            backgroundImage: `url(${avatar})`
                        }}
                    >                                               
                    </div>

                    <ImageFrame className="z-10" />
                      <div className="flex flex-col items-center justify-center gap-[.75rem] mt-[1rem]">
                    <span className="ftext-kanit text-[1.75rem] font-bold leading-relaxed">{label}</span>

                    <div className="flex items-center justify-center w-[9.5rem] h-[2.25rem] ">
                        <span className="text-bignoodle text-nowrap text-[#FFCA2AF5] font-normal text-[4.45rem] ">{points}</span>
                    </div>
                </div>
                </div>

            </div>
        </div>
    )
}