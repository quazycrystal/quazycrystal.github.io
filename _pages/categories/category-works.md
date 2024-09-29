---
title: Works
layout: archive
classes: wide
permalink: /works/
entries_layout: grid # posts layout
---

{% include works-tag.html tag= site.tags %}
<!--posts-->
{% assign posts = site.categories.Works %}
{% for post in posts %} 
    {% include archive-single.html type=page.entries_layout %} 
{% endfor %}

