# AlphaPigs — alphapigs.com

Marketing site for **AlphaPigs**, maker of 4,100 ft³ portable horizontal storage
pigs (silos) for cement, catalyst and dry bulk powders. Buy, lease or rent.

Single-page static site (no build step). Hosted on **GitHub Pages** with the
custom domain **alphapigs.com**.

## Structure

```
index.html      the site (one page: hero, the pigs, calculator, industries,
                who we sell to, specs, quote form)
_ds/            design-system bundle (styles) exported from Claude Design
src/            functional.css + main.js (parallax, calculator, form handling)
logo/           AlphaPigs logo in several formats
uploads/        product photos / renders used on the page
CNAME           custom domain for GitHub Pages (alphapigs.com)
.nojekyll       REQUIRED — tells GitHub Pages to serve the _ds/ folder as-is
                (Jekyll ignores folders starting with "_")
robots.txt      welcomes search engines and AI crawlers
sitemap.xml     single-URL sitemap
llms.txt        plain-text brief for AI assistants (llmstxt.org)
404.html        branded not-found page
```

## Contact form

The quote form (`#quote-form`) posts to **FormSubmit** at
`https://formsubmit.co/ajax/sales@alphapigs.com`. `src/main.js` submits it via
fetch and shows an inline confirmation.

> **Activation (one-time):** FormSubmit only starts forwarding after the target
> inbox confirms it. Create `sales@alphapigs.com` (Google Workspace), submit the
> form once, then open the FormSubmit activation email in that inbox and click the
> link. After that, submissions arrive at sales@alphapigs.com.

To change the destination or provider, edit the `<form action="...">` in
`index.html` (and the hidden `_subject` field).

## Deploying

GitHub Pages serves this repo. To publish: get this content onto the branch Pages
builds from (e.g. `main`), set the Pages custom domain to `alphapigs.com`, and
point DNS at GitHub Pages (see the launch checklist). `.nojekyll` and `CNAME`
must stay at the repo root.

## SEO / AI visibility built in

Unique title + meta description, canonical, Open Graph / Twitter cards, JSON-LD
(Organization + Product), robots.txt (AI crawlers allowed), sitemap.xml and
llms.txt. See `docs/launch-checklist.md` for the off-page steps (DNS, Google
Search Console, Bing, Google Business Profile, analytics).
