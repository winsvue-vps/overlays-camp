import { fivemRequest } from "@/services/api"
import { dataFilterTypes, matchFilterTypes, Team, useTournamentStore } from '@/stores/useTournamentStore';

async function RequestTeams(){
    const { setTeams } = useTournamentStore.getState();
    
    const response = await fivemRequest.get("/bot-api/tournament/teams")
    if (response.status !== 200) return
    setTeams(response.data as Team[])
}

async function RequestRankingData(match: matchFilterTypes, filter: dataFilterTypes, fetchAgain: boolean = false){
    const store = useTournamentStore.getState()
    const { ranking, setRanking } = store

    if (!fetchAgain) {
        const cached = ranking[match]?.[filter]
        if (cached) return
    }

    try { 
        const response = await fivemRequest.get("/bot-api/tournament/ranking", { params: {
            match,
            mvp: filter == "mvp",
        } })
        if (response.status !== 200) return
        setRanking(match, filter, response.data)
    } catch {
        console.log("failed to fetch ranking data")
    }
}

export {
    RequestTeams,
    RequestRankingData
}