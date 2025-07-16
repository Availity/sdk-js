const MINUTE = 60 * 1000;
const interval = MINUTE * 5;
export const eventName = 'user_activity';

// Must be a dynamic object to test this
export const lastActivity = {};

export const getTargetOrigin = (origin = window.document.referrer) => {
  try {
    if (origin && new URL(origin).origin.endsWith('.availity.com')) {
      return origin;
    }
  } catch (error) {
    console.error('Invalid URL:', error);
  }
  // If the origin does not end with .availity.com, return undefined

  return undefined;
};

const targetOrigin = getTargetOrigin();

// PostMessage Logic
export const handleActivityUpdate = () => {
  window.top.postMessage(
    {
      event: eventName,
      time: lastActivity.time,
    },
    targetOrigin
  );
};

// Debounce Logic
let activityIntervalId = setInterval(handleActivityUpdate, interval);
// Re-assignable for testing
export const updateInterval = (newInterval) => {
  clearInterval(activityIntervalId);
  activityIntervalId = setInterval(handleActivityUpdate, newInterval);
};

// Event Handlers
export const handleActivity = () => {
  lastActivity.time = Date.now().toString();
};

// Add ability to test handleActivity and events
export const addEventListeners = () => {
  document.addEventListener('mousedown', handleActivity);
  document.addEventListener('keydown', handleActivity);
};
addEventListeners();
