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
    test('should return the provided origin if it ends with .availity.com', () => {
      const testOrigin = 'https://essentials.availity.com'

      const targetOrigin = getTargetOrigin(testOrigin)

      expect(targetOrigin).toBe(testOrigin)
    })

    test('should return undefined if the provider origin does not end in .availity.com', () => {
      const testOrigin = 'https://essentials.availity.com.malicious.com'

      const targetOrigin = getTargetOrigin(testOrigin)

      expect(targetOrigin).toBe(undefined)
    })

    test('should return undefined if the provider origin is not a valid URL', () => {
      const testOrigin = 'essentials.availity.com'

      const targetOrigin = getTargetOrigin(testOrigin)

      expect(targetOrigin).toBe(undefined)
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
