import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

// The whole grocery list lives here: the items to buy, each with a bought
// flag, and what can be derived from them. Components read the store and
// call its actions; none of them keeps a list of its own.
export const useGroceryStore = defineStore('grocery', () => {
  const items = ref([])
  let nextId = 1

  const boughtCount = computed(() => items.value.filter((item) => item.bought).length)
  const totalCount = computed(() => items.value.length)

  // An item is a trimmed, non-empty name; a blank entry is ignored.
  function addItem(name) {
    const trimmed = name.trim()
    if (trimmed === '') return
    items.value.push({ id: nextId++, name: trimmed, bought: false })
  }

  function toggleItem(id) {
    const item = items.value.find((item) => item.id === id)
    if (item) item.bought = !item.bought
  }

  function clear() {
    items.value = []
  }

  return { items, boughtCount, totalCount, addItem, toggleItem, clear }
})
