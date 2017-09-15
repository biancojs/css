require('jsdom-global')()
const assert = require('assert')
const { set, get, remove } = require('./')
const $ = require('./')
const body = document.body

describe('Bianco @', function() {
  it('it can set a style attribute', function() {
    const div = document.createElement('div')
    set(div, 'color', 'red')
    assert.equal(div.style.color, 'red')
  })

  it('it can set a style attribute on multiple nodes', function() {
    const div = document.createElement('div')
    const span = document.createElement('span')
    set([div, span], 'color', 'red')
    assert.equal(div.style.color, 'red')
    assert.equal(span.style.color, 'red')
  })

  it('it can set multiple style attributes', function() {
    const div = document.createElement('div')
    set(div, {
      color: 'red',
      'font-size': '12px'
    })
    assert.equal(div.style.color, 'red')
    assert.equal(div.style.fontSize, '12px')
  })

  it('it can set multiple style attributes on multiple nodes', function() {
    const div = document.createElement('div')
    const span = document.createElement('span')
    set([div, span], {
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
    set(div, {
      color: 'red',
      'font-size': '12px'
    })
    assert.equal(get(div, 'color'), 'red')
    assert.equal(get(div, 'fontSize'), '12px')
  })

  it('it can get style attributes on multiple nodes', function() {
    const div = document.createElement('div')
    const span = document.createElement('span')
    set([div, span], {
      color: 'red',
      'font-size': '12px'
    })
    assert.deepEqual(get([div, span], 'color'), ['red', 'red'])
    assert.deepEqual(get([div, span], 'fontSize'), ['12px', '12px'])
  })

  it('it can get multiple style attributes', function() {
    const div = document.createElement('div')
    set(div, {
      color: 'red',
      'font-size': '12px'
    })
    assert.deepEqual(get(div, ['color', 'font-size']), { color: 'red', 'font-size': '12px' })
  })

  it('it can get multiple style attributes on multiple nodes', function() {
    const div = document.createElement('div')
    const span = document.createElement('span')
    set([div, span], {
      color: 'red',
      'font-size': '12px'
    })
    assert.deepEqual(get([div, span], ['color', 'font-size']), [{color: 'red', 'font-size': '12px'}, {color: 'red', 'font-size': '12px'}])
  })

  it('it can remove style attributes', function() {
    const div = document.createElement('div')
    set(div, {
      color: 'red',
      'font-size': '12px'
    })
    remove(div, 'color')
    remove(div, 'font-size')
    assert.deepEqual(get(div, ['color', 'font-size']), {color: '', 'font-size': ''})
  })

  it('it can remove style attributes from multiple nodes', function() {
    const div = document.createElement('div')
    const span = document.createElement('span')
    set([div, span], {
      color: 'red',
      'font-size': '12px'
    })
    remove([div, span], 'color')
    assert.deepEqual(get([div, span], 'color'), ['', ''])
  })

  it('it can remove multiple style attributes from multiple nodes', function() {
    const div = document.createElement('div')
    const span = document.createElement('span')
    set([div, span], {
      color: 'red',
      'font-size': '12px'
    })
    remove([div, span], ['color', 'font-size'])
    assert.deepEqual(get([div, span], ['color', 'font-size']), [{color: '', 'font-size': ''}, {color: '', 'font-size': ''}])
  })
})
