---
title: Works
layout: archive
permalink: /works/
entries_layout: grid # posts layout
---

Everything you can imagine

{% include works-tag.html tag= site.tags %}

<!--posts-->
<ul> 
  {% assign posts = site.categories.Works %}
  {% for post in posts %} 
      {% include archive-single.html type=page.entries_layout %} 
  {% endfor %}
</ul>