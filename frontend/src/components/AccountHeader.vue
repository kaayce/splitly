<script setup lang="ts">
import type { User, Account } from '@/types';
import AccountCard from '@/components/AccountCard.vue'

interface Props {
  user: User;
  accounts: Account[];
  selectedAccount: Account;
  setSelectedAccount: (account: Account) => void,
}
defineProps<Props>()

</script>

<template>
  <div class="flex flex-col gap-3 shadow">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold">👋 Hey, {{ user?.fullName?.split?.(" ")[0] }}!</h2>
      </div>
    </div>
    <div class="overflow-x-auto">
      <div class="flex gap-4">
        <AccountCard
          v-for="account in accounts"
          :key="account.accountId"
          :account="account"
          :selected="account.accountId === selectedAccount.accountId"
          @select="setSelectedAccount"
        />
      </div>
    </div>
  </div>
</template>
