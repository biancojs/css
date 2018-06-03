import domToArray from 'bianco.dom-to-array'

/**
 * Sanitize the names of CSS properties
 * @param   { string } name - The human-readable name of the CSS property
 * @returns { string } the sanitized camel-case version.
 * @private
 */
const sanitizeName = name => name === 'float' ? 'cssFloat' : name.replace(/(.+)-(.)/, (s, m1, m2) => m1 + m2.toUpperCase())

/**
 * Parse all the nodes received to get/remove/check their properties.
 * @param   { HTMLElement|NodeList|Array } els    - DOM node/s to parse
 * @param   { string|Array }               names   - name or list of properties
 * @param   { string }                     value  - the value(s) that will be assigned
 * @returns { HTMLElement|NodeList|Array } the original array of elements passed to this function.
 * @private
 */
function setStyles(els, names, value) {
  const attrs = typeof names === 'object' ? names : { [names]: value }
  const props = Object.entries(attrs)

  domToArray(els).forEach(el => {
    props.forEach(([prop, value]) => el.style[sanitizeName(prop)] = value)
  })
  return els
}

/**
 * Set any css property on a single node or a list of DOM nodes.
 * @param   { HTMLElement|NodeList|Array } els   - DOM node/s to parse
 * @param   { string|Object }              name  - either the name of the property to set
 *                                                 or a list of properties as object key - value
 * @param   { string }                     value - the new value of the property (optional)
 * @returns { HTMLElement|NodeList|Array } the original array of elements passed to this function.
 *
 * @example
 *
 * import { set } from 'bianco.css'
 *
 * const img = document.createElement('img')
 *
 * set(img, 'width', 100)
 *
 * // or also
 * set(img, {
 *   width: 300,
 *   height: 300
 * })
 *
 */
export function set(els, name, value) {
  setStyles(els, name, value)
  return els
}

/**
 * Get any property from a single node or a list of DOM nodes.
 * @param   { HTMLElement|NodeList|Array } els   - DOM node/s to parse
 * @param   { string|Array }               names  - name or list of properties to get
 * @returns { Array|string } list of the properties found.
 *
 * @example
 *
 * import { get } from 'bianco.css'
 *
 * const img = document.createElement('img')
 *
 * get(img, 'width') // => '200'
 *
 * // or also
 * get(img, ['width', 'height']) // => {width: '200', height: '300'}
 *
 * // or also
 * get([img1, img2], ['width', 'height']) // => [{width: '200', height: '300'}, {width: '500', height: '200'}]
 */
export function get(els, names) {
  const attrs = Array.isArray(names) ? names : [names]

  const result = domToArray(els).map(el => {
    const style = window.getComputedStyle(el)
    const reduced = attrs.reduce((list, prop) => { list[prop] = style[sanitizeName(prop)]; return list }, {})
    return attrs.length > 1 ? reduced : reduced[names]
  })

  return result.length > 1 ? result : result[0]
}

/**
 * Remove any css property from a single node or a list of DOM nodes.
 * @param   { HTMLElement|NodeList|Array } els   - DOM node/s to parse
 * @param   { string|Array }               names  - name or list of properties to remove
 * @returns { HTMLElement|NodeList|Array } the original array of elements passed to this function.
 *
 * @example
 *
 * import { remove } from 'bianco.css'
 *
 * remove(img, 'width') // remove the width property
 *
 * // or also
 * remove(img, ['width', 'height']) // remove the width and the height property
 *
 * // or also
 * remove([img1, img2], ['width', 'height']) // remove the width and the height property from both images
 */
export function remove(els, names) {
  names = Array.isArray(names) ? names : [names]
  names = names.reduce((list, prop) => { list[prop] = ''; return list }, {})

  setStyles(els, names)
  return els
}

export default {
  get,
  set,
  remove
}