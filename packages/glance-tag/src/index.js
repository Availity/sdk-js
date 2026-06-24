/* eslint-disable unicorn/prefer-dom-node-dataset */
import envVar from '@availity/env-var'

export const addGlanceScript = () => {
  const script = document.createElement('script')
  const isProd = envVar({ prod: true })
  const site = isProd ? 'production' : 'staging'

  script.setAttribute('id', 'glance-cobrowse')
  script.setAttribute('charset', 'glance-cobrowse')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', `https://www.glancecdn.net/cobrowse/CobrowseJS.ashx?group=21510&site=${site}`)
  script.setAttribute('data-groupid', '21510')
  script.setAttribute('data-site', site)
  script.setAttribute('data-ws', 'www.glance.net')
  script.setAttribute('data-presence', 'on')
  script.setAttribute('data-cookietype', 'normal')

  document.head.append(script)
}

window.addEventListener('load', addGlanceScript);
