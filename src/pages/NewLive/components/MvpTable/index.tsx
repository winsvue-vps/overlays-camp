import { useTournamentStore } from "@/stores/useTournamentStore";
import { TableRow } from "../Clippings";
import { CDN_CREWS, CDN_AVATARS, SERVER_LOGO } from "../../lib/utils"

export default function MvpTable(){
    const dataFilter = useTournamentStore((state) => state.dataFilter)
    const isMvpRankingCategory = (['mvp'].includes(dataFilter))
    const wrapperClass = `fixed top-[30rem] -translate-y-1/2  inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out 
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

    for (let i = 0; i < 20; i++) {
        const crew = ranking[i]
        const label = crew?.name ? (crew.tag + " / " + crew.name ) : "N/A"
        const points = crew?.points || "N/A"

        rankingTable.push(
            <div className="relative flex flex-col items-center justify-center w-[37rem] h-[4rem]">
            <div className="flex items-center justify-between w-[100%] h-[4rem] pb-[0.25rem] ">
                 <div className="w-[1.5rem] h-[1.5rem] bg-[#258DD7] flex justify-center items-center ml-[-1rem] mb-[-1.5rem] z-10"
                 style={{border:"1px solid #C7C7C7"}}>
                    <span className="text-[1rem] font-bold text-[#fff]">
                        {i + 1}
                    </span>
                </div>
                 <div className="w-[8rem] h-[1.5rem] bg-[#256BDF] flex justify-center items-center"
                 style={{border:"1px solid #C7C7C7"}}
                 >
                    <span className="text-[0.75rem] font-bold text-[#fff]">
                        PONTOS
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-center w-[100%] h-[4rem] gap-[0.5rem]">
                <div className="p-[0.1rem] w-[2.5rem] h-[2.5rem] bg-[#256BDF] flex justify-center items-center" >
                    <div className="rounded-full size-[2.1rem] bg-contain bg-no-repeat flex justify-center items-center" style={{ backgroundImage: `url(${getAvatar(crew)})` }}></div>
                </div>
                <div className="flex table-item items-center justify-between gap-[1rem] w-[34rem] h-[2.5rem] bg-[#D9D9D914] pl-[1.75rem] pr-[3rem]" >
                    <span className="text-[1rem] font-bold">{label}</span>
                    <p className="text-[1rem] font-bold text-[#020614] "> {points} </p>
                </div>
                </div>
            </div>
        )
    }

    const currentSlice = rankingTable.slice(
        section === 1 ? 0 : 20,
    );

    const leftSide = currentSlice.slice(0, 10);

    const points = ranking[1]?.points ? (ranking[1]?.points + " Abates") : "N/A" 
    const avatar = getAvatar(ranking[1], true)
    const name = ranking[1]?.name    

    return (
        <div className={wrapperClass}>
             <svg className="clippy">
        <defs>
          <TableRow />
        </defs>
      </svg>
            
            <div className="flex items-center justify-center relative gap-[7rem] origin-bottom">
                <div className="flex flex-col items-center justify-center gap-[3.63rem] min-h-full w-[37rem]">
                    <div className="flex flex-col items-center justify-start">
                        <div>
                            <h1 className="title text-left text-wrap whitespace-wrap">
                                TABELA <br/>
                                <span className= 'text-[#25C4C9]'> MVP</span> GERAL                                          
                            </h1>             
                        </div>
                    </div>

                <div className="relative self-start">                                      
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
                        <p className="text-[1.5rem] font-normal" > <span className="font-bold" >{points}</span></p>
                        </div>                    
                </div>
                </div>

                

                <div className="flex items-center justify-center gap-[1.3rem]">
                    <div className="w-[37rem] h-[44.5rem]">
                        <div className="flex flex-col gap-[0.62rem] mt-[1.37rem]">
                            {leftSide}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}