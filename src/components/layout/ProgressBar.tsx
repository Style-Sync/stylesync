/**
 * TODO: StepIndicator 컴포넌트로 교체 필요
 * - 현재 임시 ProgressBar 구현
 * - 관련 이슈: #162 (StepIndicator)
 * - 관련 PR: #162 (StepIndicator PR 머지 후 교체)
 */

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const percentage = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">STEP</span>
      <div className="relative h-1 w-32 overflow-hidden rounded-full bg-stone-200 md:w-40">
        <div
          className="absolute left-0 top-0 h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-medium text-stone-500">
        {currentStep}/{totalSteps}
      </span>
    </div>
  );
};
