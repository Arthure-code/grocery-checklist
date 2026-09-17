import { createPinia, setActivePinia } from 'pinia'
import { useGroceryStore } from '../src/stores/grocery.js'

// The store on its own, as the Pinia cookbook shows: a fresh pinia before
// each test, then the actions and the getters.
describe('grocery store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts empty', () => {
    const store = useGroceryStore()
    expect(store.items).toEqual([])
    expect(store.totalCount).toBe(0)
    expect(store.boughtCount).toBe(0)
  })

  it('addItem appends a trimmed item, not bought, with its own id', () => {
    const store = useGroceryStore()
    store.addItem('  Apples ')
    store.addItem('Strawberries')
    expect(store.items).toEqual([
      { id: 1, name: 'Apples', bought: false },
      { id: 2, name: 'Strawberries', bought: false },
    ])
    expect(store.totalCount).toBe(2)
  })

  it('addItem ignores a blank name', () => {
    const store = useGroceryStore()
    store.addItem('')
    store.addItem('   ')
    expect(store.items).toEqual([])
  })

  it('toggleItem flips bought and boughtCount follows', () => {
    const store = useGroceryStore()
    store.addItem('Apples')
    store.addItem('Chicken')
    store.toggleItem(2)
    expect(store.items[1].bought).toBe(true)
    expect(store.boughtCount).toBe(1)
    store.toggleItem(2)
    expect(store.items[1].bought).toBe(false)
    expect(store.boughtCount).toBe(0)
  })

  it('toggleItem with an unknown id changes nothing', () => {
    const store = useGroceryStore()
    store.addItem('Apples')
    store.toggleItem(99)
    expect(store.boughtCount).toBe(0)
  })

  it('clear empties the list', () => {
    const store = useGroceryStore()
    store.addItem('Apples')
    store.addItem('Chicken')
    store.toggleItem(1)
    store.clear()
    expect(store.items).toEqual([])
    expect(store.totalCount).toBe(0)
    expect(store.boughtCount).toBe(0)
  })
})
