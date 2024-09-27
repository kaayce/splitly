import { defineStore } from 'pinia'
import { FetchError, ofetch } from 'ofetch'

import { useUserStore } from '@/stores'
import type { Account } from '@/types'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/users`

export const useAccountStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
    error: null as string | null,
    selectedAccount: null as Account | null
  }),
  actions: {
    async fetchAccounts() {
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
        const data = await ofetch<Account[]>(`${BASE_URL}/${userId}/accounts`)
        this.accounts = data
        if (this.accounts.length > 0) {
          this.selectedAccount = this.accounts[0]
        }
        return data
      } catch (error: unknown) {
        if (error instanceof FetchError) {
          this.error = error.data?.message || 'Failed to fetch accounts'
        } else {
          this.error = 'Failed to fetch accounts'
        }
        console.error('Error fetching accounts:', error)
        throw error
      }
    },
    setSelectedAccount(account: Account) {
      this.selectedAccount = account
    }
  },
  getters: {
    selectedAccountId: (state) => state.selectedAccount?.accountId
  },
  persist: true
})
