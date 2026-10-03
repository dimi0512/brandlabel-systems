# GA4 activation and privacy-policy changes

Law checked as of: 30 September 2026. Draft for review, not a published policy.

## Current position

### Setup update — 3 October 2026

Legal-notice implementation update (same date; law checked as of 3 October 2026):

- The owner confirmed sole-trader status and the controller name Kizidou Dimitra. At the owner's express request, the address remains Rue de la Marjolaine, 1120 Bruxelles, Belgium, without a building number. Do not request the number again or invent it; the incomplete address remains a disclosed compliance limitation, not a finding of compliance.
- Replaced the generic privacy page with 11 numbered sections in English, French and Dutch. The controller name appears once per language, only in the identification section. Removed fictitious account/newsletter/affiliate scenarios, corrected diagnostic session-storage and email handling, and added the configured consent/analytics settings, named providers, retention qualifications and rights/complaint information.
- Updated the visible notice date and consent version to 2026-10-03. Previously stored consent must be requested again after release. No production deployment has been authorised or performed as part of this edit.
- Content checks passed in all three languages (section order, identity once, address and analytics disclosures), and a consent-helper check confirmed that the earlier notice version no longer grants consent. Full lint/build/browser checks remain separate release checks.
- Provider-contract details, actual Google cookie scope/expiry, mailbox forwarding or additional business tools, and implementation of the stated retention practice still require verification. This edit does not certify overall GDPR compliance or an exhaustive business-wide data inventory.
- Official sources checked: https://www.autoriteprotectiondonnees.be/professionnel/themes/internet/cookies ; https://www.autoriteprotectiondonnees.be/professionnel/rgpd-/droits-des-citoyens/droit-a-l-information ; https://support.google.com/analytics/answer/7667196?hl=en ; https://vercel.com/docs/analytics/privacy-policy ; https://policies.google.com/privacy/frameworks?hl=en .

- User supplied Measurement ID `G-NL0WL6TWL0`; verified in the BrandLabel Agency property `557180153`, web stream `15992820391`, named BrandLabel Website, for `https://brandlabelagency.com`.
- Added the ID to gitignored `.env.local` for local verification only. No Vercel production environment change or deployment was made.
- Saved enhanced measurement with page views only, including browser-history page changes; scrolls, outbound clicks, site search, form interactions, video engagement and downloads are off.
- Saved user and event retention at two months, with reset on new user activity off. Google reports changes take effect after 24 hours; this does not limit most aggregated reports.
- Verified Google signals and user-provided data collection are not enabled. Disabled ads personalisation across all 307 regions. Account-wide sharing and product links have not yet been fully audited; the account also contains other properties, so avoid changing shared settings without reviewing their scope.
- Email redaction was already enabled. Saved 11 query-parameter redaction keys: `email`, `name`, `first_name`, `last_name`, `firstname`, `lastname`, `phone`, `telephone`, `message`, `company`, `address`. This is a supplementary safeguard, not a guarantee that all personal information is removed. Campaign UTM keys were not removed.
- Consent-helper checks passed for acceptance, refusal, legacy/invalid/expired/future choices, blocked storage, withdrawal flag and GA cookie deletion targeting. `git diff --check` passed. ESLint and local Next.js startup stalled without output and were interrupted; full browser/network checks and actual receipt of events remain unverified.
- A transient Google “Missing permissions” message disappeared after refreshing; stream access then worked and the redaction configuration saved successfully.
- The updated privacy notice has not been published. Confirm the registered controller and complete business address, finish provider/retention facts, and complete browser checks before requesting production deployment approval.

### Earlier preparation

The repository already contained a conditional GA4 script using `NEXT_PUBLIC_GA_ID`, but no real ID in `.env.example`. Vercel Analytics was loaded without consulting the banner, despite the policy saying analytics only runs with consent. Production settings and the Google account have not been inspected.

Local changes gate both analytics tools behind a new, versioned choice, reject legacy consent, give accept/decline equal styling, and translate the banner into English, French and Dutch. The choice is valid for 180 days and checked when the component mounts. GA cookies are configured for 180 days without renewal on each visit. The footer control disables GA, deletes accessible `_ga` / `_ga_*` cookies and reloads to stop loaded scripts. Other open tabs react to withdrawal through the storage event. Browser restrictions on storage do not grant consent automatically.

These are implementation preparations. Do not activate until the policy and account settings below are complete and browser network checks pass.

## Applicable law and recommendation

This is a Belgian federal and EU data-protection matter; the Belgian APD/GBA is the relevant supervisory authority. No regional or municipal rule changes this website-cookie analysis. The assumption is ordinary audience measurement for this Belgian business, without advertising profiling.

Article 10/2 of the Belgian Law of 30 July 2018 requires clear information and prior consent for storing/accessing terminal information, except strictly necessary operations. It was inserted by Article 256 of the Law of 21 December 2021, effective 10 January 2022. The current consolidated amendment list does not show a later amendment to Article 10/2. [JUSTEL consolidated law and amendment history](https://www.ejustice.just.fgov.be/cgi_loi/change_lg.pl?language=fr&la=F&cn=2018073046&table_name=loi). The linked Moniteur issue of 31 December 2021 exceeded the research tool's size limit; its full text was not independently inspected.

The APD specifically says audience-measurement cookies need consent in Belgium. Its guidance calls for accessible refusal, effective withdrawal and purpose-specific information; it considers six months generally reasonable for remembering a choice. That period is guidance, not a universal statutory maximum for every cookie. [APD cookie guidance](https://www.autoriteprotectiondonnees.be/professionnel/themes/internet/cookies).

GDPR Articles 6(1)(a), 7 and 13 govern the consent basis, withdrawal and information notice; Articles 28 and 44–49 govern processor arrangements and international transfers. [GDPR, official text](https://eur-lex.europa.eu/eli/reg/2016/679). CJEU, Case C-673/17, Planet49, ECLI:EU:C:2019:801, confirms active consent and disclosure of cookie duration and third-party access. [Court's official summary](https://curia.europa.eu/site/upload/docs/application/pdf/2019-10/cp190125en.pdf).

Use basic consent mode: Google receives no analytics requests before acceptance. Advanced mode can send cookieless pings even after refusal; it adds analysis this small campaign does not need. A Google product mode is not itself a legal compliance guarantee. [Google's distinction](https://support.google.com/analytics/answer/10000067?hl=en).

## Account settings to complete before activation

1. Create or identify the business-owned GA4 property and website stream. Supply its `G-…` Measurement ID; never provide a Google password. Add the ID to `NEXT_PUBLIC_GA_ID` in the deployment environment only when ready to publish.
2. Confirm the contracting Google entity and accept the applicable processing terms. Record the entity in the final notice; do not guess from a generic Google privacy page. [Google processing terms](https://business.safety.google/adsprocessorterms/).
3. Proposed minimum: two months of user/event retention, reset on new activity off. This setting does not limit all aggregated reports; document a separate aggregate-report review/deletion practice. [Google retention documentation](https://support.google.com/analytics/answer/7667196?hl=en).
4. Keep advertising consent denied, Google Ads linking and user-provided data collection off. Review data-sharing options and turn off unnecessary sharing. The code denies `ad_storage`, `ad_user_data` and `ad_personalization`. Google's June 2026 changes mean the Google Signals switch alone is not a substitute for advertising consent controls. [Google's updated controls](https://support.google.com/analytics/answer/17016975?hl=en).
5. Keep enhanced measurement limited to page views initially, including history changes for Next.js navigation. Disable form interactions, site search and other unnecessary automatic events. Enable email/query-parameter redaction and verify payloads. Never put names, emails or diagnostic answers in URLs, event labels or UTM values.
6. Verify `_ga` and `_ga_<stream suffix>` cookie names, domain, path and actual expiry in the browser. Code requests a maximum 180-day lifetime without sliding renewal. [Google cookie configuration](https://developers.google.com/tag-platform/security/guides/customize-cookies).
7. Check Google's applicable international-transfer arrangements and current certification. The Commission's adequacy decision covers participating US organisations, not every US recipient. Google states Google LLC is certified. Do not describe GA4 as EU-only or anonymous. [Commission adequacy list](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en), [Google transfer frameworks](https://policies.google.com/privacy/frameworks?hl=en).

## Exact privacy-policy edits

Replace the current generic cookies, analytics and analytics-retention wording with a specific section. Publish equivalent English, French and Dutch versions. Complete bracketed facts before publication; this is not ready to paste unchanged.

> **Website analytics and your choice**
>
> With your consent, BrandLabel Agency uses Google Analytics 4, provided under our agreement with [confirmed Google contracting entity], to understand website use and the performance of campaigns, including radio campaigns. Analytics may process online identifiers, pages visited, visit times, referral and campaign information, approximate location and device/browser information. This processing relies on your consent under Article 6(1)(a) GDPR. We do not use this setup for personalised advertising.
>
> Google Analytics loads only after you choose “Accept analytics”. You may refuse without losing access to the website. Use “Cookie settings” in the footer to withdraw consent and reopen your choices. Withdrawal stops future analytics collection; it does not undo processing lawfully performed before withdrawal. You may contact contact@brandlabelagency.com about your data rights.
>
> The `_ga` cookie distinguishes browsers; `_ga_[stream suffix]` maintains session information. Both are first-party analytics cookies, configured for up to 180 days, with path `/` and domain [verified cookie domain]. Our consent preference, `brandlabel_cookie_consent`, is stored locally in your browser with the choice, timestamp and policy version; its validity expires after 180 days and is checked on subsequent visits. You can also remove stored information through your browser settings.
>
> User/event data in GA4 is retained for [confirmed period]. Aggregated reports follow [confirmed review/deletion practice]; the user/event retention setting does not automatically delete all aggregated reports. Google may process data outside the EEA, including in the US, under [verified applicable transfer mechanism]. Information about these safeguards is available at https://policies.google.com/privacy/frameworks and from us on request.

Also do the following in the existing policy:

- Name Vercel Analytics separately if retained, and document its actual data, purpose, retention and transfer arrangements. Hosting/security logs are a separate activity from optional analytics. Do not equate cookieless with automatically exempt.
- Confirm the controller's full legal name and contact address behind the BrandLabel Agency trading name and VAT number.
- Add the right to complain to the Belgian APD/GBA, linked to https://www.autoriteprotectiondonnees.be. Keep the existing privacy contact.
- Replace the paragraph telling people not to use the website if they disagree with the policy. Suggested replacement: “This notice explains how we process personal data. Reading this notice or continuing to browse does not constitute consent to optional analytics. We will request a new choice when changes require it.”
- Review the overly broad rights carve-outs concerning backups and previous third-party disclosures; they should not suggest that statutory erasure or notification duties automatically cease in those situations.
- Date and version the final policy and archive earlier policy/banner versions to support accountability. [APD checklist](https://www.autoriteprotectiondonnees.be/publications/checklist-cookies.pdf).

## Activation checks

Use an isolated browser session and test initial visit, refusal, acceptance, withdrawal, reload, navigation, expired/legacy preferences and blocked storage. Before consent and after refusal/reload, expect no Google or Vercel analytics requests. After acceptance, verify one page view per navigation and no personal form data. Inspect cookie expiry and cross-tab withdrawal. Confirm the radio UTM campaign in GA4 Realtime using a consenting visit; people who decline will not be counted by this setup. Actual GA4 collection remains unverified until a real property is connected.

MOST FAVOURABLE LAWFUL OPTION

1. Complete the property, controller and provider facts.
2. Finalise the three-language notice and matching minimal account settings.
3. Connect the Measurement ID, test consent and data delivery, then publish together with the updated policy after deployment authorisation.
