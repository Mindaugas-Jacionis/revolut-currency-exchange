__Note: Revolut website has redux dev tools on, should put them under dev mode only__

### ToDo:

- [x] Reverse exchange: add reverse param with default value false to convert util
- [x] Add user module with wallets object({ currencyCode: howMuchInWallet }) with initial {eur: 5000, usd: 3000, gbp: 7000}
- [x] Add user wallets actions: remove, add
- [x] Add currency code to symbol mapper
- [x] Add Theme via styled-components to unify colors
- [x] Implement exchange functionality
- [x] Prevent Exchange when balance invalid(disable button)
- [x] ~~Media query at 444px for input~~ Fix responsiveness 

### Nice to have:

- [x] utils toPositive/toNegative to convert values to one or another + tests
- [x] round util to have 2 digits after dot + tests
- [x] Flip base with exchange currency
- [ ] Add redux persist to persist user wallets(maybe)
- [ ] Decent 404 page
