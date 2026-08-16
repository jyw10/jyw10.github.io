# jyw10.github.io

The source for [jyw10.github.io](https://jyw10.github.io), a lightweight personal blog built with Jekyll and hosted on GitHub Pages.

The starter includes a responsive editorial layout, light and dark themes, an archive, an about page, RSS and sitemap feeds, SEO metadata, and an accessible 404 page.

Human visitors can learn how to subscribe at `/rss/`; feed readers use `/feed.xml` directly.

## Publish a post

1. Create `_posts/YYYY-MM-DD-your-title.md`.
2. Add front matter:

   ```yaml
   ---
   title: "Your post title"
   description: "A one-sentence summary."
   date: 2026-08-16 09:00:00 -0400
   categories: [Notes]
   reading_time: "4 min read"
   ---
   ```

3. Write the post in Markdown and commit it to `main`.

GitHub Pages rebuilds the site after every commit.

## Customize

- Site title and description: `_config.yml`
- Home page introduction: `index.html`
- Biography: `about.md`
- RSS subscription guide: `rss.md`
- Colors and typography: `assets/css/style.css`

## Preview locally

Install Ruby and Bundler, then run:

```bash
bundle install
bundle exec jekyll serve
```

Open <http://localhost:4000>.
