"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { LocalizedLink } from "@/components/LocalizedLink";
import { useLanguage, type Language } from "@/lib/i18n";
import {
  DIAGNOSTIC_AUDIT_STORAGE_KEY,
  type DiagnosticAuditContext,
} from "@/lib/diagnosticAudit";

type Problem = {
  id: string;
  title: string;
  description: string;
};

type Frequency = {
  label: string;
  shortLabel: string;
  occurrencesPerWeek: number;
};

type CalculationInput = {
  problemId: string;
  people: number;
  frequencyIndex: number;
  minutes: number;
  hourlyCost: number;
};

const problems: Problem[] = [
  {
    id: "duplicate-entry",
    title: "Entering the same information more than once",
    description: "Copying details between email, spreadsheets, documents or software.",
  },
  {
    id: "searching",
    title: "Searching for information",
    description: "Finding the current record, document, status, message or approval.",
  },
  {
    id: "reporting",
    title: "Preparing recurring reports",
    description: "Collecting, checking and combining information before it can be used.",
  },
  {
    id: "scheduling",
    title: "Scheduling and rescheduling work",
    description: "Coordinating people, appointments, resources or changing priorities.",
  },
  {
    id: "corrections",
    title: "Correcting inconsistent information",
    description: "Resolving missing details, outdated records, errors or duplicated work.",
  },
  {
    id: "follow-ups",
    title: "Chasing follow-ups and approvals",
    description: "Checking progress, reminding people and confirming what happens next.",
  },
];

const frequencies: Frequency[] = [
  { label: "Once each working day", shortLabel: "5 times per week", occurrencesPerWeek: 5 },
  { label: "Two or three times each working day", shortLabel: "12.5 times per week", occurrencesPerWeek: 12.5 },
  { label: "Five or more times each working day", shortLabel: "25 times per week", occurrencesPerWeek: 25 },
  { label: "Two or three times a week", shortLabel: "2.5 times per week", occurrencesPerWeek: 2.5 },
  { label: "Once a week", shortLabel: "1 time per week", occurrencesPerWeek: 1 },
];

const durations = [5, 10, 15, 30, 60];
const workingWeeks = 46;
const totalQuestions = 5;
const questionBackgrounds = [
  "radial-gradient(circle at 88% 16%, rgba(190,145,62,.38), transparent 34%), radial-gradient(circle at 8% 88%, rgba(49,86,121,.28), transparent 38%), linear-gradient(135deg, #f1e5cf 0%, #eee8df 52%, #dbe6eb 100%)",
  "radial-gradient(ellipse at 12% 18%, rgba(188,142,58,.34), transparent 34%), radial-gradient(circle at 84% 78%, rgba(39,78,113,.28), transparent 39%), linear-gradient(145deg, #f2e8d6 0%, #eae6df 58%, #d7e3e9 100%)",
  "radial-gradient(circle at 78% 12%, rgba(45,83,119,.29), transparent 36%), radial-gradient(ellipse at 16% 84%, rgba(194,148,63,.36), transparent 37%), linear-gradient(125deg, #e4e9e9 0%, #f2e8d7 52%, #d8e3e8 100%)",
  "radial-gradient(ellipse at 88% 82%, rgba(190,143,58,.37), transparent 38%), radial-gradient(circle at 10% 16%, rgba(45,84,120,.27), transparent 34%), linear-gradient(155deg, #d9e4e9 0%, #f0e8db 47%, #eadbc1 100%)",
  "radial-gradient(circle at 82% 20%, rgba(192,146,61,.38), transparent 35%), radial-gradient(ellipse at 10% 78%, rgba(39,78,115,.28), transparent 38%), linear-gradient(115deg, #f0e4cf 0%, #dce6e9 53%, #ecdfc9 100%)",
  "radial-gradient(circle at 90% 16%, rgba(190,143,58,.36), transparent 33%), radial-gradient(circle at 7% 84%, rgba(40,79,116,.29), transparent 38%), linear-gradient(140deg, #efe2cc 0%, #dbe6e9 58%, #eadbc2 100%)",
];

const questionDecorations = [
  "-right-52 top-20 size-[34rem] rounded-full border border-[#9b742f]/40",
  "-bottom-64 -left-36 size-[34rem] rotate-12 rounded-[42%] border border-[#315679]/35",
  "right-[8%] top-[8%] h-[80%] w-[22rem] rotate-[18deg] border-l border-r border-[#9b742f]/35",
  "-bottom-52 right-[-8rem] size-[32rem] rounded-[38%] border border-[#315679]/35",
  "left-[11%] top-[9%] h-[82%] w-[16rem] -rotate-[12deg] border-l border-r border-[#9b742f]/35",
  "-right-40 -top-40 size-[32rem] rounded-full border border-[#9b742f]/40",
];

function numberLocale(language: Language) {
  return language === "fr" ? "fr-BE" : language === "nl" ? "nl-BE" : "en-BE";
}

function formatMoney(value: number, language: Language) {
  return new Intl.NumberFormat(numberLocale(language), {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number, language: Language, maximumFractionDigits = 1) {
  return new Intl.NumberFormat(numberLocale(language), { maximumFractionDigits }).format(value);
}

function calculate(input: CalculationInput) {
  const frequency = frequencies[input.frequencyIndex];
  const weeklyHours = input.people * frequency.occurrencesPerWeek * (input.minutes / 60);
  const annualHours = weeklyHours * workingWeeks;
  const annualCost = annualHours * input.hourlyCost;

  return {
    ...input,
    problem: problems.find((problem) => problem.id === input.problemId) ?? problems[0],
    frequency,
    weeklyHours,
    annualHours,
    annualCost,
    monthlyCost: annualCost / 12,
  };
}

export function DiagnosticExperience() {
  const { language, translate } = useLanguage();
  const [step, setStep] = useState(0);
  const [problemId, setProblemId] = useState(problems[0].id);
  const [people, setPeople] = useState(1);
  const [frequencyIndex, setFrequencyIndex] = useState(0);
  const [minutes, setMinutes] = useState(15);
  const [hourlyCost, setHourlyCost] = useState("");
  const [calculations, setCalculations] = useState<CalculationInput[]>([]);

  const numericHourlyCost = Number(hourlyCost);
  const isResult = step === totalQuestions;

  const calculatedProblems = useMemo(() => calculations.map(calculate), [calculations]);

  const totals = useMemo(
    () => calculatedProblems.reduce(
      (current, item) => ({
        weeklyHours: current.weeklyHours + item.weeklyHours,
        annualHours: current.annualHours + item.annualHours,
        annualCost: current.annualCost + item.annualCost,
        monthlyCost: current.monthlyCost + item.monthlyCost,
      }),
      { weeklyHours: 0, annualHours: 0, annualCost: 0, monthlyCost: 0 },
    ),
    [calculatedProblems],
  );

  const progress = isResult ? 100 : ((step + 1) / totalQuestions) * 100;
  const canContinue = step !== 4 || (numericHourlyCost > 0 && Number.isFinite(numericHourlyCost));

  useEffect(() => {
    if (!isResult || calculatedProblems.length === 0) return;

    const auditContext: DiagnosticAuditContext = {
      version: 1,
      generatedAt: new Date().toISOString(),
      problems: calculatedProblems.map((item) => ({
        title: item.problem.title,
        people: item.people,
        frequency: item.frequency.label,
        minutes: item.minutes,
        hourlyCost: item.hourlyCost,
        weeklyHours: item.weeklyHours,
        annualHours: item.annualHours,
        annualCost: item.annualCost,
      })),
      totals,
    };

    window.sessionStorage.setItem(
      DIAGNOSTIC_AUDIT_STORAGE_KEY,
      JSON.stringify(auditContext),
    );
  }, [calculatedProblems, isResult, totals]);

  function resetCurrentProblem() {
    setStep(0);
    const unusedProblem = problems.find(
      (problem) => !calculations.some((calculation) => calculation.problemId === problem.id),
    );
    setProblemId(unusedProblem?.id ?? problems[0].id);
    setPeople(1);
    setFrequencyIndex(0);
    setMinutes(15);
    setHourlyCost("");
  }

  function startOver() {
    window.sessionStorage.removeItem(DIAGNOSTIC_AUDIT_STORAGE_KEY);
    setCalculations([]);
    setStep(0);
    setProblemId(problems[0].id);
    setPeople(1);
    setFrequencyIndex(0);
    setMinutes(15);
    setHourlyCost("");
  }

  function completeCurrentProblem() {
    if (!canContinue || calculations.length >= 3) return;

    setCalculations((current) => [
      ...current,
      {
        problemId,
        people,
        frequencyIndex,
        minutes,
        hourlyCost: numericHourlyCost,
      },
    ]);
    setStep(totalQuestions);
  }

  return (
    <main className="min-h-screen bg-[#f4f0e8] text-[#0b1f3a]">
      <header className="grid min-h-20 grid-cols-[1fr_auto] items-center gap-4 border-b border-[#0b1f3a]/12 bg-[#fffdf8]/95 px-5 py-3 backdrop-blur sm:grid-cols-[1fr_auto_1fr] sm:px-10">
        <LocalizedLink href="/" className="flex w-fit items-center" aria-label="BrandLabel Agency home">
          <Image
            src="/brandlabel-agency-logo.png"
            alt="BrandLabel Agency"
            width={520}
            height={160}
            priority
            className="h-11 w-auto max-w-[10rem] object-contain sm:h-12 sm:max-w-[12rem]"
          />
        </LocalizedLink>
        <span className="hidden justify-self-center text-xs uppercase tracking-[.18em] text-[#667085] sm:block">
          Recurring problem calculator
        </span>
        <LocalizedLink
          href="/"
          className="inline-flex min-h-11 items-center justify-center gap-2 justify-self-end rounded-sm border border-[#0b1f3a]/20 bg-white px-4 text-sm font-semibold text-[#0b1f3a] transition hover:border-[#b18b47] hover:bg-[#f2e5cb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1f3a]"
        >
          <span aria-hidden>←</span>
          <span>Exit diagnostic</span>
        </LocalizedLink>
      </header>

      <div className="h-1 bg-[#ded8cd]">
        <div
          className="h-full bg-[#b18b47] transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <section className="relative isolate min-h-[calc(100svh-5.25rem)] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-[background] duration-700"
          style={{ background: questionBackgrounds[isResult ? totalQuestions : step] }}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute ${questionDecorations[isResult ? totalQuestions : step]} transition-all duration-700`}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[.22] [background-image:linear-gradient(rgba(11,31,58,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,58,.16)_1px,transparent_1px)] [background-size:88px_88px]"
        />
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5.25rem)] max-w-5xl flex-col justify-center px-5 py-12 sm:px-10 sm:py-16">
        {!isResult ? (
          <>
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#9b742f]">
                {translate(`Question ${step + 1} of ${totalQuestions}`)}
              </p>

              {step === 0 ? (
                <>
                  <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] sm:text-5xl">
                    Which recurring problem should we calculate?
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f6878] sm:text-lg">
                    Estimate what repetitive administration and inefficient processes are costing your business in employee time.
                  </p>
                  <p className="mt-3 text-sm font-medium text-[#667085]">
                    Immediate estimate · No email required · Usually completed in about a minute
                  </p>
                  <div className="mt-8 grid gap-3 md:grid-cols-2">
                    {problems.map((problem) => {
                      const selected = problem.id === problemId;
                      return (
                        <button
                          key={problem.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setProblemId(problem.id)}
                          className={`min-h-28 rounded-sm border p-5 text-left transition duration-200 hover:-translate-y-0.5 ${
                            selected
                              ? "border-[#0b1f3a] bg-[#0b1f3a] text-white shadow-[0_18px_45px_rgba(11,31,58,.18)]"
                              : "border-[#d5cec1] bg-[#fffdf9] hover:border-[#b18b47] hover:bg-[linear-gradient(135deg,#fffdf9_45%,#f1e3c4)]"
                          }`}
                        >
                          <strong className="block text-base font-semibold leading-6">{problem.title}</strong>
                          <span className={`mt-2 block text-sm leading-5 ${selected ? "text-white/70" : "text-[#667085]"}`}>
                            {problem.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : null}

              {step === 1 ? (
                <>
                  <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] sm:text-5xl">
                    How many people are affected each time?
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f6878] sm:text-lg">
                    Count the people who perform the task, wait for it, check it or correct it.
                  </p>
                  <div className="mt-8 max-w-xl rounded-sm border border-[#d5cec1] bg-[#fffdf9] p-6 sm:p-8">
                    <label htmlFor="people" className="text-sm font-semibold text-[#5f6878]">
                      People affected
                    </label>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        aria-label="Remove one person"
                        onClick={() => setPeople((value) => Math.max(1, value - 1))}
                        className="grid size-12 place-items-center border border-[#0b1f3a]/25 bg-white text-2xl hover:border-[#b18b47]"
                      >
                        −
                      </button>
                      <input
                        id="people"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={people}
                        onChange={(event) => setPeople(Math.min(500, Math.max(1, Number(event.target.value) || 1)))}
                        className="h-16 min-w-0 flex-1 border border-[#0b1f3a]/20 bg-white px-4 text-center font-display text-4xl outline-none focus:border-[#b18b47]"
                      />
                      <button
                        type="button"
                        aria-label="Add one person"
                        onClick={() => setPeople((value) => Math.min(500, value + 1))}
                        className="grid size-12 place-items-center border border-[#0b1f3a]/25 bg-white text-2xl hover:border-[#b18b47]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </>
              ) : null}

              {step === 2 ? (
                <>
                  <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] sm:text-5xl">
                    How often does it happen?
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f6878] sm:text-lg">
                    Choose the closest normal frequency. Avoid using an unusually busy week.
                  </p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {frequencies.map((frequency, index) => {
                      const selected = frequencyIndex === index;
                      return (
                        <button
                          key={frequency.label}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setFrequencyIndex(index)}
                          className={`min-h-16 border px-5 py-4 text-left text-base font-semibold transition ${
                            selected
                              ? "border-[#0b1f3a] bg-[#0b1f3a] text-white"
                              : "border-[#d5cec1] bg-[#fffdf9] hover:border-[#b18b47]"
                          }`}
                        >
                          {frequency.label}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : null}

              {step === 3 ? (
                <>
                  <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] sm:text-5xl">
                    How long does it usually take each time?
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f6878] sm:text-lg">
                    Include the time spent doing, checking, waiting for or correcting the task.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {durations.map((duration) => {
                      const selected = minutes === duration;
                      return (
                        <button
                          key={duration}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setMinutes(duration)}
                          className={`min-h-24 border p-4 text-center transition ${
                            selected
                              ? "border-[#0b1f3a] bg-[#0b1f3a] text-white"
                              : "border-[#d5cec1] bg-[#fffdf9] hover:border-[#b18b47]"
                          }`}
                        >
                          <strong className="block font-display text-3xl font-normal">{duration}</strong>
                          <span className={`mt-1 block text-xs ${selected ? "text-white/65" : "text-[#667085]"}`}>
                            minutes
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : null}

              {step === 4 ? (
                <>
                  <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] sm:text-5xl">
                    What is the approximate cost per working hour?
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f6878] sm:text-lg">
                    Enter the approximate total employment cost, including salary and employer contributions. An estimate is sufficient.
                  </p>
                  <div className="mt-8 max-w-xl rounded-sm border border-[#d5cec1] bg-[#fffdf9] p-6 sm:p-8">
                    <label htmlFor="hourly-cost" className="text-sm font-semibold text-[#5f6878]">
                      Hourly employment cost
                    </label>
                    <div className="mt-3 flex h-20 items-center border border-[#0b1f3a]/20 bg-white px-5 focus-within:border-[#b18b47]">
                      <span className="font-display text-4xl text-[#9b742f]">€</span>
                      <input
                        id="hourly-cost"
                        type="number"
                        inputMode="decimal"
                        min="1"
                        max="1000"
                        step="0.5"
                        autoFocus
                        value={hourlyCost}
                        onChange={(event) => setHourlyCost(event.target.value)}
                        placeholder="35"
                        className="h-full min-w-0 flex-1 bg-transparent px-3 font-display text-4xl outline-none placeholder:text-[#0b1f3a]/20"
                      />
                      <span className="text-sm text-[#667085]">per hour</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#667085]">
                      This figure is used exactly as entered. The calculator does not replace it with an industry average.
                    </p>
                  </div>
                </>
              ) : null}
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-[#0b1f3a]/12 pt-6">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep((value) => Math.max(0, value - 1))}
                className="min-h-12 px-2 text-sm font-semibold disabled:opacity-25"
              >
                {translate("← Back")}
              </button>
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => {
                  if (step === 4) {
                    completeCurrentProblem();
                    return;
                  }
                  setStep((value) => Math.min(totalQuestions, value + 1));
                }}
                className="min-h-12 bg-[#0b1f3a] px-6 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#17385f] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
              >
                {translate(step === 4 ? "Calculate this problem" : "Continue →")}
              </button>
            </div>
          </>
        ) : (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#9b742f]">
              {calculatedProblems.length === 1 ? "The cost of one recurring problem" : `${calculatedProblems.length} recurring problems calculated`}
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.02] sm:text-5xl">
              Repeated work becomes a measurable annual cost.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#5f6878] sm:text-lg">
              Each problem is calculated separately using the people, frequency, duration and hourly cost you entered.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="border border-[#d5cec1] bg-[#fffdf9] p-6">
                <p className="text-sm leading-5 text-[#667085]">Combined time each week</p>
                <strong className="mt-3 block font-display text-4xl font-normal">
                  {formatNumber(totals.weeklyHours, language)} <small className="text-base text-[#667085]">hours</small>
                </strong>
              </div>
              <div className="border border-[#d5cec1] bg-[#fffdf9] p-6">
                <p className="text-sm leading-5 text-[#667085]">Average monthly cost</p>
                <strong className="mt-3 block font-display text-4xl font-normal">{formatMoney(totals.monthlyCost, language)}</strong>
              </div>
              <div className="border border-[#0b1f3a] bg-[#0b1f3a] p-6 text-white shadow-[0_24px_60px_rgba(11,31,58,.2)]">
                <p className="text-sm leading-5 text-white/65">Combined annual cost</p>
                <strong className="mt-3 block font-display text-4xl font-normal">{formatMoney(totals.annualCost, language)}</strong>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {calculatedProblems.map((item, index) => (
                <div
                  key={`${item.problemId}-${index}`}
                  className="border border-[#cbb98f] bg-[linear-gradient(135deg,#fffdf9_35%,#efe0bd)] p-6 sm:p-7"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#8c692d]">Problem {index + 1}</p>
                      <h2 className="mt-2 font-display text-2xl leading-tight">{item.problem.title}</h2>
                    </div>
                    <strong className="font-display text-3xl font-normal sm:text-right">{formatMoney(item.annualCost, language)} <small className="block font-sans text-xs font-normal text-[#667085]">per year</small></strong>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#344054]">
                    {item.people} {translate(item.people === 1 ? "person" : "people")} × {translate(item.frequency.shortLabel)} × {item.minutes} {translate("minutes")} ÷ 60 × {formatMoney(item.hourlyCost, language)} × {workingWeeks} {translate("working weeks")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#667085]">
                    {translate("Approximately")} {formatNumber(item.weeklyHours, language)} {translate("hours each week and")} {formatNumber(item.annualHours, language, 0)} {translate("hours each year.")}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 max-w-3xl text-sm leading-6 text-[#667085]">
              This indicative calculation measures only the recurring problems entered. It does not assume that the entire cost can be removed and it is not a guaranteed financial saving.
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#667085]">
              Annual figures use 46 working weeks to allow for holidays and other non-working periods.
            </p>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#344054]">
              A high recurring cost does not always require a complete platform. The right solution may be workflow automation, a focused operational system or a broader business platform, depending on where the inefficiency comes from.
            </p>
            <p className="mt-2 max-w-3xl text-base leading-7 text-[#344054]">
              BrandLabel starts with the workflow behind the cost before recommending what should be built or changed.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LocalizedLink
                href="/free-operational-audit"
                className="inline-flex min-h-13 items-center justify-center bg-[#0b1f3a] px-6 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#17385f]"
              >
                Request your free operational audit
              </LocalizedLink>
              <LocalizedLink
                href="/contact"
                className="inline-flex min-h-13 items-center justify-center border border-[#0b1f3a] bg-white/45 px-6 font-semibold transition hover:bg-white"
              >
                Contact BrandLabel Agency
              </LocalizedLink>
              {calculatedProblems.length < 3 ? (
                <button
                  type="button"
                  onClick={resetCurrentProblem}
                  className="min-h-13 border border-[#0b1f3a] bg-transparent px-6 font-semibold transition hover:bg-white"
                >
                  Add another problem
                </button>
              ) : null}
              <button
                type="button"
                onClick={startOver}
                className="min-h-13 px-4 text-sm font-semibold text-[#5f6878] underline decoration-[#b18b47]/70 underline-offset-4"
              >
                Start over
              </button>
            </div>
            {calculatedProblems.length === 3 ? (
              <p className="mt-4 text-sm text-[#667085]">Three problems have been included—the maximum for this quick calculation.</p>
            ) : null}
          </div>
        )}
        </div>
      </section>
    </main>
  );
}
