import { slidersData } from "./slidersData";
import { renderBubbleChart } from "./renderBubbleChart.js";
import { setTooltipPositionAndValue } from "./utils";

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

document
  .getElementById("count-btn")
  ?.addEventListener("click", () => renderBubbleChart());
