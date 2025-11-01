# Testing

## Bugs and fixes

| Bug                       | Fix                       | Notes                     |
| :------------------------ | :------------------------ | :------------------------ |
| Runtime Error: `Missing <html> and <body> tags in the root layout.` Accidentally had two App Router roots. | Moved `layout.tsx` into `app/` |  |
| Prisma DB seed command did not run when configured in `prisma.config.ts` [(Seeding warning screenshot)](testing/images/bugs/seeding-warning.png)| Moved command to `package.json` until `prisma.config.ts` becomes more stable. | Current Prisma version has partial/unstable support for seeding via prisma.config.ts. Will migrate when support is fully stable. |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |