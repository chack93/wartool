import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InputToggle from "./input_toggle";

const menuList = [
  { href: "/", label: "Overview" },
  { href: "/workload", label: "Workload" },
];

function Layout({ children }: any): JSX.Element {
  const { asPath } = useRouter();

  const [IsInit, setIsInit] = useState(false);
  const [IsDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (IsInit) return;
    setIsInit(true);

    const osPreferDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(osPreferDark);
  }, [IsInit]);

  useEffect(() => {
    const cl = document.documentElement.classList;
    if (IsDarkMode) cl.add("dark");
    else cl.remove("dark");
  }, [IsDarkMode]);

  return (
    <>
      <div className="w-screen min-h-100  bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        <div className="flex justify-between items-center mx-6 px-2 py-3 mb-3 border-b border-slate-300 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <img src="wart_icon.png" />
            <h1 className="text-xl">WARTool</h1>
          </div>
          <div>
            <InputToggle
              label={`${IsDarkMode ? "🌙" : "☀️ "}`}
              value={IsDarkMode}
              onChange={(dark: boolean) => {
                setIsDarkMode(dark);
              }}
            />
          </div>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-row flex-wrap min-h-screen">
            <aside className="w-full sm:w-1/4 lg:w-1/5">
              <div className="sticky top-0 w-full px-3">
                <nav>
                  <ol className="flex flex-col gap-1">
                    {menuList.map(({ href, label }) => (
                      <Link key={href} href={href}>
                        <li
                          className={`px-4 py-2 rounded ${
                            asPath === href
                              ? "bg-slate-200 dark:bg-slate-800 shadow"
                              : ""
                          }`}
                        >
                          {label}
                        </li>
                      </Link>
                    ))}
                  </ol>
                </nav>
              </div>
            </aside>
            <main role="main" className="w-full sm:w-3/4 lg:w-4/5 px-3 pb-3">
              {children}
            </main>
          </div>
          {/*
              <footer className="bg-slate-300">
              <div>hello</div>
              </footer>
            */}
        </div>
      </div>
    </>
  );
}

export default Layout;
