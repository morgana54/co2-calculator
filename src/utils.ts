export const calculateCo2Value = (
  minutes: number,
  gramsProducedPerHour: number
) => (gramsProducedPerHour / 60) * minutes;

// This functions gets direct input range value
export const timeConvertA = (minutes: number) => {
  var hours = minutes / 60;
  var flooredHours = Math.floor(hours);
  var minutes = (hours - flooredHours) * 60;
  var roundedMinutes = Math.round(minutes);
  if (flooredHours) {
    return flooredHours + " h " + roundedMinutes + " min";
  } else {
    return roundedMinutes + " min";
  }
};

export const setTooltipPositionAndValue = (sliderId: string) => {
  const tooltip = document.getElementById(
    `${sliderId}-tooltip`
  ) as HTMLDivElement;
  const slider = document.getElementById(sliderId) as HTMLInputElement;

  // TODO: dograć lepiej tę przedziałkę

  // zrozumieć to potem dokładnie, tu sie wylicza ratio przedziałki jakoś
  const newValue = Number(
    ((parseInt(slider.value) - parseInt(slider.min)) * 100) /
      (parseInt(slider.max) - parseInt(slider.min))
  );
  const newPosition = 10 - newValue * 0.2;

  tooltip.innerHTML = timeConvertA(parseInt(slider.value));
  tooltip.style.left = `calc(${newValue}% + (${newPosition}px))`;
};
