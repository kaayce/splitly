import { defineStore } from 'pinia'
import { FetchError, ofetch } from 'ofetch'
import type { Transaction } from '@/types'
import { useAccountStore } from '@/stores'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: [] as Transaction[],
    error: null as string | null,
    isTransactionLoading: false
  }),
  actions: {
    async fetchAccountTransactions() {
      this.isTransactionLoading = true
      this.error = null
      let accountId = null
      try {
        const accountStore = useAccountStore()
        if (accountStore.selectedAccount) {
          accountId = accountStore.selectedAccount.accountId
        }
        if (accountId === null) {
          throw new Error('Account ID is not available')
        }
        const data = await ofetch<Transaction[]>(`${BASE_URL}/accounts/${accountId}/transactions`)
        this.transactions = data
        return data
      } catch (error: unknown) {
        if (error instanceof FetchError) {
          this.error = error.data?.message || 'Failed to fetch transactions'
        } else {
          this.error = 'Failed to fetch transactions'
        }
        console.error('Error fetching transactions:', error)
        throw error
      } finally {
        this.isTransactionLoading = false
      }
    }
  },
  getters: {
    getTransactionById: (state) => {
      return (transactionId: string) => {
        return state.transactions.find((transaction) => transaction.transactionId === transactionId)
      }
    }
  },
  persist: true
})
