
/* Load CSV, Convert Type, Quick Check */

d3.csv("data/tvBrandCount.csv", d => ({
    brand: d.brand,
    count: +d.count
})).then(data => {

    // Quick check
    console.log(data);
    console.log("rows:", data.length);
    console.log("max:", d3.max(data, d => d.count));
    console.log("min:", d3.min(data, d => d.count));
    console.log("extent:", d3.extent(data, d => d.count));

    // Sort by count (descending)
    data.sort((a, b) => d3.descending(a.count, b.count));

    // Call the chart function from T04-5
    createBarChart(data);

});