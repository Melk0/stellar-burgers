describe('Конструктор', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('newOrder');
    cy.intercept('GET', '/api/orders', { fixture: 'order.json' }).as('getOrder');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'mockRefreshToken');
    });
    cy.setCookie('accessToken', 'mockAccessToken');
    cy.visit('/');
    cy.viewport(1920, 1080);

  });



  describe('Тест добавления ингридиентов в конструктор', () => {
    it('Булки', () => {
      cy.contains('Выберите булки').should('exist');
      cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
      cy.get('.constructor-element_pos_top')
        .contains('Краторная булка N-200i')
        .should('exist');
    });

    it('Начинка', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
      cy.get('.constructor-element')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });

    it('Соус', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
      cy.get('.constructor-element').contains('Соус Spicy-X').should('exist');
    });
  });

  describe('Модалки', () => {
    it('Открытие и закрытие', () => {
      cy.get('[data-cy=bun-ingredients] li').first().click();
      cy.get('[id=modals]')
        .contains('Краторная булка N-200i')
        .should('be.visible');
      cy.get('[id=modals]').find('button').click().should('not.exist');
    });

    it('Закрытие при клике на оверлей', () => {
      cy.get('[data-cy=bun-ingredients] li').first().click();
      cy.wait(3000);
      cy.get('[id=modals]')
        .find('div')
        .click({ multiple: true, force: true })
        .should('not.exist');
    });
  });

  it('Order should be created', () => {
    cy.wait('@getUser');
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();

    cy.get('[data-cy=order-btn]').contains('Оформить заказ').click({ force: true });

    cy.wait(3000);

    cy.get('[data-cy=order-btn]').contains('Оформить заказ').click({ force: true });
    cy.get('[data-cy=orderNumber]').should('contain', '123');

    cy.get('[id=modals]')
      .find('div')
      .click({ multiple: true, force: true })
      .should('not.exist');

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});