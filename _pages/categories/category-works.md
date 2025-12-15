---
title: Works
layout: archive
permalink: /works/
entries_layout: grid # posts layout
---
<body oncontextmenu="return false;">
Ideas to Solutions

{% include works-tag.html tag= site.tags %}

<ul>
{% assign posts = site.posts %}
{% for post in posts %} 
    
    {% unless post.tags contains 'None' %}
        {% include archive-single.html type=page.entries_layout %} 
    {% endunless %}

{% endfor %}
</ul>
<br/>
</body>