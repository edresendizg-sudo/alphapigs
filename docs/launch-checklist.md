# AlphaPigs — Launch checklist

Everything needed to take **alphapigs.com** live and retire gallegossales.com.
The site code is ready in this repo; the steps below are the ones that happen
outside the code (DNS, Google, email).

## 0) Deploy the code
- [ ] Get this repo's content onto the branch GitHub Pages builds from (`main`).
- [ ] Repo **Settings → Pages**: set **Custom domain = `alphapigs.com`**, then tick
      **Enforce HTTPS** (after the cert is issued, a few minutes later).
- [ ] Confirm `CNAME` (alphapigs.com) and `.nojekyll` are at the repo root. Without
      `.nojekyll` the `_ds/` styles won't load (Jekyll ignores `_` folders).

## 1) DNS for alphapigs.com → GitHub Pages
At your domain registrar's DNS for alphapigs.com:
- [ ] **Apex (`@`)** — four **A** records to GitHub Pages:
      `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- [ ] (Recommended) **AAAA** records: `2606:50c0:8000::153`, `2606:50c0:8001::153`,
      `2606:50c0:8002::153`, `2606:50c0:8003::153`
- [ ] **`www`** — a **CNAME** to `edresendizg-sudo.github.io`
- [ ] Wait for propagation (minutes–hours), then verify https://alphapigs.com loads.

## 2) Email + quote form (sales@alphapigs.com)
- [ ] Create **sales@alphapigs.com** in Google Workspace.
- [ ] Open https://alphapigs.com, submit the quote form once (a real test).
- [ ] In the sales@alphapigs.com inbox, open the **FormSubmit activation email**
      and click the link. Until you do this, FormSubmit does NOT forward anything.
- [ ] Submit again to confirm it now arrives. (Add FormSubmit's sender to contacts
      so Gmail keeps it in the inbox.)

## 3) Take down gallegossales.com
- [ ] This repo now serves alphapigs.com, so it no longer claims gallegossales.com.
- [ ] At the GoDaddy DNS for **gallegossales.com**, remove the GitHub Pages records
      (or point it elsewhere). Optionally set a redirect to alphapigs.com if you want
      old links to land somewhere.

## 4) Google
- [ ] **Search Console** (https://search.google.com/search-console): add `alphapigs.com`
      (Domain property, verify via a DNS TXT record), then submit
      `https://alphapigs.com/sitemap.xml` and request indexing of the home page.
- [ ] **Bing Webmaster Tools** (https://www.bing.com/webmasters): add the site (you can
      import from Search Console), submit the sitemap. *(Bing powers ChatGPT search.)*
- [ ] **Google Business Profile** — only if AlphaPigs has a physical address/yard;
      create the listing with the address, phone and website.
- [ ] (Optional) **Google Analytics 4** — create a property and send me the
      Measurement ID (`G-XXXXXXXX`); I'll add the tag to `index.html`.

## 5) AI assistant visibility (already built in)
- `robots.txt` welcomes GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot,
  CCBot, etc.; `llms.txt` summarizes the business; JSON-LD describes the Organization
  and the AP-4100 product. Nothing to do here — it strengthens over time as the site
  gets indexed and linked.

## 6) Content to finalize
- [ ] **Phone number** — the quote section shows a placeholder `[(000) 000-0000]`.
      Send me the real number and I'll set it (and add `tel:` + schema).
- [ ] Confirm the hero/product photos are the final ones you want public.
