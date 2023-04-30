import { shallowMount } from '@vue/test-utils'
import PageLayout from './PageLayout.vue'

describe('PageLayout spec', () => {
    it('Snapshot', () => {
        const wrapper = shallowMount(PageLayout)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
