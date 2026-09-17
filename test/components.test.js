import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import AddItemForm from '../src/components/AddItemForm.vue'
import GroceryItem from '../src/components/GroceryItem.vue'
import GroceryList from '../src/components/GroceryList.vue'
import { useGroceryStore } from '../src/stores/grocery.js'

// Components against a testing pinia, as the Pinia cookbook shows. Actions
// are stubbed by default, so a test checks that the component called the
// right action; stubActions: false runs the real store end to end.
const mountWith = (component, options = {}, props = {}) =>
  mount(component, { props, global: { plugins: [createTestingPinia(options)] } })

describe('AddItemForm', () => {
  it('keeps Add disabled until something other than blanks is typed', async () => {
    const wrapper = mountWith(AddItemForm)
    const add = wrapper.find('[data-testid=add]')

    expect(add.attributes('disabled')).toBeDefined()
    await wrapper.find('[data-testid=item-name]').setValue('   ')
    expect(add.attributes('disabled')).toBeDefined()
    await wrapper.find('[data-testid=item-name]').setValue('Chicken')
    expect(add.attributes('disabled')).toBeUndefined()
  })

  it('submitting calls addItem with the name and empties the field', async () => {
    const wrapper = mountWith(AddItemForm)
    const store = useGroceryStore()

    await wrapper.find('[data-testid=item-name]').setValue('Chicken')
    await wrapper.find('form').trigger('submit')

    expect(store.addItem).toHaveBeenCalledTimes(1)
    expect(store.addItem).toHaveBeenCalledWith('Chicken')
    expect(wrapper.find('[data-testid=item-name]').element.value).toBe('')
  })
})

describe('GroceryItem', () => {
  it('shows the name and a box that reflects bought', () => {
    const wrapper = mountWith(GroceryItem, {}, { item: { id: 3, name: 'Strawberries', bought: true } })

    expect(wrapper.find('[data-testid=name]').text()).toBe('Strawberries')
    expect(wrapper.find('[data-testid=bought]').element.checked).toBe(true)
  })

  it('changing the box calls toggleItem with the id', async () => {
    const wrapper = mountWith(GroceryItem, {}, { item: { id: 3, name: 'Strawberries', bought: false } })
    const store = useGroceryStore()

    await wrapper.find('[data-testid=bought]').trigger('change')

    expect(store.toggleItem).toHaveBeenCalledWith(3)
  })
})

describe('GroceryList', () => {
  it('renders the items of the store and the count', () => {
    const wrapper = mountWith(GroceryList, {
      initialState: {
        grocery: {
          items: [
            { id: 1, name: 'Apples', bought: false },
            { id: 2, name: 'Strawberries', bought: true },
            { id: 3, name: 'Chicken', bought: true },
          ],
        },
      },
    })

    expect(wrapper.findAll('[data-testid=item]')).toHaveLength(3)
    expect(wrapper.findAll('[data-testid=name]').map((l) => l.text())).toEqual(['Apples', 'Strawberries', 'Chicken'])
    expect(wrapper.find('[data-testid=count]').text()).toBe('Items bought: 2 / 3')
    expect(wrapper.find('[data-testid=clear]').attributes('disabled')).toBeUndefined()
  })

  it('shows no list and a disabled Clear when empty', () => {
    const wrapper = mountWith(GroceryList)

    expect(wrapper.find('[data-testid=list]').exists()).toBe(false)
    expect(wrapper.find('[data-testid=count]').text()).toBe('Items bought: 0 / 0')
    expect(wrapper.find('[data-testid=clear]').attributes('disabled')).toBeDefined()
  })

  it('Clear calls the clear action', async () => {
    const wrapper = mountWith(GroceryList, { initialState: { grocery: { items: [{ id: 1, name: 'Apples', bought: false }] } } })
    const store = useGroceryStore()

    await wrapper.find('[data-testid=clear]').trigger('click')

    expect(store.clear).toHaveBeenCalledTimes(1)
  })

  it('end to end with the real store: add, tick, count, clear', async () => {
    const wrapper = mountWith(GroceryList, { stubActions: false })

    await wrapper.find('[data-testid=item-name]').setValue('Apples')
    await wrapper.find('form').trigger('submit')
    await wrapper.find('[data-testid=item-name]').setValue('Chicken')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.findAll('[data-testid=item]')).toHaveLength(2)
    expect(wrapper.find('[data-testid=count]').text()).toBe('Items bought: 0 / 2')

    await wrapper.findAll('[data-testid=bought]')[1].trigger('change')
    expect(wrapper.find('[data-testid=count]').text()).toBe('Items bought: 1 / 2')

    await wrapper.find('[data-testid=clear]').trigger('click')
    expect(wrapper.find('[data-testid=list]').exists()).toBe(false)
    expect(wrapper.find('[data-testid=count]').text()).toBe('Items bought: 0 / 0')
  })
})
