<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { ofetch } from "ofetch";
import { useRoute, useRouter } from "vue-router";
import { useDebounceFn } from '@vueuse/core';
import { UserIcon } from '@heroicons/vue/24/solid';
import type { FriendDetail, User } from '@/types';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

const props = defineProps<{
  users: (User | FriendDetail)[],
  totalAmount: number,
  currentUserId: string,
}>();

const userContributions = ref<Record<string, number>>({});
const inputError = ref<string>("");
const postRequestError = ref<string>('');
const successMessage = ref<string>('');

const route = useRoute();
const router = useRouter()
const transactionId = route.params.id as string;

const getUserId = (user: User | FriendDetail) => ('friendId' in user) ? user.friendId : user.userId;

watchEffect(() => {
  const share = props.totalAmount / props.users.length;
  userContributions.value = Object.fromEntries(
    props.users.map(user => [getUserId(user), share])
  );
});

const updateContributions = useDebounceFn((userId: string, newValue: number) => {
  const totalContributions = Object.values(userContributions.value).reduce((acc, curr) => acc + curr, 0);

  if (totalContributions > props.totalAmount) {
    inputError.value = `Total contributions exceed ${props.totalAmount}.`;
  } else {
    const remainingAmount = props.totalAmount - newValue;
    const otherUsers = props.users.filter(user => getUserId(user) !== userId);
    const shareForOthers = remainingAmount / otherUsers.length;

    otherUsers.forEach(user => {
      userContributions.value[getUserId(user)] = shareForOthers;
    });

    inputError.value = '';
  }
}, 500);

const requestPayment = async () => {
  postRequestError.value = "";
  successMessage.value = "";
  try {
    const response = await ofetch(`${BASE_URL}/split-bill/request-payment`, {
      method: 'POST',
      body: {
        users: props.users.map(user => ({
          userId: getUserId(user),
          amountOwed: userContributions.value[getUserId(user)],
        })),
        totalAmount: props.totalAmount,
        transactionId,
        payerId: props.currentUserId,
      },
    });

    console.log('Payment request sent successfully:', response);
    successMessage.value = "Payment request sent successfully!";
    setTimeout(() => {
      router.push('/');
    }, 1500);
  } catch (error: unknown) {
    postRequestError.value = 'Failed to send payment request';
    console.error('Error sending payment request:', error);
  }
};
</script>

<template>
  <div>
    <h2 class="mb-2 text-gray-400">Breakdown of Charges</h2>

    <div v-if="inputError" class="text-red-500 mb-4">
      {{ inputError }}
    </div>

    <div v-if="successMessage" class="text-green-500 mb-4">
      {{ successMessage }}
    </div>

    <div class="space-y-2">
      <div
        v-for="user in props.users"
        :key="getUserId(user)"
        class="flex items-center justify-between bg-gray-800 cursor-pointer rounded-lg p-3 overflow-auto"
      >
        <div class="flex items-center">
          <div class="flex justify-center items-center rounded-full bg-blue-300 bg-opacity-50 mr-6">
            <UserIcon class="size-6 text-gray-700" />
          </div>
          <span>{{ user.fullName?.split?.(' ')[0] }}</span>
        </div>

        <input
          type="number"
          v-model.number="userContributions[getUserId(user)]"
          @input="updateContributions(getUserId(user), userContributions[getUserId(user)])"
          class="form-input h-8 w-24 text-white-600 rounded bg-gray-700 border-gray-600"
        />
      </div>
    </div>

    <div class="flex justify-end mt-8">
      <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" @click="requestPayment">Request Money</button>
    </div>
  </div>
</template>
