// @flow

// Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import * as React from 'react';
import PropTypes from 'prop-types';
import { window } from 'global';

import CanvasSpanGraph from './CanvasSpanGraph';
import TickLabels from './TickLabels';
import ViewingLayer from './ViewingLayer';
import type { Trace } from '../../../types';

import './index.css';

const TIMELINE_TICK_INTERVAL = 4;

type SpanGraphProps = {
  height: number,
  trace: Trace,
  viewRange: [number, number],
  updateViewRange: ([number, number]) => void,
};

export default class SpanGraph extends React.Component<SpanGraphProps> {
  props: SpanGraphProps;

  static defaultProps = {
    height: 60,
  };

  constructor(props: SpanGraphProps) {
    super(props);
  }

  // shouldComponentUpdate(nextProps: SpanGraphProps, nextState: SpanGraphState) {
  //   const { trace: newTrace, viewRange: newViewRange } = nextProps;
  //   const {
  //     currentlyDragging: newCurrentlyDragging,
  //     leftBound: newLeftBound,
  //     rightBound: newRightBound,
  //   } = nextState;
  //   const { trace, viewRange } = this.props;
  //   const { currentlyDragging, leftBound, rightBound } = this.state;

  //   return (
  //     trace.traceID !== newTrace.traceID ||
  //     viewRange[0] !== newViewRange[0] ||
  //     viewRange[1] !== newViewRange[1] ||
  //     currentlyDragging !== newCurrentlyDragging ||
  //     leftBound !== newLeftBound ||
  //     rightBound !== newRightBound
  //   );
  // }

  render() {
    const { height, trace, viewRange, updateViewRange } = this.props;
    if (!trace) {
      return <div />;
    }
    return (
      <div>
        <TickLabels numTicks={TIMELINE_TICK_INTERVAL} duration={trace.duration} />
        <div className="relative">
          <CanvasSpanGraph
            valueWidth={trace.duration}
            items={trace.spans.map(span => ({
              valueOffset: span.relativeStartTime,
              valueWidth: span.duration,
              serviceName: span.process.serviceName,
            }))}
          />
          <ViewingLayer
            viewRange={viewRange}
            numTicks={TIMELINE_TICK_INTERVAL}
            height={height}
            updateViewRange={updateViewRange}
          />
        </div>
      </div>
    );
  }
}