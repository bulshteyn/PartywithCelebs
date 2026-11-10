# Monetization operations — Party With Celebs

## Current status
- No affiliate partner is approved in the system. `assets/partners.json` has an empty `partners` array.
- `go.html` accepts only an exact approved ID from that file with `active: true`. It does not redirect unknown IDs or accept arbitrary URLs.
- All current official event links are **editorial outbound links**, not commission links.
- The sponsored-placement blocks say **Advertising space available** and are not presented as paid ads.
- VIP table links are mailto inquiries, not a booking checkout or availability system.

## Onboarding an approved affiliate
1. Get the authorized partner's written agreement and exact HTTPS tracking URL. Confirm commission basis, attribution window, chargebacks, reporting, payment schedule, and whether direct linking or redirects are permitted.
2. Add an entry to `assets/partners.json`:
   `{"id":"unique-id","name":"Approved Provider","url":"https://partner.example/approved-tracking-url","active":true}`
3. Add a visible booking link to the relevant page using `/go.html?partner=unique-id&placement=vegas_calendar` and a nearby disclosure such as “We may earn a commission if you book through this link.”
4. Do not replace official venue links with unapproved affiliate links. Keep the editorial option when appropriate.
5. Test the destination and the booking conversion report. The affiliate partner, not GA4, is the source of truth for commissions.
6. For a paused or terminated partnership, set `active:false`; the redirect page will show an unavailable message.

## Analytics
`assets/monetization.js` emits:
- `outbound_booking_click` with placement, domain, venue, event name, and link type
- `vip_inquiry_click` with placement and city
`go.html` emits `affiliate_redirect_ready` and `affiliate_redirect_click` with partner ID and placement.

Events require GA4 to load and user browser tracking to permit measurement. A click is not a purchase. Current tracking is client-side and can be blocked. Never publish estimated commission revenue as confirmed revenue.

## Sponsored placement
Replace an **Advertising space available** block with a real sponsor creative only after agreeing terms. Label the creative “Sponsored” or “Advertisement” prominently, and use `rel="sponsored noopener noreferrer"` on sponsor outbound links. Avoid implying endorsement or celebrity affiliation.

## Next technical steps before scale
- Add consent management and review privacy/cookie requirements by geography.
- Add server-side attribution or signed partner postbacks if supported, plus reconciled conversion/payment reporting.
- Replace mailto lead capture with an authenticated, spam-protected form and documented data retention once inquiry volume justifies it.
- Establish ad inventory, contracts, sponsorship rates and a booking/CRM workflow.
