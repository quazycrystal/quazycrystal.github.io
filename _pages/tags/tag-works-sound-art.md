---
title: "Sound Art"
layout: archive
permalink: /works/sound-art/
entries_layout: grid # posts layout (list/grid)
#author_profile: true
#sidebar_main: true
---
<body oncontextmenu="return false;">
{% assign tag = "sound-art" %} <!--tag name-->
{% assign posts = site.categories.Works %}
  <ul> 
  {% for post in posts %}
    {% if post.tags contains tag %}
      {% include archive-single.html type=page.entries_layout %}
    {% endif %}
  {% endfor %}
  </ul>
</body>