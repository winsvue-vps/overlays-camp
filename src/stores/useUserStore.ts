import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '@/services/api'
import { errorHandler } from '@/utils/errorHandler'
// import type { IWinsUser } from '@/pages/Tracking/types/IUser'
import type { APIUser } from 'discord-api-types/v10'

export interface IWinsUser {
  user_id: number;
  exp: number;
  avatar: string;
  nick: string;
  discord: string;
  groups: null;
  banner: string;
  badges: string[];
  address: string;
  name: string;
  surname: string;
  state: string;
  gender: string;
  birthday: string;
  coins: number;
  vips: string[];
}


type useUserStore = {
  discordUser?: APIUser & { avatarURL?: string }
  winsUser: IWinsUser
  fetchUserByDiscordId: (discordId: string) => void
  fetchVerifyIfUserHasNPSRole: (discordId: string) => void
  isFetching: boolean
  hasNPSRole: boolean
  hasLiveRole: boolean
}

export const useUserStore = create(
  persist<useUserStore, [], [], Partial<useUserStore>>(
    (set) => ({
      discordUser: undefined,
      winsUser: {} as IWinsUser,
      isFetching: false,
      hasNPSRole: false,
      hasLiveRole: false,

      fetchUserByDiscordId: async (discordId: string) => {
        set({ isFetching: true })
        try {
          const winsUserData = await api.get(`/users?discord=${discordId}`)
          set({ winsUser: winsUserData.data[0] })
        } catch (error) {
          errorHandler(error)
        } finally {
          set({ isFetching: false })
        }
      },

      fetchVerifyIfUserHasNPSRole: async (discordId: string) => {
        set({ isFetching: true })
        try {
          await api.get(`/nps/users/${discordId}`)
          set({ hasNPSRole: true })
        } catch (error) {
          set({ hasNPSRole: false })
          errorHandler(error)
        } finally {
          set({ isFetching: false })
        }
      },
    }),
    {
      name: 'user-store',
      getStorage: () => sessionStorage,
      partialize: (state): Partial<useUserStore> => ({
        winsUser: state.winsUser,
        hasNPSRole: state.hasNPSRole,
        hasLiveRole: state.hasLiveRole,
        discordUser: state.discordUser,
      }),
    }
  )
)
