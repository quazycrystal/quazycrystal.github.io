---
title: Design
layout: archive
permalink: /design/
entries_layout: grid # posts layout
---
<body oncontextmenu="return false;">
<!-- Experiments and embodiment of thoughts -->
<!-- Experiments and embodiment of thoughts -->
Solutions with a clear purpose refined by research

{% include works-tag.html tag= site.tags %}

<!--posts-->
<ul> 
  {% assign posts = site.categories.Design %}
  {% for post in posts %} 
      {% include archive-single.html type=page.entries_layout %} 
  {% endfor %}
</ul>
</body>