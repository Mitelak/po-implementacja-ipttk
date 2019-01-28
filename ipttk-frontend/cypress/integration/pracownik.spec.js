/* eslint-disable no-undef */
/// <reference types="Cypress" />

Cypress.on('window:before:load', (win) => { win.fetch = null })

describe('Panel pracownika', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/#/login', {
      onBeforeLoad: (win) => {
        win.fetch = null
      }
    })
    cy.server()
    cy.route({
      method: 'POST',
      url: '/api/v1/user/login',
      headers: {
        'Content-type': 'application/json'
      },
      body: 'fixture:pracownik/login'
    }).as('loginPost')

    cy.get('input[name=email]').type('pracownik@test.com')
    cy.get('input[name=password]').type('test')
    cy.get('button').contains('Zaloguj').click()

    cy.wait('@loginPost')
    cy.get('@loginPost').then((xhr) => {
      expect(xhr.requestBody).to.have.property('email', 'pracownik@test.com')
      expect(xhr.requestBody).to.have.property('password', 'test')
    })
  })

  it('Can\'t add point because bad coordinates', () => {
    cy.server()
    cy.route('POST', '/api/v1/points').as('pointPost')

    cy.get('a[href="#/add-point"]').click()
    cy.url().should('include', '/add-point')

    cy.get('input[name=name]').type('Punkt testowy')
    cy.get('input[name=coordinates]').type('51.498134-0.201755')
    cy.get('textarea[name=description]').type('Testowy opis tego punktu')
    cy.get('input[name=date]').type('2019-01-30')

    cy.get('form > button').click()
    cy.wait('@pointPost')

    cy.get('p.form-error').should('be.visible').contains('Invalid coordinates format')
  })

  it('Can\'t add point because no name provided', () => {
    cy.server()
    cy.route('POST', '/api/v1/points').as('pointPost')

    cy.get('a[href="#/add-point"]').click()
    cy.url().should('include', '/add-point')

    cy.get('input[name=coordinates]').type('51.498134, -0.201755')
    cy.get('textarea[name=description]').type('Testowy opis tego punktu')
    cy.get('input[name=date]').type('2019-01-30')

    cy.get('form > button').click()
    cy.wait('@pointPost')

    cy.get('p.form-error').should('be.visible').contains('Name field is required')
  })

  it('Can\'t add point because no date provided', () => {
    cy.get('a[href="#/add-point"]').click()

    cy.get('input[name=name]').type('Punkt testowy')
    cy.get('input[name=coordinates]').type('51.498134, -0.201755')
    cy.get('textarea[name=description]').type('Testowy opis tego punktu')
    cy.get('input[name=date]').clear()

    cy.get('form > button').click()

    cy.get('p.form-error').should('be.visible').contains('Podaj date')
  })

  it('Can add point', () => {
    cy.server()
    cy.route('POST', '/api/v1/points').as('pointPost')

    cy.get('a[href="#/add-point"]').click()
    cy.url().should('include', '/add-point')

    cy.get('input[name=name]').type('Punkt testowy')
    cy.get('input[name=coordinates]').type('51.498134, -0.201755')
    cy.get('textarea[name=description]').type('Testowy opis tego punktu')
    cy.get('input[name=date]').type('2019-01-30')

    cy.get('form > button').click()
    cy.wait('@pointPost')

    cy.get('p.form-success').should('be.visible')
  })
})
