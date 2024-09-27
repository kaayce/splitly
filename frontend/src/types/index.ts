export interface User {
  userId: string
  fullName: string
  email: string
}

export interface Account {
  accountId: string
  accountNumber: string
  userId: string
  accountType: 'checking' | 'savings'
  balance: number
}

export type Category = 'dining' | 'entertainment' | 'groceries' | 'utilities' | 'other'
export interface Transaction {
  transactionId: string
  accountId: string
  amount: number
  category: Category
  vendor: string
  transactionDate: number
}

export interface FriendDetail {
  friendId: string
  userId: string
  fullName: string
  email: string
}
