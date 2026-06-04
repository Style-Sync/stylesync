export default function TasteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// import { StepIndicator } from '@/components/ui/StepIndicator';

// export default function TasteLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex flex-col">
//       {/* TODO: 현재 페이지에 따라 step 값 동적으로 계산해서 넣기 (usePathname 활용) */}
//       <header className="p-4">
//         <StepIndicator current={1} total={2} fullWidth />
//       </header>

//       {children}
//     </div>
//   );
// }
