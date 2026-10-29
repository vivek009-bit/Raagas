RAGA ATLAS — installable web app

Files:
  index.html            the app
  manifest.webmanifest  name, icons and colours for the home-screen app
  sw.js                 lets the app open offline after the first visit
  icons/                home-screen and browser icons

To put it on your phone it must be served from an https address. Free ways:

1) Netlify Drop (easiest)
   - On a computer, go to https://app.netlify.com/drop and sign in (free).
   - Drag this whole "raga-atlas-app" folder onto the page.
   - You get an address like https://something.netlify.app (you can rename it in Site settings).

2) GitHub Pages
   - Create a public repository, upload the contents of this folder (index.html at the top level).
   - Settings > Pages > Deploy from branch > main / root. The address appears after a minute.

Then on the phone:
   iPhone/iPad: open the address in Safari > Share > Add to Home Screen.
   Android: open it in Chrome > the "Install app" button in the page, or menu > Install app.

Updating later: replace index.html, and change VERSION in sw.js (e.g. raga-atlas-v2) so phones pick up the new copy.
