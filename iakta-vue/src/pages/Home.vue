<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import BaseInput from '../components/BaseInput.vue'
import CustomLayout from '../components/CustomLayout.vue'

defineOptions({
  name: 'Home',
  inheritAttrs: false,
})

const loginData = reactive({
  email: '',
  password: '',
})

const emailPros = {
  name: 'Email',
  label: 'Email',
}

const capitalizeReactive = computed(() => (key: keyof typeof loginData) => loginData[key].toUpperCase())

function logFocus(e: Event) {
  console.log('focus', (e.target as any).id)
}

const componentType = ref('p')
watchEffect(() => {
  console.log(loginData.email)
})

const myParagraph = ref<HTMLParagraphElement>()

watch(myParagraph, (p) => {
  if (p)
    p.textContent = 'ciao con il ref'
})
</script>

<template>
  <div>
    <h1>Home</h1>
    <p ref="myParagraph" />

    <CustomLayout>
      <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {{ capitalizeReactive('email') }}
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" method="POST">
            <div class="relative">
              <BaseInput
                v-model="loginData.email" v-bind="emailPros"
                attributo="nuovo valore attributo"
                @focus="logFocus"
                @canta="console.log($event)"
              >
                <template #label>
                  <span class="text-green-500">Label nuova</span>
                </template>
                <template #before="{ uuid }">
                  <div class="text-sm absolute top-0 right-0">
                    {{ uuid }}
                    <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                  </div>
                </template>
              </BaseInput>
            </div>
            email = {{ loginData.email }}
            <BaseInput v-model="loginData.password" error-msg="password errata" name="password" label="Password" />
            <div>
              {{ capitalizeReactive('password') }}
              <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-500">
            Not a member?
            {{ ' ' }}
            <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
          </p>
        </div>
      </div>
    </CustomLayout>

    <component :is="componentType">
      Testo
    </component>
  </div>
</template>
