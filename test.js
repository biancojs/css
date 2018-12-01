require('jsdom-global')()
const assert = require('assert')
const css = require('./')

describe('Bianco css', function() {
  it('export default contains all the module methods', function() {
    assert.deepEqual(Object.keys(css.default), [
      'get',
      'set',
      'remove'
    ])
  })

  it('it can set a style attribute', function() {
    const div = document.createElement('div')
    css.set(div, 'color', 'red')
    assert.equal(div.style.color, 'red')
  })

  it('it can set a style attribute on multiple nodes', function() {
    const div = document.createElement('div')
    const span = document.createElement('span')
    css.set([div, span], 'color', 'red')
    assert.equal(div.style.color, 'red')
    assert.equal(span.style.color, 'red')
  })

  it('it can set multiple style attributes', function() {
    const div = document.createElement('div')
    css.set(div, {
      color: 'red',
      'font-size': '12px'
    })
    assert.equal(div.style.color, 'red')
    assert.equal(div.style.fontSize, '12px')
  })

  it('it can set multiple style attributes on multiple nodes', function() {
    const div = document.createElement('div')
    const span = document.createElement('span')
    css.set([div, span], {
      color: 'red',
      'font-size': '12px'
    })
    assert.equal(div.style.color, 'red')
    assert.equal(div.style.fontSize, '12px')

    assert.equal(span.style.color, 'red')
    assert.equal(span.style.fontSize, '12px')
  })

  it('it can get style attributes', function() {
    const div = document.createElement('div')
    css.set(div, {
      color: 'red',
      'font-size': '12px'
    })
    assert.equal(css.get(div, 'color'), 'red')
    assert.equal(css.get(div, 'fontSize'), '12px')
  })

  it('it can get style attributes on multiple nodes', function() {
    const div = document.createElement('div')
    const span = document.createElement('span')
    css.set([div, span], {
      color: 'red',
      'font-size': '12px'
    })
    assert.deepEqual(css.get([div, span], 'color'), ['red', 'red'])
    assert.deepEqual(css.get([div, span], 'fontSize'), ['12px', '12px'])
  })

  it('it can get multiple style attributes', function() {
    const div = document.createElement('div')
    css.set(div, {
      color: 'red',
      'font-size': '12px'
    })
    assert.deepEqual(css.get(div, ['color', 'font-size']), { color: 'red', 'font-size': '12px' })
  })

  it('it can get multiple style attributes on multiple nodes', function() {
    const div = document.createElement('div')
    const span = document.createElement('span')
    css.set([div, span], {
      color: 'red',
      'font-size': '12px'
    })
    assert.deepEqual(css.get([div, span], ['color', 'font-size']), [{color: 'red', 'font-size': '12px'}, {color: 'red', 'font-size': '12px'}])
  })

  it('it can remove style attributes', function() {
    const div = document.createElement('div')
    css.set(div, {
      color: 'red',
      'font-size': '12px'
    })
    css.remove(div, 'color')
    css.remove(div, 'font-size')
    assert.deepEqual(css.get(div, ['color', 'font-size']), {color: '', 'font-size': ''})
  })

  it('it can remove style attributes from multiple nodes', function() {
    const div = document.createElement('div')
    const span = document.createElement('span')
    css.set([div, span], {
      color: 'red',
      'font-size': '12px'
    })
    css.remove([div, span], 'color')
    assert.deepEqual(css.get([div, span], 'color'), ['', ''])
  })

  it('it can remove multiple style attributes from multiple nodes', function() {
    const div = document.createElement('div')
    const span = document.createElement('span')
    css.set([div, span], {
      color: 'red',
      'font-size': '12px'
    })
    css.remove([div, span], ['color', 'font-size'])
    assert.deepEqual(css.get([div, span], ['color', 'font-size']), [{color: '', 'font-size': ''}, {color: '', 'font-size': ''}])
  })
})
