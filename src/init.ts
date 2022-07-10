import { slidersData } from "./slidersData";
import { renderBubbleChart } from "./renderBubbleChart.js";
import { getTotalProducedCO2, setTooltipPositionAndValue } from "./utils";

const handleSliderChange = (sliderId: string, i: number) => (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value;

  // Write new slider value to slidersData global obj
  slidersData[i].sliderValue = newValue as unknown as number;

  setTooltipPositionAndValue(sliderId);
};

// Add event listeners to sliders
const $sliders = slidersData.map((sliderData, idx) => {
  const { id: sliderId } = sliderData;
  const $slider = document.getElementById(sliderId) as HTMLInputElement;

  $slider?.addEventListener("input", handleSliderChange(sliderId, idx));

  return $slider;
});

document.getElementById("count-btn")?.addEventListener("click", () => {
  // TODO: get all these action to util functions
  const co2Result = document.getElementById(
    "co2-result"
  ) as HTMLParagraphElement;
  const totalCO2 = getTotalProducedCO2().toString();
  co2Result.innerHTML = `${totalCO2}g CO2`;

  renderBubbleChart();

  const bottomContainer = document.getElementById(
    "bottom-container"
  ) as HTMLDivElement;
  bottomContainer.style.display = "block";

  const element = document.getElementById(
    "co2-summed-up-result-section"
  ) as HTMLElement;
  element.scrollIntoView({ behavior: "smooth" });
});
