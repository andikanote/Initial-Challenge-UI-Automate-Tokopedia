/// <reference types="Cypress" />

import LoginPage from "./Page/LoginPage";

describe("InitialChallenge UI Automate Tokopedia", function (){

    before(function (){
        cy.fixture('credentials').then(function (testData){
            this.testData = testData
        })
    })
    it("Login with valid credentials", function () {
        const login = new LoginPage();
        login.navigate();
        login.enterUsername(this.testData.username);
        login.enterPassword(this.testData.password);
        login.submit()
        cy.url().should('be.equal', this.testData.VerifLinkAfterLogin)
        login.ProductSort()
        
        // Verify the results to match with your query.
        cy.get('#item_5_title_link > .inventory_item_name').should(($p) => {
            expect($p).to.have.length(1)
            expect($p.first()).to.contain('Sauce Labs Fleece Jacket')
        })
        // Verify the details (Product Name & Price)
        cy.get('#item_5_title_link > .inventory_item_name').click()
        cy.get('.inventory_details_name').should(($a) => {
            expect($a).to.have.length(1)
            expect($a.first()).to.contain('Sauce Labs Fleece Jacket')
        })
       
        // Buy Product
        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        
        // Verify and enter the required details on Checkout page.
        login.VerifyPageCheckOut()
        cy.get('[data-test="firstName"]').invoke('attr', 'placeholder').should('contain', 'First Name')
        cy.get('[data-test="lastName"]').invoke('attr', 'placeholder').should('contain', 'Last Name')
        cy.get('[data-test="postalCode"]').invoke('attr', 'placeholder').should('contain', 'Zip/Postal Code')
        
        // Input Information Checkout
        login.InputFirstname(this.testData.firstName);
        login.InputlastName(this.testData.lastName);
        login.InputZipCode(this.testData.ZipCode);
        login.SubmitCheckout()
        
        // Screenshoot Page CHECKOUT: OVERVIEW 
        cy.screenshot('CHECKOUT: OVERVIEW')
        cy.wait(400)
        cy.get('[data-test="finish"]').click()

        // Verify the order status and capture the screen.
        login.VerifyOrderStatus()
        cy.screenshot('ORDER STATUS')
    })
})


