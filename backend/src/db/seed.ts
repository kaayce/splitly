import 'dotenv/config'

import { db } from './dbClient'
import { accounts as accountsTable } from './schema/accounts'
import { transactions as transactionsTable } from './schema/transactions'
import { billSplits as billSplitsTable } from './schema/billSplits'
import { billParticipants as billParticipantsTable } from './schema/billParticipants'
import { users as usersTable } from './schema/users'
import { friends as friendsTable } from './schema/friends'
import logger from '@/services/logger'

export function toCents(amount: number, factor = 100) {
  return Math.round(amount * factor)
}

async function runSeed() {
  console.log('⏳ Running seed...')

  const start = Date.now()

  try {
    // Seed Users
    const usersData = [
      { email: 'john@example.com', fullName: 'John Doe' },
      { email: 'jane@example.com', fullName: 'Jane Smith' },
      { email: 'karen@example.com', fullName: 'Karen Johnson' },
      { email: 'brian@example.com', fullName: 'Brian Wilson' },
      { email: 'leah@example.com', fullName: 'Leah Davis' },
      { email: 'sara@example.com', fullName: 'Sara Nguyen' },
      { email: 'dave@example.com', fullName: 'Dave Lee' },
      { email: 'bob@example.com', fullName: 'Bob Thompson' }
    ]

    const createdUsers = await db.insert(usersTable).values(usersData).returning()
    logger.info('Users seeded', { createdUsers })

    // Seed Accounts - Multiple accounts for some users
    const accountsData = createdUsers.flatMap((user, index) => {
      const numberOfAccounts = index === 0 || index === 1 ? 2 : 1 // First two users get 2 accounts
      return Array.from({ length: numberOfAccounts }, (_, i) => ({
        userId: user.userId,
        accountType: i % 2 === 0 ? ('checking' as const) : ('savings' as const),
        balance: toCents(1000 + index * 200) // Different balances
      }))
    })

    const createdAccounts = await db.insert(accountsTable).values(accountsData).returning()
    logger.info('Accounts seeded', { createdAccounts })

    // Seed Transactions - Each account has at least 2 transactions
    const transactionsData = createdAccounts.flatMap((account, index) => {
      return [
        {
          accountId: account.accountId,
          category: index % 2 === 0 ? ('dining' as const) : ('entertainment' as const),
          vendor: 'Starbucks',
          amount: toCents(15 + index * 5)
        },
        {
          accountId: account.accountId,
          category: 'groceries' as const,
          vendor: 'Walmart',
          amount: toCents(50 + index * 10)
        }
      ]
    })

    const createdTransactions = await db
      .insert(transactionsTable)
      .values(transactionsData)
      .returning()
    logger.info('Transactions seeded', { createdTransactions })

    // Seed Bill Splits - Each transaction has a split with participants
    const billSplitsData = createdTransactions.map((transaction, index) => ({
      transactionId: transaction.transactionId,
      payerId: createdUsers[index % createdUsers.length].userId, // Rotate users as payers
      totalAmount: transaction.amount
    }))

    const createdBillSplits = await db.insert(billSplitsTable).values(billSplitsData).returning()
    logger.info('Bill Splits seeded', { createdBillSplits })

    // Seed Bill Participants - Each split has at least 2 participants
    const billParticipantsData = createdBillSplits.flatMap((split, index) => {
      const participants = [
        {
          splitId: split.splitId,
          userId: createdUsers[index % createdUsers.length].userId,
          amountOwed: split.totalAmount / 2,
          paymentStatus: 'paid' as const
        },
        {
          splitId: split.splitId,
          userId: createdUsers[(index + 1) % createdUsers.length].userId,
          amountOwed: split.totalAmount / 2,
          paymentStatus: 'pending' as const
        }
      ]
      return participants
    })

    const createdBillParticipants = await db
      .insert(billParticipantsTable)
      .values(billParticipantsData)
      .returning()
    logger.info('Bill Participants seeded', { createdBillParticipants })

    // Seed Friendships - Each user has at least 2 friends
    const friendsData = createdUsers.flatMap((user, index) => {
      const friends = [
        {
          userId: user.userId,
          friendId: createdUsers[(index + 1) % createdUsers.length].userId
        },
        {
          userId: user.userId,
          friendId: createdUsers[(index + 2) % createdUsers.length].userId
        }
      ]
      return friends
    })

    const createdFriendships = await db.insert(friendsTable).values(friendsData).returning()
    logger.info('Friendships seeded', { createdFriendships })
  } catch (error) {
    logger.error('❌ Seed failed', error)
    throw error
  }

  const end = Date.now()
  console.log(`✅ Seed completed in ${end - start}ms`)
  process.exit(0)
}

runSeed().catch((err) => {
  console.error('❌ Seed encountered an error')
  console.error(err)
  process.exit(1)
})
