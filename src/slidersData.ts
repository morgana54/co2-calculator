import { calculateCo2Value } from "./utils";

// ids same as html ids
export const slidersData = [
  {
    id: "rozmowa_przez_telefon",
    // dać maybe jakieś sensowne initial values żeby na pierwszy click bez zmiany też charty się wygenerowały
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
