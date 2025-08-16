---
title: Art
layout: archive
permalink: /art/
entries_layout: grid # posts layout
---
<body oncontextmenu="return false;">
Mischievous and nebulous creations

{% include works-tag.html tag= site.tags %}

<!--posts-->
<ul>
{% assign posts = site.categories.Art %}
{% for post in posts %} 
    {% include archive-single.html type=page.entries_layout %} 
{% endfor %}
</ul>
<br/>
</body>