# AFYA OS — Concept Preview Site

A polished, Vercel-ready concept website for AFYA OS. The public experience is intentionally product- and user-focused: it shows what AFYA OS is intended to feel like for community health workers, supervisors, county teams, partners and evaluators without publishing implementation details.

## Public-site positioning

- AFYA OS is clearly presented as an early-stage, pre-pilot concept.
- Dashboard activity, county names, households and case examples are visibly labeled as fictional/sample data.
- The site describes user experience and intended outcomes, not implementation architecture.
- The 28-page platform overview is intentionally **not** included in `public/` and cannot be downloaded from the deployed site.
- The short partnership brief remains available as a high-level partnership document.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Push this folder to a Git repository.
2. Import the repository into Vercel.
3. Vercel should detect Next.js automatically.
4. Deploy. No environment variables or backend services are required for this preview.
5. After you receive your permanent URL or custom domain, update `metadataBase` in `app/layout.tsx`.

## Contact used on the site

Frank Denish Omondi  
Founder & Lead Engineer, AFYA OS  
`denishomondi00@gmail.com`
