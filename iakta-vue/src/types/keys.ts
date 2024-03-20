import type { InjectionKey, Ref } from 'vue'
import { ref } from 'vue'

const searchKey: InjectionKey<{ search: Ref<string>, updateSearch: (value: string) => void }> = Symbol('search')

function factorySearch(): { search: Ref<string>, updateSearch: (value: string) => void } {
  return {
    search: ref(''),
    updateSearch(_value: string) {

    },
  }
}

export { searchKey, factorySearch }
