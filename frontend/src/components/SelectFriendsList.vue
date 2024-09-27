<script setup lang="ts">
import { UserIcon } from '@heroicons/vue/24/solid';
import { useRouter, useRoute } from 'vue-router';
import type { FriendDetail } from "@/types";

defineProps<{
  friends: FriendDetail[]
  toggleSelection: (id: string) => void;
  isFriendSelected: (id: string) => boolean;
}>();

const router = useRouter();
const route = useRoute();
const transactionId = route.params.id as string;

const navigateToSplitBill = () => {
  router.push({
    name: 'split-bill',
    params: { id: transactionId },
  });
};
</script>

<template>
  <div>
    <h2 class="mb-2 text-gray-400">Friends</h2>
    <div class="space-y-2">
      <div
        v-for="friend in friends"
        :key="friend.friendId"
        :class="[
          'flex items-center justify-between cursor-pointer rounded-lg p-3 transition-colors duration-300 overflow-auto',
          isFriendSelected(friend.friendId) ? 'bg-green-600' : 'bg-gray-800 hover:bg-gray-700'
        ]"
        @click="toggleSelection(friend.friendId)"
      >
        <div class="flex items-center">
          <div class="flex justify-center items-center rounded-full bg-blue-300 bg-opacity-50 mr-6">
            <UserIcon class="size-6 text-gray-700" />
          </div>
          <span>{{ friend.fullName }}</span>
        </div>
        <input
          type="checkbox"
          id="friend-{{ friend.friendId }}"
          :checked="isFriendSelected(friend.friendId)"
          @change="toggleSelection(friend.friendId)"
          class="form-checkbox h-5 w-5 text-blue-600 rounded bg-gray-700 border-gray-600"
        >
      </div>
    </div>
    <div class="flex justify-end mt-8">
      <button
        @click="navigateToSplitBill"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Next
      </button>
    </div>
  </div>
</template>
