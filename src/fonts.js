import { createGlobalStyle } from "styled-components";
import GolosBold from "./assets/fonts/GolosText-Bold.ttf";
import GolosRegular from "./assets/fonts/GolosText-Regular.ttf";

const FontStyles = createGlobalStyle`

@font-face {
  font-family: 'Golos Text Regular';
  src: url(${GolosRegular}) format('ttf');
}

@font-face {
  font-family: 'Golos Text Bold';
  src: url(${GolosBold}) format('ttf');
}
`
export default FontStyles;