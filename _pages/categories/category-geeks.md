---
title: Geeks
layout: archive
permalink: /geeks/
entries_layout: list # posts layout
---
<body oncontextmenu="return false;">
Mischievous and nebulous thoughts

{% include geeks-tag.html tag= site.tags %}

<!--posts-->
<ul>
{% assign posts = site.categories.Geeks %}
{% for post in posts %} 
    {% include archive-single.html type=page.entries_layout %} 
{% endfor %}
</ul>
<br/>
</body>