---
title: Geeks
layout: archive
permalink: /geeks/
entries_layout: list # posts layout
---
Mischievous and nebulous thoughts

{% include geeks-tag.html tag= site.tags %}

<!--posts-->
{% assign posts = site.categories.Geeks %}
{% for post in posts %} 
    {% include archive-single.html type=page.entries_layout %} 
{% endfor %}

<br/>