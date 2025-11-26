import { useTournamentStore } from "@/stores/useTournamentStore";
import {  CDN_CREWS, SERVER_LOGO } from "../../lib/utils";
import HeaderDetail from "../../assets/header-detail.svg?react"

export default function Winner(){
    const matchFilter = useTournamentStore((state) => state.matchFilter)
    const dataFilter = useTournamentStore((state) => state.dataFilter)
    const isWinnerCategory = dataFilter === 'mvpwinner'
    const wrapperClass = `fixed left-1/2 -translate-x-1/2 inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out -z-50 ${isWinnerCategory ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-[150%] pointer-events-none'}`;
    
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
 
    const points = ranking[1]?.points ? (ranking[1]?.points + " Abates") : "N/A" 
    const avatar = ranking[1]?.guild?.avatar ? `${CDN_CREWS}/${ranking[1].guild.avatar}` : SERVER_LOGO 
    const name = ranking[1]?.name

    return (
        <div className={wrapperClass}>
            <div>                         
                <h1 className="title text-nowrap whitespace-nowrap">
                    {title.split(' ').map((word, index, array) => (
                        <span
                        key={index}
                        className={index >= 1 ? 'text-[#25C4C9]' : ''}
                        >
                        {word}
                        {index !== array.length - 1 && ' '}
                        </span>
                    ))}
                </h1>
                <div className="flex items-center justify-between gap-[1rem] mx-[-4rem] pt-[2.3rem]">
                    <HeaderDetail className="w-[17.7rem] h-[1rem]"/>
                    <HeaderDetail className="w-[17.7rem] h-[1rem] scale-x-[-1]"/>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center relative pt-[6rem]">
                <div className="relative bottom-[.25rem]">                                      
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[10rem] h-[10rem] bg-contain bg-no-repeat"
                        style={{
                            backgroundImage: `url(${avatar})`
                        }}
                    >                                               
                    </div>
                    <h1 className="absolute left-1/2 -translate-x-1/2 top-[0.8rem] text-[2.5rem] font-bold italic">
                    {name}                 
                    </h1>
                    <div className="z-10 h-[22rem] w-[22rem] bg-[#25C7C82B]" />
                     <div className="h-10 w-60 bg-[#25C7C8] flex justify-center items-center mx-auto -mt-10 trapezio" >
                        <p className="text-[1.5rem] font-normal" ><span className="font-bold" >{points}</span></p>
                     </div>
                </div>
            </div>
        </div>
    )
}