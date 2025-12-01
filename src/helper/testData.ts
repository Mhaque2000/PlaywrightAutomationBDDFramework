export const TestData = {
    users: {
        standard: {
            username: 'standard_user',
            password: 'secret_sauce'
        },
        locked: {
            username: 'locked_out_user',
            password: 'secret_sauce'
        },
        invalid: {
            username: 'invalid_user',
            password: 'secret_sauce'
        }
    },
    
    urls: {
        baseUrl: 'https://www.saucedemo.com/v1/',
        loginPage: 'https://www.saucedemo.com/v1/index.html',
        inventoryPage: 'https://www.saucedemo.com/v1/inventory.html',
        cartPage: 'https://www.saucedemo.com/v1/cart.html'
    },
    
    products: {
        backpack: 'Sauce Labs Backpack',
        bikeLight: 'Sauce Labs Bike Light',
        tShirt: 'Sauce Labs Bolt T-Shirt'
    },
    
    errorMessages: {
        invalidCredentials: 'Username and password do not match any user in this service',
        usernameRequired: 'Username is required',
        passwordRequired: 'Password is required',
        lockedUser: 'Sorry, this user has been locked out.'
    }
};