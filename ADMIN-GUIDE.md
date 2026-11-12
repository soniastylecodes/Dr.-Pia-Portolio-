# PIA Website Admin Guide

## Signing in
1. Open `https://soniastylecodes.github.io/Dr.-Pia-Portolio-/admin/`
2. Click **Sign In with Token** and paste a GitHub fine-grained token for this repository with **Contents: Read and write** permission.
3. The token stays saved in that browser, so you only do this once per device.

## What you can edit
| Section | Where |
|---|---|
| News & press releases (each gets its own Google-friendly page) | News & Press Releases |
| Awards and honours | Awards & Honours |
| Publications | Publications |
| Hero photo, bio, highlights, focus areas, menu photos | Website Pages → Homepage |
| Gallery photos and captions | Website Pages → Gallery |
| Social media links, Google title and description, share image, email | Website Pages → Site Settings, SEO & Social Links |

After you click **Save**, the site rebuilds itself. Changes go live in about two minutes.

## Good habits for ranking
- Put her full name, **Dr. Patience Ishaku Abbo**, in news headlines and photo descriptions where it reads naturally.
- Always fill in **Short Summary** and **Photo Description** on news stories.
- Publish news regularly. Every story is a new page Google can find.
- Uploaded photos are converted to WebP and resized automatically.

## When the custom domain is connected
1. In Site Settings, change **Website Address** to the new domain, for example `https://patienceishakuabbo.com`.
2. In `public/admin/config.yml`, update `site_url` and `display_url` to match.
3. Add a `public/CNAME` file containing the domain.
