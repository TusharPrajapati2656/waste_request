// src/pages/track/components/TrackStepper.jsx

import React from "react";
import { LuCheck, LuChevronRight } from "react-icons/lu";
import { STEP_STAGES } from "../data/trackData";

export default function TrackStepper({ currentStepNumber, isCancelled }) {
  if (isCancelled) {
    return (
      <div className="stepper-cancelled-box">
        This request was cancelled. You can book a new pickup slot at any time.
      </div>
    );
  }

  return (
    <div className="stepper-pipeline-wrap">
      <div className="stepper-pipeline">
        {STEP_STAGES.map((step, idx) => {
          const isDone = currentStepNumber > step.num;
          const isCurrent = currentStepNumber === step.num;
          const stateClass = isDone
            ? "completed"
            : isCurrent
            ? "current"
            : "pending";

          return (
            <React.Fragment key={step.key}>
              {/* Step Node */}
              <div className={`stepper-node ${stateClass}`}>
                <div className="stepper-circle">
                  {isDone ? <LuCheck aria-hidden="true" /> : step.num}
                </div>
                <span className="stepper-label">{step.label}</span>
              </div>

              {/* Connecting Pipeline with Chevron Node */}
              {idx < STEP_STAGES.length - 1 && (
                <div
                  className={`stepper-connector ${
                    isDone ? "completed" : isCurrent ? "active" : "pending"
                  }`}
                  aria-hidden="true"
                >
                  <span className="stepper-line line-left" />
                  <span className="stepper-arrow-circle">
                    <LuChevronRight />
                  </span>
                  <span className="stepper-line line-right" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
