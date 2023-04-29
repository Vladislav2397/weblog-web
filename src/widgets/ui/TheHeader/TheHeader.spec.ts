import { shallowMount } from '@vue/test-utils'
import TheHeader from './TheHeader.vue'

describe('TheHeader spec', () => {
    it('Snapshot', () => {
        const wrapper = shallowMount(TheHeader)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
