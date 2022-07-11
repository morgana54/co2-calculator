import * as d3 from "d3";
import { slidersData } from "./slidersData";

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/bubble-chart
function BubbleChart(
  data,
  {
    name = ([x]) => x, // alias for label
    label = name, // given d in data, returns text to display on the bubble
    value = ([, y]) => y, // given d in data, returns a quantitative size
    group, // given d in data, returns a categorical value for color
    title, // given d in data, returns text to show on hover
    link, // given a node d, its link (if any)
    linkTarget = "_blank", // the target attribute for links, if any
    width = 640, // outer width, in pixels
    height = width, // outer height, in pixels
    padding = 4, // padding between circles
    margin = 0, // default margins
    marginTop = margin, // top margin, in pixels
    marginRight = margin, // right margin, in pixels
    marginBottom = margin, // bottom margin, in pixels
    marginLeft = margin, // left margin, in pixels
    groups, // array of group names (the domain of the color scale)
    colors, // an array of colors (for groups)
    fill = "#ccc", // a static fill color, if no group channel is specified
    fillOpacity = 0.7, // the fill opacity of the bubbles
    stroke, // a static stroke around the bubbles
    strokeWidth, // the stroke width around the bubbles, if any
    strokeOpacity, // the stroke opacity around the bubbles, if any
  } = {}
) {
  // Compute the values.
  const D = d3.map(data, (d) => d);
  const V = d3.map(data, value);
  const G = group == null ? null : d3.map(data, group);
  const I = d3.range(V.length).filter((i) => V[i] > 0);

  // Unique the groups.
  if (G && groups === undefined) groups = I.map((i) => G[i]);
  groups = G && new d3.InternSet(groups);

  // Construct scales.
  // TUTAJ MODYFIKUJESZ TAK ŻEBY KOLOR MOŻNA BYŁO ŁATWO PODAĆ
  const color = G && d3.scaleOrdinal(groups, colors);

  // Compute labels and titles.
  const L = label == null ? null : d3.map(data, label);
  const T =
    title === undefined ? L : title == null ? null : d3.map(data, title);

  // Compute layout: create a 1-deep hierarchy, and pack it.
  const root = d3
    .pack()
    .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
    .padding(padding)(d3.hierarchy({ children: I }).sum((i) => V[i]));

  const isMobile = window.matchMedia("(max-width: 875px)").matches;

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-marginLeft, -marginTop, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    .attr("fill", "currentColor")
    // TUTAJ ROZMIAR FONTOW
    .attr("font-size", isMobile ? 9 : 14)
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle");

  const leaf = svg
    .selectAll("a")
    .data(root.leaves())
    .join("a")
    .attr(
      "xlink:href",
      link == null ? null : (d, i) => link(D[d.data], i, data)
    )
    .attr("target", link == null ? null : linkTarget)
    // tutaj się ustawia pozycje, wiec tutaj możesz coś kombinować z LAYOUTEM
    .attr("transform", (d) => {
      console.log(d);
      // tutaj moglbys pewnie jakoś ustawić customowe pozycje, pokmiń potem

      // warto żebyś wykminił skąd biorą się x i y
      return `translate(${d.x},${d.y})`;
    });

  // tutaj są style każdego z kołek
  leaf
    .append("circle")
    .attr("stroke", stroke)
    .attr("stroke-width", strokeWidth)
    .attr("stroke-opacity", strokeOpacity)
    .attr("fill", (_, circleIndex) => {
      // ESSSA KOLOR
      return D[circleIndex].circleColor;
    })
    .attr("height", 500)
    .attr("fill-opacity", fillOpacity)
    .attr("r", (d) => {
      // console.log(d);
      return d.r * 1.3;
    });

  function crop(text, circle) {
    var circleRadius = circle.node().getBBox().width;
    while (text.node().getComputedTextLength() > circleRadius) {
      text.text(text.text().slice(0, -4) + "...");
    }
  }

  console.log(leaf);

  // usunięte
  // .attr("fill", G ? (d) => color(G[d.data]) : fill == null ? "none" : fill)

  if (T) leaf.append("title").text((d) => T[d.data]);

  console.log(L);
  // L - arrayka wszystkich labelow - ESSA
  if (L) {
    // A unique identifier for clip paths (to avoid conflicts).
    const uid = `O-${Math.random().toString(16).slice(2)}`;

    leaf
      .append("clipPath")
      .attr("id", (d) => `${uid}-clip-${d.data}`)
      .append("circle")
      // return d.r + 5; ŻEBY ZWIĘKSZYC PROMIEŃ KOLKA
      .attr("r", (d) => d.r);

    leaf
      .append("text")
      // .attr(
      //   "clip-path",
      //   (d) => `url(${new URL(`#${uid}-clip-${d.data}`, location)})`
      // )
      // TUTAJ MASZ TSPAN
      .selectAll("tspan")
      .data((d) => `${L[d.data]}`.split(/\n/g))
      .join("tspan")
      .attr("color", "white")
      .attr("x", 0)
      .attr("y", (d, i, D) => {
        if (i % 2 === 0) {
          return `${i - D.length / 2 + 0.85}em`;
        }

        return `${i - D.length / 2 + 1.1}em`;
      })
      .attr("fill-opacity", "1")
      .text((d, index) => {
        return d;
      });
  }

  return Object.assign(svg.node(), { scales: { color } });
}

const getFile = (id, sliderValue, circleColor, circleTitle) => {
  // MUSISZ USTALIĆ JAK DOKŁADNIE MA WYGLĄDAĆ JEDEN PLIK (JAKIE PROPERTISY)
  // I CO KAŻDY Z NICH ROBI, A JAK NIE ZROZUMIESZ TO ZAPYTASZ KACPRA
  return { id: id, value: sliderValue, circleColor, circleTitle };
};

const calculateBubblesDataAKAgetFiles = () => {
  const files = [];
  slidersData.forEach(({ id, sliderValue, circleColor, circleTitle }) => {
    // Do not add zeroes
    if (sliderValue) {
      files.push(getFile(id, sliderValue, circleColor, circleTitle));
    }
  });

  return files;
};

let isFirstChartRender = true;

export const renderBubbleChart = () => {
  const files = calculateBubblesDataAKAgetFiles();
  const isMobile = window.matchMedia("(max-width: 875px)").matches;

  const chart = BubbleChart(files, {
    // .split(".")
    //       .pop()
    //       .split(/(?=[A-Z][a-z])/g)
    label: (d) =>
      [d.circleTitle, d.value.toLocaleString("en")].join("\n").concat(" g"),
    value: (d) => d.value,
    title: (d) => `${d.circleTitle}\n${d.value.toLocaleString("en")}`,
    width: isMobile ? 300 : 800,
    height: isMobile ? 460 : 600,
    // TUTAJ USTAWIASZ SPACING ŁATWOOOO
    padding: isMobile ? 50 : 90,
  });

  if (isFirstChartRender) {
    isFirstChartRender = false;
    document.getElementById("bubble-chart-container").appendChild(chart);
  } else {
    const previousBubbleChart = document.getElementById(
      "bubble-chart-container"
    ).childNodes[0];

    document
      .getElementById("bubble-chart-container")
      .replaceChild(chart, previousBubbleChart);
  }
};
