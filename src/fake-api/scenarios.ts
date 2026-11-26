// Lets anyone reach a state on purpose: open any page with ?scenario=channels.no-channels, or several
// names separated by commas. The tab keeps them until a page opens with ?scenario= and no value. It ships
// in the Pages build, which runs on the fake API too. Names are `<area>.<scenario>`, so areas never
// clash. A failure is named after the action the user sees fail, and a data state after what they see.
const scenarios = {
  'channels.no-channels': 'The user has no channels.',
  'channels.loading-fails': 'Loading channels always fails.',
  'channels.reloading-fails': 'The first load of channels works, and every later one fails.',
  'channels.start-listening-fails': 'Starting listening always fails.',
  'channels.stop-listening-fails': 'Stopping listening always fails.',
} as const

export type Scenario = keyof typeof scenarios

const STORAGE_KEY = 'livecatch.scenarios'

function isScenario(name: string): name is Scenario {
  return Object.hasOwn(scenarios, name)
}

// Storage can be blocked, as in private windows: the switch then lasts until the URL changes.
function storedScenarios() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) ?? ''
  } catch {
    return ''
  }
}

function storeScenarios(value: string) {
  try {
    if (value === '') {
      sessionStorage.removeItem(STORAGE_KEY)
    } else {
      sessionStorage.setItem(STORAGE_KEY, value)
    }
  } catch {
    // Blocked: see storedScenarios().
  }
}

function readScenarios() {
  const fromUrl = new URLSearchParams(window.location.search).get('scenario')
  if (fromUrl !== null) {
    storeScenarios(fromUrl)
  }
  const names = (fromUrl ?? storedScenarios())
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

const activeScenarios = readScenarios()

export function isScenarioOn(scenario: Scenario) {
  return activeScenarios.has(scenario)
}
