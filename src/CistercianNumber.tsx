import React, {useEffect, useRef} from "react";
import * as d3 from "d3";

const digit = (n: number, p: number) =>
  parseInt(n.toString().padStart(4, "0")[p], 10);
const thousands = (n: number) => digit(n, 0);
const hundreds = (n: number) => digit(n, 1);
const tens = (n: number) => digit(n, 2);
const units = (n: number) => digit(n, 3);

const STROKE_WIDTH = 16;
const STROKE_OFFSET = STROKE_WIDTH / 2;

function line(svg: any) {
  return svg
    .append("line")
    .style("stroke", "black")
    .style("stroke-linecap", "round")
    .style("stroke-width", STROKE_WIDTH);
}

function pos(
  svg: any,
  x1: string | number,
  x2: string | number,
  y1: string | number,
  y2: string | number
) {
  return svg.attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2);
}

function h(svg: any) {
  return svg.node().parentNode.getBoundingClientRect().height;
}

function w(svg: any) {
  return svg.node().parentNode.getBoundingClientRect().width;
}

const matrix = [
  [
    (svg: any) => {},
    (svg: any) => pos(line(svg), "50%", w(svg) - STROKE_OFFSET, STROKE_OFFSET, STROKE_OFFSET),
    (svg: any) => pos(line(svg), "50%", w(svg) - STROKE_OFFSET, "33%", "33%"),
    (svg: any) => pos(line(svg), "50%", w(svg) - STROKE_OFFSET, STROKE_OFFSET, "33%"),
    (svg: any) => pos(line(svg), "50%", w(svg) - STROKE_OFFSET, "33%", STROKE_OFFSET),
    (svg: any) => {matrix[0][1](svg); matrix[0][4](svg); },
    (svg: any) => pos(line(svg), w(svg) - STROKE_OFFSET, w(svg) - STROKE_OFFSET, STROKE_OFFSET, "33%"),
    (svg: any) => {matrix[0][1](svg);matrix[0][6](svg);},
    (svg: any) => {matrix[0][2](svg);matrix[0][6](svg);},
    (svg: any) => {matrix[0][1](svg);matrix[0][2](svg);matrix[0][6](svg);},
  ],
  [
    (svg: any) => {},
    (svg: any) => pos(line(svg), STROKE_OFFSET, "50%", STROKE_OFFSET, STROKE_OFFSET),
    (svg: any) => pos(line(svg), STROKE_OFFSET, "50%", "33%", "33%"),
    (svg: any) => pos(line(svg), STROKE_OFFSET, "50%", "33%", STROKE_OFFSET),
    (svg: any) => pos(line(svg), STROKE_OFFSET, "50%", STROKE_OFFSET, "33%"),
    (svg: any) => {matrix[1][1](svg);matrix[1][4](svg);},
    (svg: any) => pos(line(svg), STROKE_OFFSET, STROKE_OFFSET, STROKE_OFFSET, "33%"),
    (svg: any) => {matrix[1][1](svg);matrix[1][6](svg);},
    (svg: any) => {matrix[1][2](svg);matrix[1][6](svg);},
    (svg: any) => {matrix[1][1](svg);matrix[1][2](svg);matrix[1][6](svg);},
  ],
  [
    (svg: any) => {},
    (svg: any) => pos(line(svg), "50%", w(svg) - STROKE_OFFSET, h(svg) - STROKE_OFFSET, h(svg) - STROKE_OFFSET),
    (svg: any) => pos(line(svg), "50%", w(svg) - STROKE_OFFSET, "66%", "66%"),
    (svg: any) => pos(line(svg), "50%", w(svg) - STROKE_OFFSET, h(svg) - STROKE_OFFSET, "66%"),
    (svg: any) => pos(line(svg), "50%", w(svg) - STROKE_OFFSET, "66%", h(svg) - STROKE_OFFSET),
    (svg: any) => {matrix[2][1](svg);matrix[2][4](svg);},
    (svg: any) => pos(line(svg), w(svg) - STROKE_OFFSET, w(svg) - STROKE_OFFSET, "66%", h(svg) - STROKE_OFFSET),
    (svg: any) => {matrix[2][1](svg);matrix[2][6](svg);},
    (svg: any) => {matrix[2][2](svg);matrix[2][6](svg);},
    (svg: any) => {matrix[2][1](svg);matrix[2][2](svg);matrix[2][6](svg);},
  ],
  [
    (svg: any) => {},
    (svg: any) => pos(line(svg), STROKE_OFFSET, "50%", h(svg) - STROKE_OFFSET, h(svg) - STROKE_OFFSET),
    (svg: any) => pos(line(svg), STROKE_OFFSET, "50%", "66%", "66%"),
    (svg: any) => pos(line(svg), STROKE_OFFSET, "50%", "66%", h(svg) - STROKE_OFFSET),
    (svg: any) => pos(line(svg), STROKE_OFFSET, "50%", h(svg) - STROKE_OFFSET, "66%"),
    (svg: any) => {matrix[3][1](svg);matrix[3][4](svg);},
    (svg: any) => pos(line(svg), STROKE_OFFSET, STROKE_OFFSET, h(svg) - STROKE_OFFSET, "66%"),
    (svg: any) => {matrix[3][1](svg);matrix[3][6](svg);},
    (svg: any) => {matrix[3][2](svg);matrix[3][6](svg);},
    (svg: any) => {matrix[3][1](svg);matrix[3][2](svg);matrix[3][6](svg);},
  ],
];

interface IProps {
  value: number;
}

export const CistercianNumber = (props: IProps) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current != null) {
      // @ts-ignore
      d3Container.current.innerHTML = "";
    }

    if (isNaN(props.value) || props.value < 0 || props.value > 9999) {
      const svg = d3.select(d3Container.current);
      svg.select("*").remove();
    } else {
      if (!isNaN(props.value) && d3Container.current) {
        const svg = d3.select(d3Container.current);

        // remove existing elements
        svg.select("*").remove();

        // draw middle line
        // @ts-ignore
        pos(line(svg), "50%", "50%", STROKE_OFFSET, h(svg) - STROKE_OFFSET);

        if (props.value < 1 || props.value > 9999) {
          console.log("out of range: " + props.value);
        } else {
          try {
            matrix[3][thousands(props.value)](svg);
            matrix[2][hundreds(props.value)](svg);
            matrix[1][tens(props.value)](svg);
            matrix[0][units(props.value)](svg);
          } catch (e) {
            console.error(e);
            svg.select("*").remove();
          }
        }
      }
    }
  }, [props.value]);

  return <svg width="100%" height="100%" ref={d3Container} />;
};
