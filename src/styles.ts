import styled, { css } from "styled-components";

export const GeneratorContainer = styled.div`
  margin: auto auto;
  width: 300px;
  height: 400px;
`

export const GeneratorDisplay = styled.div`
  height: 300px;
  width: 300px;
  display: inline-block;
`

export const GeneratorInput = styled.input`
  margin: 2em 1.5em;
  width: 80%;
  font-size: 200%;
  padding: 1em;
`

export const TimeContainer = styled.div`
  width: 600px;
  margin: 0 auto;
`

const TimeDisplayShared = css`  
  height: 100px;
  width: 100px;
  display: inline-block;
  text-align: center;
  vertical-align: center;
`
export const TimeDisplay = styled.div`
  ${TimeDisplayShared};
`

export const TimeDisplayStatic = styled.div`
  ${TimeDisplayShared};
  opacity: 0.5;
  font-size: 200px;
`