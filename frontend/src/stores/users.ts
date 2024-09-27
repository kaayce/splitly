import { defineStore } from 'pinia'
import { FetchError, ofetch } from 'ofetch'

import type { User } from '@/types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    error: null as string | null,
    currentUser: null as User | null,
    isUserLoading: false
  }),
  actions: {
    async fetchUsers() {
      this.error = null
      this.isUserLoading = true
      try {
        const data = await ofetch<User[]>(`${BASE_URL}/users`)
        this.users = data
        if (this.users.length > 0) {
          this.currentUser = this.users[0]
        }
        return data
      } catch (error: unknown) {
        if (error instanceof FetchError) {
          this.error = error.data?.message || 'Failed to fetch users'
        } else {
          this.error = 'Failed to fetch users'
        }
        console.error('Error fetching users:', error)
        throw error
      } finally {
        this.isUserLoading = false
      }
    },
    setCurrentUser(user: User) {
      this.currentUser = user
    }
  },
  getters: {
    curentUserName: (state) => state?.currentUser?.fullName?.split?.(' ')[0] || '',
    currentUserId: (state) => state?.currentUser?.userId || ''
  },
  persist: true
})
