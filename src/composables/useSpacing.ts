import { ref, watchEffect } from 'vue'

type SpacingScale = 'grid' | 'golden'
type Density = 'compact' | 'comfortable' | 'spacious'

const SCALE_KEY   = 'ds-spacing'
const DENSITY_KEY = 'ds-density'

const scale   = ref<SpacingScale>((localStorage.getItem(SCALE_KEY)   as SpacingScale)  ?? 'grid')
const density = ref<Density>((localStorage.getItem(DENSITY_KEY) as Density) ?? 'comfortable')

watchEffect(() => {
  const el = document.documentElement
  el.setAttribute('data-spacing', scale.value)
  el.setAttribute('data-density',  density.value)
  localStorage.setItem(SCALE_KEY,   scale.value)
  localStorage.setItem(DENSITY_KEY, density.value)
})

export function useSpacing() {
  function toggleScale() {
    scale.value = scale.value === 'grid' ? 'golden' : 'grid'
  }

  function setScale(value: SpacingScale) {
    scale.value = value
  }

  function setDensity(value: Density) {
    density.value = value
  }

  return { scale, density, toggleScale, setScale, setDensity }
}
