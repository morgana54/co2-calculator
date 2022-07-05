// get to constants
const SLIDERS_IDS = ["netflix", "spotify"] as const;

type TSliderId = typeof SLIDERS_IDS[number];

// Application state (POTEM TS polepszyć)
const componentValues = {
  netflix: 0,
  spotify: 0,
};

// JUŻ MASZ BIEŻACE WARTOŚCI INPUTOW W STANIE

// const calculateBubblesData = () => {
//   return [{}];
// };

// const renderGraph = (files) => {

// }

// currying
const handleSliderChange = (sliderId: TSliderId) => (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value;

  console.log(newValue);

  componentValues[sliderId] = newValue as unknown as number;

  // renderGraph(calculateBubblesData(componentValues));
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
