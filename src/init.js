// ids same as html ids
export const slidersData = [
  {
    id: "rozmowa_przez_telefon",
    sliderValue: 0,
    gramsProducedPerHour: 0.586285714,
    getCalculatedCO2Value() {
      return calculateCo2Value(this.sliderValue, this.gramsProducedPerHour);
    },
    circleColor: "#9747FF",
    circleTitle: "Rozmowa",
  },

  {
    id: "komunikatory",
    sliderValue: 0,
    gramsProducedPerHour: 1.788512571,
    getCalculatedCO2Value() {
      return calculateCo2Value(this.sliderValue, this.gramsProducedPerHour);
    },
    circleColor: "#00CCFF",
    circleTitle: "Komunikatory",
  },
  {
    id: "gry",
    sliderValue: 0,
    gramsProducedPerHour: 7.525947086,
    getCalculatedCO2Value() {
      return calculateCo2Value(this.sliderValue, this.gramsProducedPerHour);
    },
    circleColor: "#FF7F00",
    circleTitle: "Rozmowa",
  },
  {
    id: "instagram",
    sliderValue: 0,
    gramsProducedPerHour: 36.527292,
    getCalculatedCO2Value() {
      return calculateCo2Value(this.sliderValue, this.gramsProducedPerHour);
    },
    circleColor: "#FF5176",
    circleTitle: "Instagram",
  },
  {
    id: "tiktok",
    sliderValue: 0,
    gramsProducedPerHour: 288.6639806,
    getCalculatedCO2Value() {
      return calculateCo2Value(this.sliderValue, this.gramsProducedPerHour);
    },
    circleColor: "#000000",
    circleTitle: "TikTok",
  },
  {
    id: "youtube",
    sliderValue: 0,
    gramsProducedPerHour: 53.52104229,
    getCalculatedCO2Value() {
      return calculateCo2Value(this.sliderValue, this.gramsProducedPerHour);
    },
    circleColor: "#FF2424",
    circleTitle: "YouTube",
  },
  {
    id: "spotify",
    sliderValue: 0,
    gramsProducedPerHour: 18.36032229,
    getCalculatedCO2Value() {
      return calculateCo2Value(this.sliderValue, this.gramsProducedPerHour);
    },
    circleColor: "#00D954",
    circleTitle: "Spotify",
  },
  {
    id: "przegladarka",
    sliderValue: 0,
    gramsProducedPerHour: 16.48507886,
    getCalculatedCO2Value() {
      return calculateCo2Value(this.sliderValue, this.gramsProducedPerHour);
    },
    circleColor: "#FFC42B",
    circleTitle: "Przeglądarka",
  },
  {
    id: "netflix",
    sliderValue: 0,
    gramsProducedPerHour: 133.5269109,
    getCalculatedCO2Value() {
      return calculateCo2Value(this.sliderValue, this.gramsProducedPerHour);
    },
    circleColor: "#B90013",
    circleTitle: "Netflix",
  },
  {
    id: "facebook",
    sliderValue: 0,
    gramsProducedPerHour: 22.63199657,
    getCalculatedCO2Value() {
      return calculateCo2Value(this.sliderValue, this.gramsProducedPerHour);
    },
    circleColor: "#176EE9",
    circleTitle: "Facebook",
  },
];

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
    // .attr("font-size", isMobile ? 9 : 14)
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
      // console.log(d);
      // tutaj moglbys pewnie jakoś ustawić customowe pozycje, pokmiń potem

      // warto żebyś wykminił skąd biorą się x i y
      return `translate(${d.x},${d.y})`;
    });

  // ROBOCZE ROZWIAZANIE: mozesz zapisywac wszystkie wartosci "r" stąd powyżej
  // Wtedy odczyasz je z arrayki i użyjesz w tspanie na dole keidy nadajesz font size

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
      return d.r;
    });

  // console.log(leaf);

  // usunięte
  // .attr("fill", G ? (d) => color(G[d.data]) : fill == null ? "none" : fill)

  if (T) leaf.append("title").text((d) => T[d.data]);

  // console.log(L);
  // L - arrayka wszystkich labelow - ESSA
  if (L) {
    // A unique identifier for clip paths (to avoid conflicts).
    const uid = `O-${Math.random().toString(16).slice(2)}`;

    const radiusesArr = [];

    leaf
      .append("clipPath")
      .attr("id", (d) => `${uid}-clip-${d.data}`)
      .append("circle")
      .attr("r", (d) => {
        radiusesArr.push(d.r);
        return d.r;
      });

    let index1 = 0;
    let index2 = 0;
    const duplicateRadiuses = radiusesArr.flatMap((i) => [i, i]);

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
      .style("font-size", function (d, i) {
        // JAK JUZ SIE UDA TO ZROBIC DLA NAZW GORNYCH TO ODWTORZ TO DLA GRAMOW TEZ TO
        // bedziesz musial po prostu dwa z rzedu stąd przypisywac do jednego indexa radiusesArray i tyle (albo radiuses array duplikujesz kazdy element!)

        // TERAZ: robisz to tylko poniżej danej dlugosci radiusa

        const curRad = duplicateRadiuses[index1];

        // trzy checki
        // 1. jesli curRad < 46 to ZOSTAW 14 px i bedzie dobrze wygladac
        // 2. jeśli wyliczy font-size wiekszy niz 14 to daj 14px
        // 3. jesli mniejsze kolko niz 25 rad to wgle nie wyswietlaj tekstu

        if (curRad < 46) {
          var len = d.substring(0, Math.floor(curRad / 3)).length;
          var size = curRad / 3;
          size *= 10 / len;
          size += 1;

          const fontSize = Math.round(size);
          // console.log("font-size: ", Math.round(size) + "px");

          index1++;

          if (fontSize > 14) {
            return "14px";
          }

          return Math.round(size) - 4 + "px";
        }

        index1++;

        return "14px";
        // return "5px";
      })
      .text((d) => {
        const curRad = duplicateRadiuses[index2];
        console.log("name and rad", { d, curRad });

        if (curRad < 25) {
          index2++;

          return "";
        }

        index2++;

        return d;
      });
    // .text(function (d) {
    //   var text = d.name.substring(0, d.r / 3);
    //   return text;
    // })
  }

  return Object.assign(svg.node(), { scales: { color } });
}

const getFile = (id, calculatedCO2Value, circleColor, circleTitle) => {
  // MUSISZ USTALIĆ JAK DOKŁADNIE MA WYGLĄDAĆ JEDEN PLIK (JAKIE PROPERTISY)
  // I CO KAŻDY Z NICH ROBI, A JAK NIE ZROZUMIESZ TO ZAPYTASZ KACPRA
  return { id: id, value: calculatedCO2Value, circleColor, circleTitle };
};

const calculateBubblesDataAKAgetFiles = () => {
  const files = [];
  slidersData.forEach((slider) => {
    const { id, circleColor, circleTitle } = slider;
    const calculatedCO2Value = slider.getCalculatedCO2Value();
    // Do not add zeroes
    if (calculatedCO2Value) {
      files.push(
        getFile(id, Math.round(calculatedCO2Value), circleColor, circleTitle)
      );
    }
  });

  return files;
};

let isFirstChartRender = true;

const renderBubbleChart = () => {
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
    height: isMobile ? 460 : 1000,
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

const handleSliderChange = (sliderId, i) => (event) => {
  const newValue = event.target.value;

  // Write new slider value to slidersData global obj
  slidersData[i].sliderValue = newValue;

  setTooltipPositionAndValue(sliderId);
};

// Add event listeners to sliders
const $sliders = slidersData.map((sliderData, idx) => {
  const { id: sliderId } = sliderData;
  const $slider = document.getElementById(sliderId);

  $slider?.addEventListener("input", handleSliderChange(sliderId, idx));

  return $slider;
});

document.getElementById("count-btn")?.addEventListener("click", () => {
  // TODO: get all these action to util functions
  const co2Result = document.getElementById("co2-result");
  const totalCO2 = getTotalProducedCO2().toString();
  co2Result.innerHTML = `${totalCO2}g CO2`;

  renderBubbleChart();

  const bottomContainer = document.getElementById("bottom-container");
  bottomContainer.style.display = "block";

  const element = document.getElementById("co2-summed-up-result-section");
  element.scrollIntoView({ behavior: "smooth" });
});

function calculateCo2Value(minutes, gramsProducedPerHour) {
  return (gramsProducedPerHour / 60) * minutes;
}

function getTotalProducedCO2() {
  let sum = 0;

  slidersData.forEach((sliderData) => {
    sum = sum + sliderData.getCalculatedCO2Value();
  });

  return Math.round(sum);
}

// This function gets direct input range value
function timeConvertA(minutes) {
  var hours = minutes / 60;
  var flooredHours = Math.floor(hours);
  var minutes = (hours - flooredHours) * 60;
  var roundedMinutes = Math.round(minutes);
  if (flooredHours) {
    return flooredHours + " h " + roundedMinutes + " min";
  } else {
    return roundedMinutes + " min";
  }
}

function setTooltipPositionAndValue(sliderId) {
  const tooltip = document.getElementById(`${sliderId}-tooltip`);
  const slider = document.getElementById(sliderId);

  // TODO: dograć lepiej tę przedziałkę

  // zrozumieć to potem dokładnie, tu sie wylicza ratio przedziałki jakoś
  const newValue = Number(
    ((parseInt(slider.value) - parseInt(slider.min)) * 100) /
      (parseInt(slider.max) - parseInt(slider.min))
  );
  const newPosition = 10 - newValue * 0.4;

  tooltip.innerHTML = timeConvertA(parseInt(slider.value));
  if (newValue > 60) {
    tooltip.style.left = `calc(${newValue}% + (${newPosition}px + 11px))`;
  } else if (newValue > 30) {
    tooltip.style.left = `calc(${newValue}% + (${newPosition}px + 9px))`;
  } else {
    tooltip.style.left = `calc(${newValue}% + (${newPosition}px + 7px))`;
  }
}
