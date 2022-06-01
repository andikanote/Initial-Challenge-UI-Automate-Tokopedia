/// <reference types="Cypress" />

class LoginPage {
 
    navigate() {
        cy.visit('https://www.saucedemo.com/')
    }

    enterUsername(username){
        cy.get('[data-test="username"]').clear()
        cy.get('[data-test="username"]').type(username);
        return this
    }

    enterPassword(password){
        cy.get('[data-test="password"]').clear()
        cy.get('[data-test="password"]').type(password);
        return this
    }

    submit(){
        cy.get('[data-test="login-button"]').click()
    }

    ProductSort(){
        cy.get('[data-test="product_sort_container"]').select('Price (high to low)')
    
    }

    // GetFirtProduct(){
    //     cy.get('#item_5_title_link > .inventory_item_name').click()
    // }

    // // Verify the details (Product Name & Price)
    // VerifyNamePriceProduct(){
        
    // }

    VerifyPageCheckOut(){
        cy.get('.title').invoke('text').then((text1) => {
            expect(text1).to.eq('Checkout: Your Information')
        })
    
    }

    InputFirstname(firstName){
        cy.get('[data-test="firstName"]').clear()
        cy.get('[data-test="firstName"]').type(firstName);
        return this
    }
    
    InputlastName(lastName){
        cy.get('[data-test="lastName"]').clear()
        cy.get('[data-test="lastName"]').type(lastName);
        return this
    }

    InputZipCode(ZipCode){
        cy.get('[data-test="postalCode"]').clear()
        cy.get('[data-test="postalCode"]').type(ZipCode);
        return this
    }

    SubmitCheckout(){
        cy.get('[data-test="continue"]').click()
    }
    
    VerifyOrderStatus(){
        cy.get('.title').invoke('text').then((text2) => {
            expect(text2).to.equal('Checkout: Complete!')
        })
    
    }
    
}
export default LoginPage