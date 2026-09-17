# grocery-checklist

A grocery list you tick off as you shop. Type an item, add it, check the
box when it is in the cart, watch the count of what is bought, clear the
list when you are done. The list lives in a Pinia store; the components
read it and call its actions.

Vue 3 with `<script setup>`, Pinia, built by Vite, styled with Bootstrap.
One store, three components.

## Screenshots

Coming with the first release.

## How it works

Described with the first release.

## Running it

```bash
npm install
npm run dev
```

`npm run build` writes the static site to `dist/`, which can be served from
any web server.

## Tests

```bash
npm test
```

Fifteen tests, set up the way the [Vue guide](https://vuejs.org/guide/scaling-up/testing.html)
and the [Pinia cookbook](https://pinia.vuejs.org/cookbook/testing.html)
describe: Vitest configured in `vite.config.js` with `globals: true` and a
`happy-dom` environment; the store tested on its own with a fresh
`createPinia()` before each test; the components mounted with Vue Test
Utils on a `createTestingPinia()`, actions stubbed to check they are
called, and one end-to-end test with `stubActions: false`. `npm run
coverage` adds the coverage report, which the workflow hands to
SonarCloud.

## Stack

Vue 3.5 with `<script setup>`, Pinia 4, Vite 8, Bootstrap 5.3. Vitest, Vue
Test Utils, @pinia/testing and happy-dom for the tests.

## Résumé

Une liste d'épicerie que l'on coche à mesure : on tape un article, on
l'ajoute, on coche la case quand il est dans le panier, le compteur
d'articles achetés suit, et un bouton vide la liste. La liste vit dans un
store Pinia (les articles, le nombre d'achetés en propriété calculée, les
actions ajouter, cocher, vider) ; trois composants la lisent et appellent
ses actions : la liste, le formulaire d'ajout, l'article avec sa case.
Quinze tests Vitest, écrits comme le guide Vue et le livre de recettes de
Pinia le montrent.

## Licence

MIT. See [LICENSE](LICENSE).
