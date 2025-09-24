const envVar = require('@availity/env-var')
const { addGlanceScript } = require('../index')

jest.mock('@availity/env-var/src', () => jest.fn())

describe('glance-tag', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  test('load event should add glance script just from importing package', () => {
    window.dispatchEvent(new Event('load'))
    const scriptTag = document.getElementById('glance-cobrowse')
    expect(scriptTag).not.toBeNull()
  })

  test('glance script should have production site in production', () => {
    envVar.mockReturnValue(true)
    addGlanceScript()
    const scriptTag = document.getElementById('glance-cobrowse')
    expect(scriptTag.src).toBe('https://www.glancecdn.net/cobrowse/CobrowseJS.ashx?group=21510&site=production')
  })

  test('glance script should have staging site when not in production', () => {
    envVar.mockReturnValue(undefined)
    addGlanceScript()
    const scriptTag = document.getElementById('glance-cobrowse')
    expect(scriptTag.src).toBe('https://www.glancecdn.net/cobrowse/CobrowseJS.ashx?group=21510&site=staging')
  })
})
