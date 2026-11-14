"use client";
// Vercel Analytics, with the team's own visits labelled instead of hidden.
// Open any page once with ?team=<name> (e.g. ?team=abhay) on each phone and
// laptop; from then on that browser's visits are recorded under
// /_team/<name>/<page>. (A path, not utm tags: Vercel only reports UTM on
// Enterprise or the Web Analytics Plus add-on.) ?team=off removes the label.
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

const KEY = "tid_team";

function teamName(): string | null {
  try {
    const param = new URLSearchParams(window.location.search).get("team");
    if (param === "off") localStorage.removeItem(KEY);
    else if (param) localStorage.setItem(KEY, param.toLowerCase().slice(0, 30));
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function beforeSend(event: BeforeSendEvent) {
  const name = teamName();
  if (!name) return event;
  const url = new URL(event.url);
  url.searchParams.delete("team");
  url.pathname = `/_team/${encodeURIComponent(name)}${url.pathname}`;
  return { ...event, url: url.toString() };
}

export default function TeamAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
