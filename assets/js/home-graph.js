// assets/js/home-graph.js

document.addEventListener("DOMContentLoaded", function() {
    // 1. 데이터 확인
    if (!window.jekyllGraphData || window.jekyllGraphData.length === 0) return;

    const nodes = window.jekyllGraphData;
    const links = [];
    
    // ------------------------------------------------------------
    // 2. 화면 크기 및 모드 설정
    // ------------------------------------------------------------
    const container = document.getElementById('image-graph');
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    const isMobile = () => window.innerWidth < 768;
    const mobileMode = isMobile();

    // ------------------------------------------------------------
    // 3. 데이터 가공
    // ------------------------------------------------------------
    const categoryHubs = {}; 
    const hubList = [];
    const ratio = 1.6; 

    nodes.forEach(node => {
        let rawCat = node.category || 'etc';
        // [오류 수정]: rawCatCat -> rawCat
        const displayCat = rawCat.charAt(0).toUpperCase() + rawCat.slice(1);
        node.displayCategory = displayCat;

        if (!categoryHubs[rawCat]) {
            categoryHubs[rawCat] = node;
            hubList.push(node); 
            node.isHub = true;  
            node.size = 100; 
        } else {
            node.size = 50; 
        }
    });

    hubList.reverse();

    // [핵심] 반응형 배치 계산
    const hubDistance = mobileMode ? 180 : 350; 
    let fitScale = 1;
    let totalLength = 0;

    if (mobileMode) {
        totalLength = (hubList.length * hubDistance) + 500; 
        fitScale = height / totalLength;
    } else {
        totalLength = (hubList.length * hubDistance) + 400; 
        fitScale = width / totalLength;
    }

    if (fitScale > 0.9) fitScale = 0.9;
    if (fitScale < 0.25) fitScale = 0.25;

    // 초기 위치 잡기
    const trainLen = (hubList.length - 1) * hubDistance;
    
    hubList.forEach((hub, index) => {
        if (mobileMode) {
            hub.x = width / 2;
            hub.y = (height / 2) - (trainLen / 2) + (index * hubDistance);
        } else {
            hub.x = (width / 2) - (trainLen / 2) + (index * hubDistance);
            hub.y = height / 2;
        }
    });

    // 링크 연결
    for (let i = 0; i < hubList.length - 1; i++) {
        links.push({ source: hubList[i].id, target: hubList[i+1].id, isSpine: true });
    }

    nodes.forEach(node => {
        const cat = node.category || 'etc';
        const hub = categoryHubs[cat];
        if (node.id !== hub.id) {
            links.push({ source: hub.id, target: node.id, isSpine: false });
            if (hub) {
                node.x = hub.x + (Math.random() - 0.5) * 50;
                node.y = hub.y + (Math.random() - 0.5) * 50;
            }
        }
    });

    const graphData = { nodes, links };

    // ------------------------------------------------------------
    // 4. SVG 생성
    // ------------------------------------------------------------
    const svg = d3.select("#image-graph").append("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g");

    const zoom = d3.zoom()
        .scaleExtent([0.1, 5])
        .on("zoom", (event) => g.attr("transform", event.transform));
    svg.call(zoom).on("dblclick.zoom", null);

    // ------------------------------------------------------------
    // 5. 물리 엔진
    // ------------------------------------------------------------
    const simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links)
            .id(d => d.id)
            .distance(d => d.isSpine ? hubDistance : (mobileMode ? 75 : 100))
        )
        .force("charge", d3.forceManyBody().strength(mobileMode ? -750 : -750))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(d => (d.size * ratio) * 0.75).iterations(2));

    // Hub 고정 힘 (가로/세로 정렬)
    if (mobileMode) {
        simulation.force("x", d3.forceX(width / 2).strength(d => d.isHub ? 0.2 : 0.05));
    } else {
        simulation.force("y", d3.forceY(height / 2).strength(d => d.isHub ? 0.2 : 0.05));
    }

    // ------------------------------------------------------------
    // 6. 그리기
    // ------------------------------------------------------------
    const link = g.append("g").attr("class", "links")
        .selectAll("line").data(graphData.links).enter().append("line")
        .attr("class", "link")
        .attr("id", d => `link-${d.source.id}-${d.target.id}`)
        .style("stroke", d => d.isSpine ? "#314549" : "#e0e0e0")
        .style("stroke-width", d => d.isSpine ? "3px" : "1.5px");

    const node = g.append("g").attr("class", "nodes")
        .selectAll("g").data(graphData.nodes).enter().append("g")
        .attr("class", "node")
        .attr("id", d => `node-${d.id}`)
        .on("mouseover", (event, d) => nodeHover(event, d, true))
        .on("mouseout", (event, d) => nodeHover(event, d, false))
        .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended))
        .on("click", (event, d) => {
            if (!event.defaultPrevented) window.location.href = d.link; 
        });
    
    // [수정] 호버 범위 확장을 위한 투명 히트박스 (가장 먼저 그려져서 영역 제공)
    node.append("rect")
        .attr("class", "node-hitbox") 
        .attr("width", d => d.size * ratio + 50) 
        .attr("height", d => d.size + 80) 
        .attr("x", d => -(d.size * ratio + 50) / 2)
        .attr("y", d => -(d.size + 80) / 2)
        .style("fill", "transparent") 
        .style("pointer-events", "all"); 

    // 기존 도형 및 이미지
    node.append("defs").append("clipPath")
        .attr("id", d => "clip-" + d.id).append("rect")
        .attr("width", d => d.size * ratio).attr("height", d => d.size)
        .attr("rx", 7).attr("ry", 7)
        .attr("x", d => -(d.size * ratio) / 2).attr("y", d => -d.size / 2);

    node.append("rect")
        .attr("class", "node-rect")
        .attr("width", d => d.size * ratio).attr("height", d => d.size)
        .attr("rx", 7).attr("ry", 7)
        .attr("x", d => -(d.size * ratio) / 2).attr("y", d => -d.size / 2)
        .style("fill", "#fff")
        .style("stroke", d => d.isHub ? "#314549" : "#546e7a")
        .style("stroke-width", d => d.isHub ? "5px" : "1px")
        .style("pointer-events", "none"); 

    node.append("image")
        .attr("class", "node-image")
        .attr("xlink:href", d => d.imgUrl)
        .attr("width", d => d.size * ratio).attr("height", d => d.size)
        .attr("x", d => -(d.size * ratio) / 2).attr("y", d => -d.size / 2)
        .attr("clip-path", d => `url(#clip-${d.id})`)
        .attr("preserveAspectRatio", "xMidYMid slice")
        .style("pointer-events", "none");
        
    // 텍스트 그룹 생성
    const textGroup = node.append("text")
        .attr("class", "node-text")
        .attr("text-anchor", "middle").attr("y", d => (d.size / 2) + 25)
        .style("pointer-events", "none")
        .style("stroke", "white")
        .style("stroke-width", "5px")
        .style("stroke-linejoin", "round")
        .style("paint-order", "stroke"); 

    // 텍스트 내용 생성 로직 (생략)
    textGroup.each(function(d) {
        let text = d.isHub ? d.displayCategory : d.title;
        let size = d.isHub ? "20px" : "14px";
        let weight = d.isHub ? "bold" : "normal";
        let color = "#314549";
        const words = text.split(/\s+/);
        
        // tspan 생성 시 fill color 명시
        let line = [], 
            tspan = d3.select(this).append("tspan")
                .attr("x", 0).attr("dy", 0)
                .style("font-size", size)
                .style("font-weight", weight)
                .style("fill", color); // [수정] fill color 명시
        
        words.forEach(w => {
            line.push(w);
            if(line.join(" ").length > 12 && line.length > 1) {
                line.pop(); tspan.text(line.join(" ")); line = [w];
                tspan = d3.select(this).append("tspan")
                    .attr("x", 0).attr("dy", "1.5em").text(w)
                    .style("font-size", size)
                    .style("font-weight", weight)
                    .style("fill", color); // [수정] fill color 명시
            } else tspan.text(line.join(" "));
        });

        if(d.isHub) {
            const words = d.title.split(/\s+/);
            // tspan 생성 시 fill color 명시
            let line = [], 
                tspan = d3.select(this).append("tspan")
                    .attr("x", 0).attr("dy", "1.5em")
                    .style("font-size", "14px")
                    .style("fill", "#546e7a"); // [수정] fill color 명시
            
            words.forEach(w => {
                line.push(w);
                if(line.join(" ").length > 30 && line.length > 1) {
                    line.pop(); tspan.text(line.join(" ")); line = [w];
                    tspan = d3.select(this).append("tspan")
                        .attr("x", 0).attr("dy", "1.5em").text(w)
                        .style("font-size", "14px")
                        .style("fill", "#546e7a"); // [수정] fill color 명시
                } else tspan.text(line.join(" "));
            });
        }
    });

    // ------------------------------------------------------------
    // 7. 호버링 이벤트 핸들러 (복구 시 즉각 반응)
    // ------------------------------------------------------------
    function nodeHover(event, d, isHovering) {
        const targetNode = d3.select(event.currentTarget);
        const scaleFactor = 2.0; 
        const dimOpacity = 0.3;
        const transitionDuration = 200; 
        const instantDuration = 0; // 복구 시 트랜지션 시간 0ms

        const getConnectedLinkIds = (hoveredNode) => {
            return links
                .filter(link => link.source.id === hoveredNode.id || link.target.id === hoveredNode.id)
                .map(link => `#link-${link.source.id}-${link.target.id}`);
        };

        if (isHovering) {
            // 확대 시 부드럽게 (200ms)
            targetNode.style("opacity", 1.0).raise(); 
            g.selectAll(".node").transition().duration(transitionDuration).style("opacity", dimOpacity);
            g.selectAll(".link").transition().duration(transitionDuration).style("opacity", dimOpacity);

            targetNode.transition().duration(transitionDuration)
                .attr("transform", `translate(${d.x},${d.y}) scale(${scaleFactor})`)
                .style("opacity", 1.0).raise(); 

            targetNode.select(".node-text").transition().duration(transitionDuration)
                .attr("transform", `translate(0, ${(scaleFactor - 1) * d.size * 0.5})`);
            
            const connectedLinks = getConnectedLinkIds(d);
            connectedLinks.forEach(linkId => {
                d3.select(linkId).transition().duration(transitionDuration).style("opacity", 1.0);
            });

        } else {
            // [수정] 복구 시 즉시 (0ms)
            
            // 1. 모든 노드와 선의 투명도 복원 (0ms)
            g.selectAll(".node").transition().duration(instantDuration).style("opacity", 1.0); 
            g.selectAll(".link").transition().duration(instantDuration).style("opacity", 1.0);

            // 2. 현재 노드 크기 복원 (0ms)
            targetNode.transition().duration(instantDuration)
                .attr("transform", `translate(${d.x},${d.y}) scale(1)`);
            
            // 3. 텍스트 위치 복원 (0ms)
            targetNode.select(".node-text").transition().duration(instantDuration)
                .attr("transform", `translate(0, 0)`);
        }
    }

// ------------------------------------------------------------
// 8. 업데이트 및 중앙 정렬 (가장 확실한 Offset 방식)
// ------------------------------------------------------------
    
    simulation.on("tick", () => {
        link.attr("x1", d => d.source.x).attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // [핵심 변경] 복잡한 행렬 변환 대신, 가장 단순한 '중심점 보정(Offset)' 공식을 사용합니다.
    // 원리: (화면너비 - (화면너비 * 배율)) / 2 = 정확한 중앙 정렬 시작점(x, y)
    
    const initialTranslateX = (width - width * fitScale) / 2;
    const initialTranslateY = (height - height * fitScale) / 2;

    // 계산된 좌표와 배율을 즉시 적용합니다.
    svg.call(zoom.transform, d3.zoomIdentity
        .translate(initialTranslateX, initialTranslateY)
        .scale(fitScale)
    );

    window.addEventListener("resize", () => {
        const newIsMobile = window.innerWidth < 768;
        if (newIsMobile !== mobileMode) {
            location.reload(); 
        } else {
            width = container.clientWidth;
            height = container.clientHeight;
            svg.attr("width", width).attr("height", height);
            simulation.force("center", d3.forceCenter(width / 2, height / 2));
            
            if (mobileMode) simulation.force("x", d3.forceX(width / 2).strength(d => d.isHub ? 1.0 : 0.05));
            else simulation.force("y", d3.forceY(height / 2).strength(d => d.isHub ? 1.0 : 0.05));

            simulation.alpha(0.3).restart();
        }
    });

    function dragstarted(event, d) { if (!event.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; }
    function dragged(event, d) { d.fx = event.x; d.fy = event.y; }
    function dragended(event, d) { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }
});