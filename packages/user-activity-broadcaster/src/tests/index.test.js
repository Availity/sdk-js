const userActivityBroadcaster = require('../index')

const {
  getTargetOrigin,
  handleActivity,
  updateInterval,
  addEventListeners,
  lastActivity
} = userActivityBroadcaster

describe('user-activity-broadcaster', () => {
  describe('targetOrigin', () => {
    test('essentials.availity.com origin should have targetOrigion of apps', () => {
      const testOrigin = 'essentials.availity.com'
      const expected = 'apps.availity.com'

      const targetOrigin = getTargetOrigin(testOrigin)

      expect(targetOrigin).toBe(expected)
    })

    test('apps.availity.com origin should have targetOrigion of essentials', () => {
      const testOrigin = 'apps.availity.com'
      const expected = 'essentials.availity.com'

      const targetOrigin = getTargetOrigin(testOrigin)

      expect(targetOrigin).toBe(expected)
    })
  })

  test('should call handleActivityUpdate every interval', async () => {
    const testInterval = 1000
    const waitTime = 2999
    const expectedCallCount = 2

    window.top.postMessage = () => {}

    const spy = jest.spyOn(userActivityBroadcaster, 'handleActivityUpdate')

    updateInterval(testInterval)

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, waitTime)
    })

    expect(spy).toHaveBeenCalledTimes(expectedCallCount)
  })

  test('keydown events call handleActivity', async () => {
    const spy = jest.spyOn(userActivityBroadcaster, 'handleActivity')

    addEventListeners()

    document.dispatchEvent(new MouseEvent('keydown'))

    expect(spy).toHaveBeenCalled()
  })

  test('mousedown events call handleActivity', async () => {
    const spy = jest.spyOn(userActivityBroadcaster, 'handleActivity')

    addEventListeners()

    document.dispatchEvent(new MouseEvent('mousedown'))

    expect(spy).toHaveBeenCalled()
  })

  test('handleActivity should update handleActivity', () => {
    handleActivity()
    expect(lastActivity.time).toBeDefined()
  })
})
