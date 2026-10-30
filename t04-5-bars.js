
const createBarChart = (data) => {

    // --- Chart dimensions ---
    const viewW = 800;
    const viewH = Math.max(300, data.length * 40);

    // Space for labels and values
   const labelX = 230;
const rightMargin = 55;

    // --- Create responsive SVG ---
    const svg = d3.select(".responsive-svg-container")
        .selectAll("svg")
        .data([null])
        .join("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .attr("width", "100%")
        .attr("height", "auto")
        .style("max-width", "800px")
        .style("display", "block");

    // --- X scale (numeric) ---
    const xMax = d3.max(data, d => d.count);

    const xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, viewW - labelX - rightMargin]);

    // --- Y scale (categorical) ---
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, viewH])
        .paddingInner(0.2)
        .paddingOuter(0.1);

    // --- OLD T04-6 rectangle-only code ---
    // Kept as reference for lecturer's requirement
    /*
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", 0)
        .attr("y", d => yScale(d.brand))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");
    */

    // Remove previous chart elements before redrawing
    svg.selectAll("*").remove();

    // --- Create a group for each row ---
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("class", "bar-group")
        .attr("transform", d =>
            `translate(0, ${yScale(d.brand)})`
        );

    // --- Draw blue bars ---
    barAndLabel
        .append("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", labelX)
        .attr("y", 0)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("rx", 3)
        .attr("fill", "steelblue");

    // --- Brand labels (left of bars) ---
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("class", "brand-label")
        .attr("x", labelX - 10)
        .attr("y", yScale.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "end");

    // --- Count labels (right of bars) ---
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("class", "count-label")
        .attr("x", d => labelX + xScale(d.count) + 8)
        .attr("y", yScale.bandwidth() / 2)
        .attr("dy", "0.35em");

};
