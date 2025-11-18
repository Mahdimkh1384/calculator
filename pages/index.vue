<script setup>
import { Delete } from 'lucide-vue-next'
const displayRef = ref(null)

const buttonsData = ref([
    // ردیف اول
    { id: 1, value: 'C', type: 'action' },
    { id: 2, value: 'backspace', type: 'action' },  // آیکون Backspace
    { id: 3, value: '%', type: 'action' },
    { id: 4, value: '/', type: 'operator' },

    // ردیف دوم
    { id: 5, value: '7', type: 'number' },
    { id: 6, value: '8', type: 'number' },
    { id: 7, value: '9', type: 'number' },
    { id: 8, value: '*', type: 'operator' },

    // ردیف سوم
    { id: 9, value: '4', type: 'number' },
    { id: 10, value: '5', type: 'number' },
    { id: 11, value: '6', type: 'number' },
    { id: 12, value: '-', type: 'operator' },

    // ردیف چهارم
    { id: 13, value: '1', type: 'number' },
    { id: 14, value: '2', type: 'number' },
    { id: 15, value: '3', type: 'number' },
    { id: 16, value: '+', type: 'operator' },

    // ردیف آخر
    { id: 17, value: '0', type: 'number', span: 2 },  // دو خانه می‌گیره
    { id: 18, value: '.', type: 'number' },
    { id: 19, value: '=', type: 'action' },
])
const calculator = useCalculatorStore()

watch(
    () => calculator.value,
    () => {
        nextTick(() => {
            if (displayRef.value) {
                displayRef.value.scrollLeft = displayRef.value.scrollWidth
            }
        })
    }
)
</script>

<template>
    <div class="h-screen flex justify-center items-center">
        <div class="bg-black/80 w-full max-w-sm h-[80vh] flex flex-col rounded-2xl overflow-hidden">

            <!-- نمایشگر -->
            <div ref="displayRef"
                class="lg:h-48 w-full text-white text-6xl px-5 overflow-auto break-words text-right flex flex-col justify-end no-scrollbar">
                {{ calculator.value }}
            </div>

            <!-- دکمه‌ها -->
            <div class="grid grid-cols-4 gap-3 p-4 flex-1">
                <template v-for="button in buttonsData" :key="button.id">
                    <button @click="calculator.setValue(button)"
                        class="flex justify-center items-center text-3xl transition-all duration-150 active:scale-95 cursor-pointer"
                        :class="{
                            'bg-gray-700 text-white hover:bg-gray-600': button.type === 'action' && button.value !== 'C' && typeof button.value !== 'function',
                            'bg-red-600 text-white hover:bg-red-500': button.value === 'C',
                            'bg-blue-600 text-white hover:bg-blue-500': button.type === 'operator',
                            'bg-gray-800 text-white hover:bg-gray-700': button.type === 'number',
                            'col-span-2 rounded-full': button.span === 2,
                            'rounded-xl': !button.span
                        }">
                        <!-- آیکون Delete -->
                        <Delete v-if="button.value === 'backspace'" class="w-9 h-9" />
                        <span v-else>{{ button.value }}</span>
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>