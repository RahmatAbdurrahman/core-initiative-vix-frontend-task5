# Product Showcase

Core Initiative VIX Front End Task 5: a single-product e-commerce interface built with **Vue 3** and **Vite**.

It shows one product from the [Fake Store API](https://fakestoreapi.com) at a time. The **Next product** button inside the card loads the next product id (1 → 20, then back to 1).

## Behaviour

Data comes from `GET https://fakestoreapi.com/products/{id}`. The page starts at id 1 and the product's `category` decides what is rendered:

| Category            | UI                                                       |
| ------------------- | -------------------------------------------------------- |
| `men's clothing`    | Blue product card                                        |
| `women's clothing`  | Purple product card                                      |
| anything else       | "This product is unavailable to show" card (sad face)    |

- **Next product** requests the next id; after 20 it wraps to 1. Only one product is shown at a time.
- **Position indicator:** a small `Product 7 of 20` label with twenty tiny dots sits below the card, in every state. It is only context, not a control: it tells the user that an unavailable product is one item in the list and not the end of it.
- **Loading:** a skeleton of the card is shown immediately and replaced when the response arrives (or fails).
- **Errors:** if the request fails, a small error card offers **Try again** and **Next product**.
- **Rating** is drawn as five dots from `rating.rate`; **price** is formatted as USD.

## Layout

The card follows the supplied Figma design screenshots (colour palette, men's, women's and unavailable states). Its width is 81% of the viewport, as in the design, capped at 720px, and everything inside it is sized in `em` (1em = 10px of the 540px design), so the proportions hold as it scales. The two-column layout (image | details) is kept down to 640px wide, which includes the 667px reference frame. Below that the card stacks vertically.

## Installation

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Structure

```
src/
├── api/products.js            fetchProduct(id): GET /products/{id} with error handling
├── utils/product.js           next index (20 -> 1), category -> theme, price formatting
├── assets/main.css            colour tokens, themes, shared card and button styles
└── components/
    ├── ProductDisplay.vue     state (product, currentIndex, loading, error) and fetching
    ├── ProductCard.vue        men's / women's card (theme via CSS variables)
    ├── ProductRating.vue      five-dot rating
    ├── ProductProgress.vue    "Product 7 of 20" label and dots (display only)
    ├── ProductSkeleton.vue    loading state
    ├── UnavailableProduct.vue unavailable state
    ├── ProductError.vue       request-failed state
    └── BackgroundPattern.vue  faint decorative shapes behind the card
```
