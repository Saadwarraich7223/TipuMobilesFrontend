# Premium Redesign Todo List

## Phase 1: Core Components (Current)
- [x] **Redesign Product Card** (`src/components/common/ProductCard/ProductCard.jsx`)
    - Implement `surface-raised` glass effect and `rounded-2xl` corners.
    - Added `Quick Add` slide-up overlay on hover.
    - Simplified price (removed old price, softened text color to `#4f4a43`).
    - Replaced emoji with premium `ArrowRight` Lucide icon.
    - Added smooth image transitions using Framer Motion.
- [ ] **Refine Category Slider** (`src/components/common/CategorySlider/CategorySlider.jsx`)
    - Match tile design with Navbar dropdown.
    - Use soft pastel gradients and glass borders.
- [ ] **Update Section Containers** (Flash Sale, Popular, etc.)
    - Remove solid background colors.
    - Use transparent glass backgrounds and floating layouts.

## Phase 2: Core Pages
- [ ] **Product Details Page** (`src/pages/product/ProductDetailsPage.jsx`)
    - Redesign image gallery with premium transitions.
    - Modernize price display and "Buy Now" section.
    - Implement glassmorphism for specification cards.
- [ ] **Product Listing Page** (`src/pages/product/ProductsListingPage.jsx`)
    - Redesign sidebar filters with a modern "Slide-over" or minimal look.
    - Update pagination controls.

## Phase 3: Checkout & User Flow
- [ ] **Cart Sidebar** (`src/components/layout/CartSidebar/CartSidebar.jsx`)
    - Modernize item cards and checkout summary.
- [ ] **Checkout Page** (`src/pages/checkout/CheckoutPage.jsx`)
    - Clean up form inputs and address cards.
    - Refine payment method selection UI.
- [ ] **User Profile & Orders**
    - Redesign order cards and status badges.

## Phase 4: Final Polish
- [ ] **Footer Redesign** (`src/components/common/Footer/Footer.jsx`)
    - Make it transparent/glass.
    - Update social icons and link typography.
- [ ] **Global Transitions**
    - Ensure smooth page transitions using Framer Motion.
    - Add micro-interactions for buttons and inputs.
