import { useTournamentStore } from "@/stores/useTournamentStore";
import { CDN_CREWS, SERVER_LOGO } from "../../lib/utils";
import LineWithShapedBorder from "../../assets/line-with-shaped-border.svg?react";
import ImageFrame from "../../assets/image-frame.svg?react";
import BlueFlag from '../../assets/blue-flag.svg'
import GoldenFlag from '../../assets/golden-flag.svg'

function getUser(user: { name: string, tag: string, avatar: string, points: number, guild?: { avatar?: string } }) {
    const label = (user?.name && user?.tag) ? (user.tag + " / " + user.name) : "N/A"
    const points = user?.points ? (user?.points + " Abates") : "N/A"
    const avatar = user?.guild?.avatar ? `${CDN_CREWS}/${user.guild.avatar}` : SERVER_LOGO
    return { label, points, avatar }
}

export default function RankingMvpBadge() {
    const matchFilter = useTournamentStore((state) => state.matchFilter)
    const dataFilter = useTournamentStore((state) => state.dataFilter)
    const isWinnerCategory = dataFilter === 'rankingmvpbadge'
    const wrapperClass = `fixed left-1/2 -translate-x-1/2 inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out -z-50 ${isWinnerCategory ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-[150%] pointer-events-none'}`;

    // TODO: mudar Dados
    const ranking = useTournamentStore((state) => {
        return state.ranking?.all?.rankingmvpbadge?.slice(0, 5) || []
    })

    let title = "MVP"

    if (isWinnerCategory && matchFilter) {
        if (matchFilter === "all")
            title += " " + "DA QUEDA"
        else {
            const matchId = matchFilter.split("Q")[1]
            title += " " + "DA QUEDA " + matchId
        }
    } else {
        return <div className={wrapperClass}></div>
    }

    const top1 = getUser(ranking[0])
    const top2 = getUser(ranking[1])
    const top3 = getUser(ranking[2])
    const top4 = getUser(ranking[3])
    const top5 = getUser(ranking[4])


    return (
        <div className={wrapperClass}>
            <div>
                <div className="flex items-center justify-center gap-[1.19rem]">
                    <LineWithShapedBorder className="w-[6.31rem]" />
                    <span className="text-[#568EFF] font-semibold text-[1.25rem]">VENCEDOR</span>
                    <LineWithShapedBorder className="w-[6.31rem] scale-x-[-1]" />
                </div>
                <h1 className="text-[6rem] font-normal text-nowrap whitespace-nowrap text-bignoodle">
                    PODIUM MVP
                </h1>
            </div>
            <div className="flex  items-start justify-center relative pt-[6rem] gap-[1.5rem]">
                <div className="w-[16rem] h-[31rem] flex flex-col items-center justify-start pt-[7rem] relative"
                 style={{
                            backgroundImage: `url(${BlueFlag})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPositionX: 'center',                           
                        }}
                        >
                            <span className="text-kanit text-[3rem] font-bold leading-relaxed absolute -top-[4rem]">4º</span>
                    <div className="relative bottom-[.25rem]">
                        <div
                            className="absolute top-[5rem] left-1/2 -translate-x-1/2 -translate-y-1/2 hex w-[6.6rem] h-[7.68rem] bg-contain bg-no-repeat"
                            style={{
                                backgroundImage: `url(${top4.avatar})`
                            }}
                        >
                        </div>
                        <ImageFrame className="z-10 w-[10rem] h-[10rem]" />
                        <div className="flex flex-col items-center justify-center gap-[.75rem] mt-[1rem]">
                            <span className="ftext-kanit text-[1.29rem] font-bold leading-relaxed">{top4.label}</span>

                            <div className="flex items-center justify-center w-[9.5rem] h-[2.25rem] ">
                                <span className="text-bignoodle text-nowrap text-[#FFCA2AF5] font-normal text-[2.5rem] ">{top4.points}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="w-[16rem] h-[31rem] flex flex-col items-center justify-start pt-[7rem] relative"
                 style={{
                            backgroundImage: `url(${BlueFlag})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPositionX: 'center',                           
                        }}
                        >
                            <span className="text-kanit text-[3rem] font-bold leading-relaxed absolute -top-[4rem]">2º</span>
                    <div className="relative bottom-[.25rem]">
                        <div
                            className="absolute top-[5rem] left-1/2 -translate-x-1/2 -translate-y-1/2 hex w-[6.6rem] h-[7.68rem] bg-contain bg-no-repeat"
                            style={{
                                backgroundImage: `url(${top2.avatar})`
                            }}
                        >
                        </div>
                        <ImageFrame className="z-10 w-[10rem] h-[10rem]" />
                        <div className="flex flex-col items-center justify-center gap-[.75rem] mt-[1rem]">
                            <span className="ftext-kanit text-[1.29rem] font-bold leading-relaxed">{top2.label}</span>

                            <div className="flex items-center justify-center w-[9.5rem] h-[2.25rem] ">
                                <span className="text-bignoodle text-nowrap text-[#FFCA2AF5] font-normal text-[2.5rem] ">{top2.points}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[16rem] h-[36rem] flex flex-col items-center justify-start pt-[5rem] relative "
                 style={{
                            backgroundImage: `url(${GoldenFlag})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPositionX: 'center',                          
                           
                        }}
                        >
                            <span className="text-kanit text-[3rem] font-bold leading-relaxed absolute -top-[4rem]">1º</span>

                    <div className="relative bottom-[.25rem]">
                        <div
                            className="absolute top-[5.6rem] left-1/2 -translate-x-1/2 -translate-y-1/2 hex w-[8.3rem] h-[9.6rem] bg-contain bg-no-repeat"
                            style={{
                                backgroundImage: `url(${top1.avatar})`
                            }}
                        >
                        </div>
                        <ImageFrame className="z-10 w-[10rem] h-[11rem]" />
                        <div className="flex flex-col items-center justify-center gap-[.75rem] mt-[1rem]">
                            <span className="ftext-kanit text-[1.29rem] font-bold leading-relaxed">{top1.label}</span>

                            <div className="flex items-center justify-center w-[9.5rem] h-[2.25rem] ">
                                <span className="text-bignoodle text-nowrap text-[#FFCA2AF5] font-normal text-[3rem] ">{top1.points}</span>
                            </div>

                              <div className="points-clip-path flex items-center justify-center w-[7rem] h-[1.5rem] bg-[#C74E88] mt-[1.5rem]">
                        <span className="text-nowrap text-[0.875rem]">MVP</span>
                    </div>

                            
                        </div>
                    </div>
                </div>

                <div className="w-[16rem] h-[31rem] flex flex-col items-center justify-start pt-[7rem] relative"
                 style={{
                            backgroundImage: `url(${BlueFlag})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPositionX: 'center',                           
                        }}
                        >
                            <span className="text-kanit text-[3rem] font-bold leading-relaxed absolute -top-[4rem]">3º</span>
                    <div className="relative bottom-[.25rem]">
                        <div
                            className="absolute top-[5rem] left-1/2 -translate-x-1/2 -translate-y-1/2 hex w-[6.6rem] h-[7.68rem] bg-contain bg-no-repeat"
                            style={{
                                backgroundImage: `url(${top3.avatar})`
                            }}
                        >
                        </div>
                        <ImageFrame className="z-10 w-[10rem] h-[10rem]" />
                        <div className="flex flex-col items-center justify-center gap-[.75rem] mt-[1rem]">
                            <span className="ftext-kanit text-[1.29rem] font-bold leading-relaxed">{top3.label}</span>

                            <div className="flex items-center justify-center w-[9.5rem] h-[2.25rem] ">
                                <span className="text-bignoodle text-nowrap text-[#FFCA2AF5] font-normal text-[2.5rem] ">{top3.points}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[16rem] h-[31rem] flex flex-col items-center justify-start pt-[7rem] relative"
                 style={{
                            backgroundImage: `url(${BlueFlag})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPositionX: 'center',                           
                        }}
                        >
                            <span className="text-kanit text-[3rem] font-bold leading-relaxed absolute -top-[4rem]">5º</span>
                    <div className="relative bottom-[.25rem]">
                        <div
                            className="absolute top-[5rem] left-1/2 -translate-x-1/2 -translate-y-1/2 hex w-[6.6rem] h-[7.68rem] bg-contain bg-no-repeat"
                            style={{
                                backgroundImage: `url(${top5.avatar})`
                            }}
                        >
                        </div>
                        <ImageFrame className="z-10 w-[10rem] h-[10rem]" />
                        <div className="flex flex-col items-center justify-center gap-[.75rem] mt-[1rem]">
                            <span className="ftext-kanit text-[1.29rem] font-bold leading-relaxed">{top5.label}</span>

                            <div className="flex items-center justify-center w-[9.5rem] h-[2.25rem] ">
                                <span className="text-bignoodle text-nowrap text-[#FFCA2AF5] font-normal text-[2.5rem] ">{top5.points}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}