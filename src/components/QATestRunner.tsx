import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle2, Clock, Terminal, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { INITIAL_TEST_SUITE } from '../data/profileData';
import { TestCase } from '../types';

export const QATestRunner: React.FC = () => {
  const [tests, setTests] = useState<TestCase[]>(INITIAL_TEST_SUITE);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [activeConsoleLog, setActiveConsoleLog] = useState<string>('Console log siap. Tekan "Jalankan Test Suite" untuk memulai automated testing.');

  const runTests = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStepIndex(0);
    setActiveConsoleLog('[$] npx playwright test --project=chromium --reporter=list');

    // Reset status
    setTests((prev) => prev.map((t) => ({ ...t, status: 'idle', duration: undefined })));

    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < INITIAL_TEST_SUITE.length) {
        const testId = INITIAL_TEST_SUITE[currentIndex].id;
        const randomDuration = Math.floor(Math.random() * 220) + 140;

        setTests((prev) =>
          prev.map((t, idx) => {
            if (idx === currentIndex) {
              return { ...t, status: 'running' };
            }
            return t;
          })
        );

        setActiveConsoleLog(
          `[RUNNING] Executing spec: ${INITIAL_TEST_SUITE[currentIndex].name}...\n  > Assertion: "${INITIAL_TEST_SUITE[currentIndex].assertion}"`
        );

        setTimeout(() => {
          setTests((prev) =>
            prev.map((t, idx) => {
              if (idx === currentIndex) {
                return { ...t, status: 'passed', duration: randomDuration };
              }
              return t;
            })
          );
          setActiveConsoleLog(
            `[PASSED] ✓ ${INITIAL_TEST_SUITE[currentIndex].name} completed in ${randomDuration}ms (0 errors)`
          );
        }, 350);

        currentIndex++;
        setCurrentStepIndex(currentIndex);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsRunning(false);
          setActiveConsoleLog('All 4 test suites passed successfully! 100% assertions satisfied. Report generated: allure-results/index.html');
        }, 400);
      }
    }, 750);
  };

  const resetTests = () => {
    setIsRunning(false);
    setCurrentStepIndex(-1);
    setTests(INITIAL_TEST_SUITE);
    setActiveConsoleLog('Test suite di-reset ke kondisi awal.');
  };

  const passedCount = tests.filter((t) => t.status === 'passed').length;
  const isAllPassed = passedCount === tests.length && !isRunning;

  return (
    <div className="w-full glass-card rounded-[28px] p-6 sm:p-8 border border-white/80 shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#2A2823]/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#C1683F] uppercase tracking-wider">
              Simulasi Interaktif
            </span>
            <span className="text-[11px] font-mono text-[#6B675F]">
              Playwright + TypeScript CI
            </span>
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#2A2823] mt-1">
            Automated Smoke Test Runner
          </h3>
          <p className="text-xs sm:text-sm text-[#6B675F] mt-0.5">
            Coba jalankan simulasi pengujian otomatis untuk memverifikasi alur checkout D'PARAGON & API Djuragan Kamar.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={runTests}
            disabled={isRunning}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              isRunning
                ? 'bg-[#3F5A46]/60 text-white cursor-not-allowed'
                : 'bg-[#3F5A46] hover:bg-[#284230] text-white shadow-sm hover:shadow'
            }`}
          >
            <Play className={`w-4 h-4 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Menjalankan...' : 'Jalankan Test Suite'}</span>
          </button>

          <button
            onClick={resetTests}
            disabled={isRunning}
            className="p-2.5 rounded-xl bg-white/70 hover:bg-white border border-[#2A2823]/15 text-[#2A2823] transition-colors cursor-pointer"
            title="Reset status pengujian"
          >
            <RotateCcw className="w-4 h-4 text-[#6B675F]" />
          </button>
        </div>
      </div>

      {/* Progress & Live Test Cases */}
      <div className="mt-5 space-y-3">
        {tests.map((test, index) => {
          let statusBadge = (
            <span className="text-[11px] font-mono text-[#6B675F] bg-[#2A2823]/5 px-2 py-0.5 rounded">
              Menunggu
            </span>
          );
          if (test.status === 'running') {
            statusBadge = (
              <span className="text-[11px] font-mono text-[#C1683F] bg-[#C1683F]/15 px-2 py-0.5 rounded animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C1683F]"></span>
                Running...
              </span>
            );
          } else if (test.status === 'passed') {
            statusBadge = (
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Passed ({test.duration}ms)
              </span>
            );
          }

          return (
            <div
              key={test.id}
              className={`p-3.5 sm:p-4 rounded-xl transition-all border ${
                test.status === 'running'
                  ? 'bg-amber-50/80 border-[#C1683F]/40 shadow-xs'
                  : test.status === 'passed'
                  ? 'bg-emerald-50/50 border-emerald-500/20'
                  : 'bg-white/50 border-[#2A2823]/8'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xs font-mono font-bold text-[#3F5A46] shrink-0">
                    [{test.category}]
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#2A2823] truncate">
                    {test.name}
                  </span>
                </div>
                <div className="shrink-0">{statusBadge}</div>
              </div>
              <div className="text-[11px] text-[#6B675F] font-mono mt-1 pl-1 truncate">
                assert: {test.assertion}
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal Output & Status Bar */}
      <div className="mt-5 p-3.5 rounded-xl bg-[#1C1C18] text-[#F3F0EA] font-mono text-xs overflow-x-auto shadow-inner">
        <div className="flex items-center gap-2 pb-2 mb-2 border-b border-white/10 text-white/60 text-[10px]">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>playwright-runner.log</span>
          {isAllPassed && <span className="text-emerald-400 font-bold ml-auto">PASS 4/4</span>}
        </div>
        <p className="whitespace-pre-line text-emerald-300/90 leading-relaxed font-mono">
          {activeConsoleLog}
        </p>
      </div>

      {/* Success banner if all passed */}
      {isAllPassed && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-100/80 border border-emerald-500/30 text-emerald-900 text-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span className="font-semibold">
              Semua skenario pengujian berhasil lulus! Sistem stabil & siap di-deploy ke production.
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded">
            Build #1042 · PASS
          </span>
        </div>
      )}
    </div>
  );
};
