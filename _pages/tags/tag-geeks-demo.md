---
title: "Demo"
layout: archive
permalink: /geeks/demo/
entries_layout: list # posts layout (list/grid)
#author_profile: true
#sidebar_main: true
---
<body oncontextmenu="return false;">
{% assign tag = "Demo" %} <!--tag name-->
{% assign posts = site.categories.Geeks %}
  <ul> 
  {% for post in posts %}
    {% if post.tags contains tag %}
      {% include archive-single.html type=page.entries_layout %}
    {% endif %}
  {% endfor %}
  </ul>
</body>