import { getUrl } from "./utils/getUrl";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('authjs.session-token');
    const pathname = request.nextUrl.pathname;

    if (!pathname.includes('/hub') && token) {
        return NextResponse.redirect(new URL(getUrl('/hub/dashboard')))
    }

    if (pathname.includes('/hub') && !token) {
        return NextResponse.redirect(new URL(getUrl('/login')))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}