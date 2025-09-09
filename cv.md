---
title: CV
layout: none
permalink: /cv/
---
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting to CV</title>
  <script>
    // 1) /cv/ → / (홈) 으로 히스토리 치환
    history.replaceState(null, "", "/");
    // 2) PDF로 이동
    location.href = "/assets/pdfs/cv.pdf#toolbar=1";
  </script>
  <noscript>
    <meta http-equiv="refresh" content="0; url=/assets/pdfs/cv.pdf">
  </noscript>
</head>
<body>
  <p>Open CV (PDF)<a href="/assets/pdfs/cv.pdf"></a>.</p>
</body>
</html>