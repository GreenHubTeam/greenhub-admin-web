import { getUrl } from "./utils/getUrl";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('jwt');
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/_next/') || pathname.startsWith('/static/') || pathname.endsWith('.jpg') || pathname.endsWith('.png') || pathname.endsWith('.svg') || pathname.endsWith('.ico') || pathname.endsWith('.webp')) {
        return NextResponse.next(); // Ignora essas requisições
    }

    if (!pathname.includes('/hub') && token) {
        return NextResponse.redirect(new URL(getUrl('/hub/dashboard')))
    }

    if (pathname.includes('/hub') && !token) {
        return NextResponse.redirect(new URL(getUrl('/login')))
    }

    if(!token) {
        return NextResponse.redirect(new URL(getUrl('/login')))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}