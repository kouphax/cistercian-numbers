import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const digit = (n: number, p: number) => parseInt(n.toString().padStart(4, '0')[p], 10)
const thousands = (n: number) => digit(n, 0)
const hundreds = (n: number) => digit(n, 1)
const tens = (n: number) => digit(n, 2)
const units = (n: number) => digit(n, 3)

function line(svg: any) {
  return svg.append('line')
      .style("stroke", "black")
      .style("stroke-width", 10);
}

function pos(svg: any, x1: string, x2: string, y1: string, y2: string) {
  return svg
      .attr("x1", x1)
      .attr("x2", x2)
      .attr("y1", y1)
      .attr("y2", y2);
}

const matrix = [
  [
    (svg: any) => {},
    (svg: any) => pos(line(svg), "50%", "100%", "0%", "0%"),
    (svg: any) => pos(line(svg), "50%", "100%", "25%", "25%"),
    (svg: any) => pos(line(svg), "50%", "100%", "0%", "25%"),
    (svg: any) => pos(line(svg), "50%", "100%", "25%", "0%"),
    (svg: any) => { matrix[0][1](svg); matrix[0][4](svg) },
    (svg: any) => pos(line(svg), "100%", "100%", "0%", "25%"),
    (svg: any) => { matrix[0][1](svg); matrix[0][6](svg) },
    (svg: any) => { matrix[0][2](svg); matrix[0][6](svg) },
    (svg: any) => { matrix[0][1](svg); matrix[0][2](svg); matrix[0][6](svg) },
  ],
  [
    (svg: any) => {},
    (svg: any) => pos(line(svg), "0%", "50%", "0%", "0%"),
    (svg: any) => pos(line(svg), "0%", "50%", "25%", "25%"),
    (svg: any) => pos(line(svg), "0%", "50%", "25%", "0%"),
    (svg: any) => pos(line(svg), "0%", "50%", "0%", "25%"),
    (svg: any) => { matrix[1][1](svg); matrix[1][4](svg) },
    (svg: any) => pos(line(svg), "0%", "0%", "0%", "25%"),
    (svg: any) => { matrix[1][1](svg); matrix[1][6](svg) },
    (svg: any) => { matrix[1][2](svg); matrix[1][6](svg) },
    (svg: any) => { matrix[1][1](svg); matrix[1][2](svg); matrix[1][6](svg) },
  ]
  ,
  [
    (svg: any) => {},
    (svg: any) => pos(line(svg), "50%", "100%", "100%", "100%"),
    (svg: any) => pos(line(svg), "50%", "100%", "75%", "75%"),
    (svg: any) => pos(line(svg), "50%", "100%", "100%", "75%"),
    (svg: any) => pos(line(svg), "50%", "100%", "75%", "100%"),
    (svg: any) => { matrix[2][1](svg); matrix[2][4](svg) },
    (svg: any) => pos(line(svg), "100%", "100%", "75%", "100%"),
    (svg: any) => { matrix[2][1](svg); matrix[2][6](svg) },
    (svg: any) => { matrix[2][2](svg); matrix[2][6](svg) },
    (svg: any) => { matrix[2][1](svg); matrix[2][2](svg); matrix[2][6](svg) },
  ],
  [
    (svg: any) => {},
    (svg: any) => pos(line(svg), "0%", "50%", "100%", "100%"),
    (svg: any) => pos(line(svg), "0%", "50%", "75%", "75%"),
    (svg: any) => pos(line(svg), "0%", "50%", "75%", "100%"),
    (svg: any) => pos(line(svg), "0%", "50%", "100%", "75%"),
    (svg: any) => { matrix[3][1](svg); matrix[3][4](svg) },
    (svg: any) => pos(line(svg), "0%", "0%", "100%", "75%"),
    (svg: any) => { matrix[3][1](svg); matrix[3][6](svg) },
    (svg: any) => { matrix[3][2](svg); matrix[3][6](svg) },
    (svg: any) => { matrix[3][1](svg); matrix[3][2](svg); matrix[3][6](svg) },
  ]
]

interface IProps {
  data: number;
}

export const DrawyThing = (props: IProps) => {
  const d3Container = useRef(null);

  useEffect(() => {

    if(d3Container.current != null) {
      // @ts-ignore
      d3Container.current.innerHTML = "";
    }

    if(isNaN(props.data) || props.data < 1 || props.data > 9999) {
      const svg = d3.select(d3Container.current);
      svg.select("*").remove();
    } else {
      if (!isNaN(props.data) && d3Container.current) {

        const svg = d3.select(d3Container.current);

        // remove existing elements
        svg.select("*").remove();

        // draw middle line
        pos(line(svg), "50%", "50%","0%", "100%")

        if(props.data < 1 || props.data > 9999) {
          console.log("out of range: " + props.data)
        } else {

            try {
              matrix[3][thousands(props.data)](svg)
              matrix[2][hundreds(props.data)](svg)
              matrix[1][tens(props.data)](svg)
              matrix[0][units(props.data)](svg)
            }catch (e) {
              console.error(e);
              svg.select("*").remove();
            }
        }
      }
    }
  }, [props.data]);

  return <svg width="100%" height="100%" ref={d3Container} />;
};
