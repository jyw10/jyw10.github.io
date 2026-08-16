<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  exclude-result-prefixes="atom">
  <xsl:output method="html" encoding="UTF-8" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f3eee5" />
        <title><xsl:value-of select="rss/channel/title" /> · RSS feed</title>
        <style>
          :root { color-scheme: light; --canvas:#f3eee5; --surface:#fffaf1; --ink:#17211c; --muted:#657069; --line:#d9d1c4; --accent:#e95328; --soft:#d8e9d7; }
          * { box-sizing: border-box; }
          body { margin:0; background:var(--canvas); color:var(--ink); font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; line-height:1.65; -webkit-font-smoothing:antialiased; }
          a { color:inherit; text-decoration-color:var(--accent); text-underline-offset:.2em; }
          a:hover { color:#b93615; }
          .shell { width:min(820px,calc(100% - 38px)); margin-inline:auto; }
          header { border-bottom:1px solid var(--line); }
          nav { min-height:82px; display:flex; align-items:center; justify-content:space-between; gap:24px; }
          .brand { display:inline-flex; align-items:center; gap:11px; color:var(--ink); font-weight:800; letter-spacing:-.03em; text-decoration:none; }
          .mark { width:34px; height:34px; display:grid; place-items:center; border-radius:10px; background:var(--accent); color:#fffaf1; font:italic 25px/1 Georgia,serif; }
          .home { color:var(--muted); font-size:.75rem; font-weight:800; letter-spacing:.08em; text-decoration:none; text-transform:uppercase; }
          main { padding:86px 0 110px; }
          .eyebrow { margin:0 0 18px; color:#b93615; font-size:.72rem; font-weight:850; letter-spacing:.15em; text-transform:uppercase; }
          h1 { margin:0; font:500 clamp(3.2rem,9vw,6.5rem)/.95 Georgia,"Times New Roman",serif; letter-spacing:-.06em; }
          .intro { max-width:680px; margin:28px 0 0; color:var(--muted); font:1.25rem/1.55 Georgia,"Times New Roman",serif; }
          .subscribe { margin:46px 0 68px; padding:28px 30px; display:grid; grid-template-columns:1fr auto; align-items:center; gap:28px; background:var(--soft); border-radius:2px 34px 2px 2px; }
          .subscribe strong { display:block; margin-bottom:4px; font-family:Georgia,"Times New Roman",serif; font-size:1.3rem; }
          .subscribe p { margin:0; color:var(--muted); font-size:.93rem; }
          .feed-url { padding:10px 14px; background:var(--surface); border:1px solid var(--line); border-radius:8px; font:700 .78rem ui-monospace,SFMono-Regular,Consolas,monospace; white-space:nowrap; }
          .section-title { margin:0 0 16px; font:500 2.1rem/1.1 Georgia,"Times New Roman",serif; letter-spacing:-.035em; }
          .posts { border-top:1px solid var(--line); }
          article { padding:30px 0 32px; border-bottom:1px solid var(--line); }
          time { color:var(--muted); font-size:.7rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
          h2 { margin:10px 0 8px; font:500 1.75rem/1.16 Georgia,"Times New Roman",serif; letter-spacing:-.03em; }
          h2 a { text-decoration:none; }
          article p { margin:0; color:var(--muted); }
          footer { padding:30px 0; border-top:1px solid var(--line); color:var(--muted); font-size:.8rem; }
          @media (max-width:620px) { main{padding-top:62px} .subscribe{grid-template-columns:1fr} .feed-url{overflow-wrap:anywhere;white-space:normal} }
        </style>
      </head>
      <body>
        <header>
          <nav class="shell">
            <a class="brand" href="/">
              <span class="mark">j</span>
              <span><xsl:value-of select="rss/channel/title" /></span>
            </a>
            <a class="home" href="/">← Back to the blog</a>
          </nav>
        </header>

        <main class="shell">
          <p class="eyebrow">RSS · Really Simple Syndication</p>
          <h1>Follow the writing.</h1>
          <p class="intro">This feed lets you receive new posts without an inbox or an algorithm. Add its address to any RSS reader and new writing will appear there automatically.</p>

          <section class="subscribe" aria-label="How to subscribe">
            <div>
              <strong>Copy this feed into your reader</strong>
              <p>Feedly, Inoreader, NetNewsWire, Reeder, and other RSS apps all work.</p>
            </div>
            <code class="feed-url">https://jyw10.github.io/feed.xml</code>
          </section>

          <h2 class="section-title">Latest posts</h2>
          <div class="posts">
            <xsl:for-each select="rss/channel/item">
              <article>
                <time><xsl:value-of select="substring(pubDate, 6, 11)" /></time>
                <h2>
                  <a>
                    <xsl:attribute name="href"><xsl:value-of select="link" /></xsl:attribute>
                    <xsl:value-of select="title" />
                  </a>
                </h2>
                <p><xsl:value-of select="description" /></p>
              </article>
            </xsl:for-each>
          </div>
        </main>

        <footer>
          <div class="shell">A machine-readable feed with a human-friendly view.</div>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
