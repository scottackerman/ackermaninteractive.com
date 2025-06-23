# Insmed.com Clinical Trials Site [![Netlify Status](https://api.netlify.com/api/v1/badges/14b889ef-44e0-454a-8ef4-5a537a17bdba/deploy-status)](https://app.netlify.com/projects/insmed-dev/deploys)

---

## Dynamic areas

### Cookie management

You can get or set cookies by importing the useCookies composable:
```javascript
import { getCookie, setCookie } from '~/composables/useCookies'
``` 

#### Retrieve a cookie value by name:

@param {string} name - The name of the cookie to retrieve.
@returns {string | null} - The decoded cookie value if found, otherwise null.

```javascript
const token = getCookie('us-only-consent')
```

#### Set a cookie with optional expiration:

@param {string} name - The name of the cookie.
@param {string} value - The value to store (will be URL-encoded).
@param {number} [days] - Optional number of days until the cookie expires. 

```javascript
setCookie('theme', 'dark', 7) //Expires in 7 days

setCookie('sessionId', 'abc123') //Session only
```

### Structured data

Each page has it's own structured data file here: `/data/{page}.ts`.

### Trial cards

Trial cards can be edited or added to by updating `/data/trials.json`. Just edit, reorder, add, or remove nodes as needed.

---

## Video wall on homepage

For best outcomes, I limited the videos to 5 second loops. Because of the small output size based on limited colors and small pixel dimensions, I landed on a max of 6 different videos for optimal performance and load times.

### Adding or updating videos

If video updates are needed, there is an after effects file (InsmedVideoWall.aep) in the art folder of the [Insmed Google Drive](https://drive.google.com/drive/u/0/folders/1V_MmKUPhEC5JURbca9zQQFkYhGkDf3H8)

The If you import a new video into the top layer of the 'Raw' composition and size it, it will be ready to render with the proper effects on the 'Filtered' composition. You can show or hide layers in Raw so that the one you want to render is visible, and then render out the video(s) separately from the Filtered comp. 

To output the vidoes, I used AEs built in rendering engine (File/Export/Add to render queue). In the renderer, I used H.264 compression with no audio. From there, I used [Cloudconvert]https://cloudconvert.com/mp4-to-webm to convert them to webm for smallest file size.

The videos are located in `/public/videos`.

The code and markup are in `components/global/video-wall.vue`.

---

## Gerneral info:

* `npm run lint:js` for js linting check

* `npm run lint:css` for css linting check

* `npm run lint:css:fix` for auto-fixing fixable css lint issues

* `npm run dev` makes it go..

Dev: https://insmed-dev.netlify.app/ password: insmeddev

Stage: https://insmed-stage.netlify.app/ password: insmedstage

Prod: https://insmed-prod.netlify.app/