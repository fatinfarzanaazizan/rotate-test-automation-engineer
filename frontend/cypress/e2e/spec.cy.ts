//use randomise index for edit button
const min = Math.ceil(0);
const max = Math.floor(9);
//const index = Math.floor(Math.random() * (max - min + 1)) + min; 
//you can also randomise the item to click with this but will keep static for easy visibility

const index = 9

it('as a user i am able to edit my products', () => {

  //click edit button
  cy.get('.btn.btn-primary').eq(index).click();

  //delete
  cy.get('#product-description').focus().clear();

  //enter new description
  const updatedDescription = '[UPDATED] - new item';
  //enter new text
  cy.get('#product-description').type(updatedDescription);

  //click update button to save
  cy.get('.btn-primary').click();

  //scroll to updated item
  cy.get('.btn.btn-primary').eq(index).scrollIntoView();

  //check if description was updated
  cy.get('div .card-text').eq(index).invoke('text').then((text) => {
    if (text != updatedDescription) {
      assert.fail(text + 'is not the equal to ' + updatedDescription)
    } 
  })
})

it('as a user I am able to place an order', () => {

  //get name of the product
  cy.get('.card-title').eq(index).invoke('text').as('productName')
  cy.get('@productName').then((name) => {
    sessionStorage.setItem('productName', name);
  })
  
  //click order button
  cy.get('.d-flex.flex-wrap > div .btn.btn-success').eq(index).click();

  //enter quantity
  cy.get('#product-quantity').type('1');

  //click create order
  cy.get('.btn-primary').click();

  //get latest order row and check if item order was placed
  cy.get('tbody').find('tr').last().find('td:nth-of-type(3)')
  .invoke('text').then((text) => {
    var getProductName = sessionStorage.getItem('productName');
    if (!getProductName?.includes(text)) {
      assert.fail('ordered product: ' + text + ' is not the same with selected product: ' + getProductName)
    }
  })

})