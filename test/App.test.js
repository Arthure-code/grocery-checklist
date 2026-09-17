import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import App from '../src/App.vue'

describe('App', () => {
  it('shows the grocery list inside the page frame', () => {
    const wrapper = mount(App, { global: { plugins: [createTestingPinia()] } })

    expect(wrapper.find('.navbar-brand').text()).toBe('Grocery Checklist')
    expect(wrapper.find('h1').text()).toBe('My grocery list')
    expect(wrapper.find('[data-testid=count]').text()).toBe('Items bought: 0 / 0')
  })
})
