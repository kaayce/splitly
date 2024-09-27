import { defineStore } from 'pinia'
import { FetchError, ofetch } from 'ofetch'
import type { FriendDetail } from '@/types'
import { useUserStore } from '@/stores'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useFriendsStore = defineStore('friends', {
  state: () => ({
    friends: [] as FriendDetail[],
    loading: false,
    error: null as string | null,
    selectedFriendIds: new Set<string>()
  }),
  actions: {
    async fetchFriends() {
      this.loading = true
      this.error = null
      let userId = null
      try {
        const userStore = useUserStore()
        if (userStore.currentUser) {
          userId = userStore.currentUser.userId
        }
        if (userId === null) {
          throw new Error('User ID is not available')
        }
        const data = await ofetch<FriendDetail[]>(`${BASE_URL}/users/${userId}/friends`)
        this.friends = data
        return data
      } catch (error: unknown) {
        if (error instanceof FetchError) {
          this.error = error.data?.message || 'Failed to fetch friends'
        } else {
          this.error = 'Failed to fetch friends'
        }
        console.error('Error fetching friends:', error)
        throw error
      } finally {
        this.loading = false
      }
    },
    toggleFriendSelection(friendId: string) {
      if (this.selectedFriendIds.has(friendId)) {
        this.selectedFriendIds.delete(friendId)
      } else {
        this.selectedFriendIds.add(friendId)
      }
    }
  },
  getters: {
    selectedFriends(): FriendDetail[] {
      return this.friends.filter((friend) => this.selectedFriendIds.has(friend.friendId))
    }
  },
  persist: {
    omit: ['selectedFriendIds']
  }
})
