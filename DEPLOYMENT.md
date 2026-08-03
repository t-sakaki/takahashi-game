# Deployment Instructions

## GitHub Pages

1. Push this repository to GitHub.
2. Go to the repository settings → Pages.
3. Under "Source", select the branch (e.g., `main` or `master`) and the folder `/ (root)`.
4. Click Save. Your site will be published at `https://<username>.github.io/<repository>/`.

## Alternative: itch.io

1. Create an account at https://itch.io.
2. Create a new project.
3. Zip the entire project folder (including `index.html`, `css/`, `js/`, etc.).
4. Upload the zip as a new build.
5. Set the game to be playable in the browser.

## Local Testing

To test locally, you can run a simple HTTP server:

```bash
# Python 3
python3 -m http.server 8000

# Or using Node.js
npx serve
```

Then open `http://localhost:8000` in your browser.