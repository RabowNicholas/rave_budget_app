export default function BudgetCreationStepIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const progressPercentage = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full flex flex-col gap-3">
      <div className=" bg-mediumGray rounded-lg h-4 overflow-hidden">
        <div
          className="bg-mutedLavender h-4 rounded-lg transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="self-center"> {progressPercentage}%</div>
    </div>
  );
}
