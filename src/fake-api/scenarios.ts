// The scenario switch: lets anyone reach a state of the app on purpose. Open any page with
// ?scenario=empty, or several at once with ?scenario=load-fails,refetch-fails. The tab remembers them,
// so in-app links and reloads keep them, and ?scenario= with no value turns them all off. It ships in the
// Pages build too, since that runs on the fake API, and goes with the rest of fake-api/.
const scenarios = {
  empty: 'The user has no channels.',
  'load-fails': 'Loading channels always fails.',
  'refetch-fails': 'The first load of channels works, and every later one fails.',
} as const

export type Scenario = keyof typeof scenarios

const STORAGE_KEY = 'livecatch.scenarios'

function isScenario(name: string): name is Scenario {
  return Object.hasOwn(scenarios, name)
}

// Storage can be blocked (private windows, blocked site data): the switch then lasts until the URL changes.
function remembered() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) ?? ''
  } catch {
    return ''
  }
}

function remember(value: string) {
  try {
    if (value === '') {
      sessionStorage.removeItem(STORAGE_KEY)
    } else {
      sessionStorage.setItem(STORAGE_KEY, value)
    }
  } catch {
    // Not remembered: see remembered().
  }
}

function readScenarios() {
  const fromUrl = new URLSearchParams(window.location.search).get('scenario')
  if (fromUrl !== null) {
    remember(fromUrl)
  }
  const names = (fromUrl ?? remembered())
    .split(',')
    .map((name) => name.trim())
    .filter((name) => name !== '')

  const active = new Set<Scenario>()
  for (const name of names) {
    if (isScenario(name)) {
      active.add(name)
    } else {
      console.warn(`Unknown scenario "${name}". Known scenarios: ${Object.keys(scenarios).join(', ')}.`)
    }
  }
  for (const name of active) {
    console.info(`Scenario on: ${name}. ${scenarios[name]}`)
  }
  return active
}

// Read once, when the app loads.
const active = readScenarios()

export function isScenarioOn(scenario: Scenario) {
  return active.has(scenario)
}
