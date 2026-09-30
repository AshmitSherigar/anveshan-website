# Frontend

The frontend is a React app powered by Vite.

## Run locally

From this folder:

```bash
npm install
npm run dev
```

Useful commands are `npm run build` for a production build and `npm run lint` for ESLint.

## Routing workflow

- Routes are defined in `src/App.jsx` with React Router.
- Shared page structure, navigation, and reusable UI belong in `src/components`.
- Route-level screens belong in `src/pages`.
- Add a page in `src/pages`, import it in `src/App.jsx`, and add a `<Route>` with its URL.
- Use `Link` or `NavLink` for internal navigation instead of regular `<a>` tags.
- Keep the `*` route as the final fallback for unknown URLs.

Example:

```jsx
<Route path="/settings" element={<SettingsPage />} />
```

Keep pages focused on composition. Move UI that is reused across pages into `src/components`.
