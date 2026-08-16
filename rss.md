---
layout: default
title: RSS feed
description: "Subscribe to new posts from jyw10 with an RSS reader."
permalink: /rss/
---
<section class="page-intro shell prose-shell">
  <p class="eyebrow">RSS · Really Simple Syndication</p>
  <h1>Follow the writing.</h1>
  <p>Receive every new post without an inbox, an account, or an algorithm deciding what you see.</p>
</section>

<section class="about-grid shell prose-shell">
  <div class="prose">
    <h2>How to subscribe</h2>
    <ol>
      <li>Copy the feed address below.</li>
      <li>Open an RSS app such as Feedly, Inoreader, NetNewsWire, or Reeder.</li>
      <li>Choose <strong>Add feed</strong> or <strong>Follow a site</strong>, then paste the address.</li>
    </ol>
    <pre><code>https://jyw10.github.io/feed.xml</code></pre>
    <a class="button button-primary" href="{{ '/feed.xml' | relative_url }}">View the machine-readable feed</a>
    <h2>Latest posts</h2>
    <ul>
    {% for post in site.posts limit:5 %}
      <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> · {{ post.date | date: "%B %-d, %Y" }}</li>
    {% endfor %}
    </ul>
  </div>

  <aside class="about-note">
    <span class="card-index">Good to know</span>
    <p>The XML file is the actual subscription format. RSS apps read it automatically; this page is the human-friendly guide.</p>
  </aside>
</section>
