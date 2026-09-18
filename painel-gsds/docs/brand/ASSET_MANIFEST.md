# Brand assets — 6D.3.1 Home pilot

## Lockup

Source received from the user (not reconstructed):

| File                                                 | Role                       | SHA-256                                                            |
| ---------------------------------------------------- | -------------------------- | ------------------------------------------------------------------ |
| `docs/brand/source/eretz-einstein-lockup-source.pdf` | supplied PDF master        | `713fcc889946f36bd6b58cc262656fc9fea6632a4317e49c7ee56b5cbf345922` |
| `public/brand/eretz-einstein-lockup.svg`             | web derivative for `<img>` | `75002e60572743ba2c6a408e2d8cb5c4eee3a539abcb7d348245b90f59188443` |

Derivation (already performed before this iteration): `pdftocairo -svg`, then Inkscape `--export-area-drawing` to crop the artboard to drawing bounds. No reconstruction, recolor, path edit, rotation, or internal composition change.

Status:

```text
ASSET_RECEIVED_FOR_PROJECT
PROTOTYPE_USE_APPROVED_BY_USER
FORMAL_INSTITUTIONAL_AUTHORIZATION_PENDING
```

Atomicity rule: treat the lockup as a single image. Do not separate Eretz and Einstein, recreate the divider, recolor, alter paths, change internal proportions or typography, or invent an alternative lockup.

## Work Sans

Self-hosted latin variable WOFF2. No Google Fonts/CDN at runtime.

| Item          | Value                                                                           |
| ------------- | ------------------------------------------------------------------------------- |
| File          | `public/fonts/work-sans-latin-variable.woff2`                                   |
| License       | `public/fonts/licenses/work-sans-OFL.txt` (SIL OFL 1.1)                         |
| Family        | Work Sans                                                                       |
| Axis          | `font-weight` 100 900, `font-style` normal                                      |
| Retrieved     | 2026-09-17                                                                      |
| CSS API       | `https://fonts.googleapis.com/css2?family=Work+Sans:wght@100..900&display=swap` |
| WOFF2 URL     | `https://fonts.gstatic.com/s/worksans/v24/QGYsz_wNahGAdqQ43Rh_fKDp.woff2`       |
| WOFF2 SHA-256 | `1dd49afc07fb2231b2ff686cbf007725fb2742271bb1f28ebd98f22a0d817343`              |
| OFL source    | `https://raw.githubusercontent.com/google/fonts/main/ofl/worksans/OFL.txt`      |
| OFL SHA-256   | `749aca05078664ce682dce1b1b10096ac397cb088c1a6df4e1bb56f0092a9272`              |

Montserrat is a stack fallback only and was not installed.

## Favicon (product utility)

| File                           | Role               |
| ------------------------------ | ------------------ |
| `public/brand/gsd-favicon.svg` | Home pilot favicon |

```text
PRODUCT_UTILITY_ICON
NOT_INSTITUTIONAL_LOGO
```

Geometry is a simplified glycogen branch derived conceptually from `GlycogenBranchVisual`. It does not use the Einstein star, Eretz mark, lockup, or text.

Legacy `public/favicon.svg` remains the default for non-Home pages.

## Open Graph

Home continues to use the existing `favicon.svg` OG image. A dedicated institutional OG asset was not produced in 6D.3.1.

```text
PENDING_OG_ASSET
```
