---
title: Design
layout: archive
permalink: /design/
entries_layout: grid # posts layout
---
<body oncontextmenu="return false;">
<!-- Experiments and embodiment of thoughts -->
<!-- Experiments and embodiment of thoughts -->
Design is thought, tested and made tangible for a clear purpose.
(목적을 위해 시험되고 형태를 얻은 생각.)

Art

Art is mischievous and nebulous thought, set free
{% include works-tag.html tag= site.tags %}

<!--posts-->
<ul> 
  {% assign posts = site.categories.Works %}
  {% for post in posts %} 
      {% include archive-single.html type=page.entries_layout %} 
  {% endfor %}
</ul>
</body>