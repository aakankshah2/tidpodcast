"use client";
// Vercel Analytics, with the team's own visits labelled instead of hidden.
// Open any page once with ?team=<name> (e.g. ?team=abhay) on each phone and
// laptop; from then on that browser's visits arrive tagged utm_source=team,
// utm_medium=<name>. ?team=off removes the label.
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
  url.searchParams.set("utm_source", "team");
  url.searchParams.set("utm_medium", name);
  return { ...event, url: url.toString() };
}

export default function TeamAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
