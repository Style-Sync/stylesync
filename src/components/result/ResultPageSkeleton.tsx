export const ResultPageSkeleton = () => (
  <div className="bg-background animate-pulse">
    <div className="mx-auto px-4 md:px-9 lg:px-[120px] max-w-[1280px] py-12 lg:py-20">
      {/* Hero skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-10 mb-16 lg:mb-20">
        <div className="flex flex-col items-center lg:items-start gap-6 flex-1">
          <div className="h-6 w-40 rounded-full bg-surface-variant" />
          <div className="flex flex-col gap-3 w-full">
            <div className="h-14 w-3/4 rounded-lg bg-surface-variant" />
            <div className="h-14 w-1/2 rounded-lg bg-surface-variant" />
          </div>
          <div className="h-5 w-full max-w-[480px] rounded bg-surface-variant" />
          <div className="h-5 w-2/3 max-w-[480px] rounded bg-surface-variant" />
          <div className="flex gap-3">
            <div className="h-9 w-28 rounded-full bg-surface-variant" />
            <div className="h-9 w-32 rounded-full bg-surface-variant" />
          </div>
        </div>
        <div className="w-[336px] h-[336px] lg:w-[320px] lg:h-[320px] rounded-[64px] bg-surface-variant flex-shrink-0 mx-auto lg:mx-0" />
      </div>

      {/* Domain sections skeleton */}
      <div className="flex flex-col gap-16 lg:gap-20 mb-16 lg:mb-20">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <div className="h-8 w-48 rounded bg-surface-variant mb-6 lg:mb-8" />
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((j) => (
                <div key={j} className="h-[340px] rounded-[2.5rem] bg-surface-variant" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
