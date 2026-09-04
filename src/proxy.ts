import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const firstSegment = request.nextUrl.pathname.split("/").filter(Boolean)[0];
  const locale = firstSegment === "fr" || firstSegment === "nl" ? firstSegment : "en";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-brandlabel-locale", locale);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const proxyConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
