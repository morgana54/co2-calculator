import { renderGraph } from "./bubbleChart.js";
import { setTooltipPositionAndValue } from "./utils.ts";

// TERAZ: przeliczanie co2 (wzór / wzory)

// CEL: uzyskać induwidualne wartości gramow co2 na podstawie minut zużycia

// Rozmowa przez telefon	0,586285714	g Co2e/h
// Whatsapp/Discord	1,788512571	g Co2e/h
// gra na telefonie	7,525947086	g Co2e/h
// Instagram	36,527292	g Co2e/h
// Facebook	22,63199657	g Co2e/h
// Tiktok	288,6639806	g Co2e/h
// Netflix	133,5269109	g Co2e/h
// Youtube	53,52104229	g Co2e/h
// Spotify	18,36032229	g Co2e/h
// Korzystanie z przeglądarki	16,48507886	g Co2e/h

// 1h

// czyli WZOR: ilość gramw co2 / 60 XDD

// ZGRAĆ TO W JAKIMŚ JEDNYM OBIEKCIE SENSOWNIE, gdzie będzie wszystko indywidualne:
// id slidera
// wartość slidera
// ilość spalania co2
// przeliczona wartość co2 z wartości slidera
// kolor do kołka
// tekst do kołka (bo jest inny niż id)

// łatwo

// get to constants
const SLIDERS_IDS = [
  "rozmowa_przez_telefon",
  "komunikatory",
  "gry",
  "instagram",
  "tiktok",
  "youtube",
  "spotify",
  "przegladarka",
  "netflix",
  "facebook",
] as const;

type TSliderId = typeof SLIDERS_IDS[number];

// Application state (POTEM TS polepszyć i może jakoś sensowniej zgrać z SLIDERS_IDS
const slidersValues = {
  // dać maybe jakieś sensowne initial values żeby na pierwszy click bez zmiany też charty się wygenerowały
  rozmowa_przez_telefon: 0,
  komunikatory: 0,
  gry: 0,
  instagram: 0,
  tiktok: 0,
  youtube: 0,
  spotify: 0,
  przegladarka: 0,
  netflix: 0,
  facebook: 0,
};

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

// currying
const handleSliderChange = (sliderId: TSliderId) => (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value;

  console.log(newValue);

  slidersValues[sliderId] = newValue as unknown as number;

  setTooltipPositionAndValue(sliderId);
};

// najpierw zrob to mapem a potem reducem jak Kacper

// Add event listeners to sliders
const $sliders = SLIDERS_IDS.map((sliderId) => {
  const $slider = document.getElementById(sliderId);

  console.log($slider);

  if ($slider) {
    $slider?.addEventListener("input", handleSliderChange(sliderId));
    return $slider as HTMLInputElement;
  }
});

document
  .getElementById("count-btn")
  ?.addEventListener("click", () => renderGraph(calculateBubblesData()));
