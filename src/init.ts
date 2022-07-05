import { renderGraph } from "./bubbleChart.js";

// get to constants
const SLIDERS_IDS = ["netflix", "spotify"] as const;

type TSliderId = typeof SLIDERS_IDS[number];

// Application state (POTEM TS polepszyć)
const slidersValues = {
  netflix: 0,
  spotify: 0,
};

// JUŻ MASZ BIEŻACE WARTOŚCI INPUTOW W STANIE

// TERAZ: wyświetlenie wartości inputow w kolkach

// skmiń dobrą nazwę!!
const getFile = (id: string, sliderValue: number) => {
  // MUSISZ USTALIĆ JAK DOKŁADNIE MA WYGLĄDAĆ JEDEN PLIK (JAKIE PROPERTISY)
  // I CO KAŻDY Z NICH ROBI, A JAK NIE ZROZUMIESZ TO ZAPYTASZ KACPRA
  return { id: id, value: sliderValue };
};

const calculateBubblesData = () => {
  // tutaj na podstawie stanu slidersValues STWORZYSZ PLIK FILES

  // nazwa do zmiany
  const files = [];
  for (const id in slidersValues) {
    // TODO: kalkulacja CO2

    // add eac calculated co2 value

    // ts do naprawienia
    files.push(getFile(id, slidersValues[id]));
  }
  return files;
};

// const renderGraph = (files) => {

// }

// currying
const handleSliderChange = (sliderId: TSliderId) => (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value;

  console.log(newValue);

  slidersValues[sliderId] = newValue as unknown as number;

  console.log(calculateBubblesData());

  renderGraph(calculateBubblesData());
};

// wziac to do osobnego pliku ładnie potem

// najpierw zrob to mapem a potem reducem jak Kacper

const $sliders = SLIDERS_IDS.map((sliderId) => {
  const $slider = document.getElementById(sliderId);

  console.log($slider);

  if ($slider) {
    $slider?.addEventListener("change", handleSliderChange(sliderId));
    return $slider as HTMLInputElement;
  }
});
